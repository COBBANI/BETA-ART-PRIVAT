-- Beta Art — payment schema (PostgreSQL)
--
-- Written before the first product, on purpose. Retrofitting a ledger onto a
-- live payment system means reconstructing history from a provider's API and
-- hoping it agrees with what customers remember.
--
-- Five rules the schema enforces rather than documents:
--
--   1. Money is an integer of minor units plus a currency. Never a float.
--   2. Credits are an append-only ledger. There is no mutable balance column
--      anywhere, because a balance you can UPDATE is a balance you can lose.
--   3. Entitlements are append-only too, with validity windows. "Does this
--      account have access" is a query, not a flag somebody forgot to clear.
--   4. Every provider event is stored once. The unique constraint on
--      provider_event_id is the idempotency guarantee, not application code.
--   5. The core is provider-agnostic. Vipps, Stripe and invoice are values in
--      a column, not separate tables.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE provider       AS ENUM ('stripe', 'vipps', 'invoice', 'manual');
CREATE TYPE buyer_kind     AS ENUM ('consumer', 'business', 'public_body');
CREATE TYPE pay_status     AS ENUM ('pending','authorised','paid','failed','refunded','disputed','cancelled');
CREATE TYPE sub_status     AS ENUM ('trialing','active','past_due','paused','cancelled','expired');
CREATE TYPE price_kind     AS ENUM ('one_time','recurring','metered','credit_pack');
CREATE TYPE ledger_reason  AS ENUM ('monthly_grant','top_up','consumption','expiry','refund','correction','promotional');

-- ---------------------------------------------------------------- accounts
-- One account is one payer. A person and a company are the same table with a
-- different kind, because the same human buys a course privately on Monday
-- and an AI employee for their company on Tuesday, and the invoices differ.
CREATE TABLE account (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind            buyer_kind  NOT NULL DEFAULT 'consumer',
  email           citext      NOT NULL UNIQUE,
  display_name    text        NOT NULL,
  -- business only
  legal_name      text,
  org_number      text,                    -- Norwegian organisasjonsnummer
  vat_number      text,                    -- EU VAT id, when reverse charge applies
  vat_validated_at timestamptz,            -- null means never checked against VIES
  -- where the customer is, which decides both tax and the methods shown
  country         char(2)     NOT NULL,
  preferred_currency char(3)  NOT NULL DEFAULT 'NOK',
  preferred_locale   text     NOT NULL DEFAULT 'no',
  -- EHF 3.0 delivery, for public bodies and B2B from 1 January 2027
  ehf_endpoint_id text,
  ehf_scheme_id   text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,             -- soft delete; ledgers must survive erasure
  CONSTRAINT business_needs_org CHECK (kind = 'consumer' OR org_number IS NOT NULL)
);

-- The provider's own id for this account, one row per provider.
CREATE TABLE account_provider (
  account_id   uuid     NOT NULL REFERENCES account(id) ON DELETE CASCADE,
  provider     provider NOT NULL,
  external_id  text     NOT NULL,          -- cus_..., or the Vipps agreement owner
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (account_id, provider),
  UNIQUE (provider, external_id)
);

-- People who may sign in to an account. An agency has several.
CREATE TABLE account_user (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id  uuid NOT NULL REFERENCES account(id) ON DELETE CASCADE,
  email       citext NOT NULL,
  role        text   NOT NULL DEFAULT 'member',   -- owner | member | billing
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (account_id, email)
);

-- ---------------------------------------------------------------- catalogue
CREATE TABLE product (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE,        -- 'curiosity-starter', 's-ai-receptionist'
  name        text NOT NULL,
  kind        text NOT NULL,               -- plan | report | course | licence | service | credit_pack
  property    text NOT NULL,               -- archive | business | journal | engine
  tax_code    text,                        -- Stripe product tax code
  active      boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE price (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    uuid NOT NULL REFERENCES product(id),
  kind          price_kind NOT NULL,
  currency      char(3) NOT NULL,
  amount_minor  bigint  NOT NULL CHECK (amount_minor >= 0),   -- øre, cents
  interval      text,                      -- month | year, null for one-time
  tax_behavior  text NOT NULL DEFAULT 'exclusive',            -- exclusive | inclusive
  credits_included integer,                -- monthly allowance, or pack size
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recurring_needs_interval CHECK (kind <> 'recurring' OR interval IS NOT NULL)
);

-- the same price at each provider
CREATE TABLE price_provider (
  price_id    uuid NOT NULL REFERENCES price(id) ON DELETE CASCADE,
  provider    provider NOT NULL,
  external_id text NOT NULL,               -- price_...
  PRIMARY KEY (price_id, provider),
  UNIQUE (provider, external_id)
);

-- What each action costs, as data. Changing an AI cost is a row, with a date.
CREATE TABLE credit_price (
  action      text NOT NULL,               -- trend_scan | keyword_analysis | research | article | deep_report
  credits     integer NOT NULL CHECK (credits > 0),
  valid_from  timestamptz NOT NULL DEFAULT now(),
  valid_to    timestamptz,
  PRIMARY KEY (action, valid_from)
);

-- ---------------------------------------------------------------- checkout
CREATE TABLE checkout_session (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id    uuid REFERENCES account(id),   -- null until the buyer identifies
  provider      provider NOT NULL,
  external_id   text,                          -- cs_...; null until created
  currency      char(3) NOT NULL,
  amount_minor  bigint  NOT NULL,
  status        pay_status NOT NULL DEFAULT 'pending',
  -- the routing decision, kept so a support question can be answered later
  shown_methods text[]  NOT NULL DEFAULT '{}',
  buyer_country char(2),
  return_url    text,
  fulfilled_at  timestamptz,                   -- set exactly once
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, external_id)
);

CREATE TABLE checkout_line (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  uuid NOT NULL REFERENCES checkout_session(id) ON DELETE CASCADE,
  price_id    uuid NOT NULL REFERENCES price(id),
  quantity    integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  amount_minor bigint NOT NULL
);

-- ---------------------------------------------------------------- payments
CREATE TABLE payment (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id    uuid NOT NULL REFERENCES account(id),
  session_id    uuid REFERENCES checkout_session(id),
  provider      provider NOT NULL,
  external_id   text NOT NULL,                 -- pi_..., or the Vipps order id
  status        pay_status NOT NULL,
  currency      char(3) NOT NULL,
  amount_minor  bigint  NOT NULL,
  refunded_minor bigint NOT NULL DEFAULT 0 CHECK (refunded_minor >= 0),
  method        text,                          -- card | vipps | klarna | invoice
  card_brand    text,                          -- display only, from the provider
  card_last4    char(4),                       -- display only. Nothing else, ever.
  -- the tax position, frozen at the moment of sale
  tax_country       char(2),
  tax_rate_bp       integer,                   -- basis points: 2500 = 25 %
  tax_amount_minor  bigint,
  tax_reverse_charge boolean NOT NULL DEFAULT false,
  tax_basis         text,                      -- 'no_b2c_digital', 'eea_b2b_reverse', ...
  paid_at       timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, external_id),
  CONSTRAINT refund_within_payment CHECK (refunded_minor <= amount_minor)
);

-- ------------------------------------------------------------ subscriptions
CREATE TABLE subscription (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id     uuid NOT NULL REFERENCES account(id),
  price_id       uuid NOT NULL REFERENCES price(id),
  provider       provider NOT NULL,
  external_id    text NOT NULL,
  status         sub_status NOT NULL,
  period_start   timestamptz NOT NULL,
  period_end     timestamptz NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  -- grace after a failed payment, so access does not die mid-sentence
  grace_until    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, external_id),
  CONSTRAINT period_forwards CHECK (period_end > period_start)
);

-- ------------------------------------------------------------- entitlements
-- Append-only. Revoking writes valid_to; it never deletes and never flips a
-- boolean. "What could this account open on 3 March" stays answerable.
CREATE TABLE entitlement (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id  uuid NOT NULL REFERENCES account(id),
  feature     text NOT NULL,               -- 'journal_pro', 'engine_api', 'course:ai-basics'
  source      text NOT NULL,               -- subscription | purchase | manual | promotional
  source_id   uuid,                        -- subscription.id or payment.id
  valid_from  timestamptz NOT NULL DEFAULT now(),
  valid_to    timestamptz,                 -- null = open ended
  revoked_reason text,                     -- 'cancelled' | 'refunded' | 'disputed'
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX entitlement_lookup ON entitlement (account_id, feature, valid_from DESC);

CREATE VIEW active_entitlement AS
  SELECT account_id, feature, min(valid_from) AS since
    FROM entitlement
   WHERE valid_from <= now() AND (valid_to IS NULL OR valid_to > now())
   GROUP BY account_id, feature;

-- ------------------------------------------------------------------ credits
-- Append-only ledger. Balance is a SUM, never a stored number. Every row says
-- where the credits came from or went, and points at the thing that caused it.
CREATE TABLE credit_ledger (
  id          bigserial PRIMARY KEY,
  account_id  uuid NOT NULL REFERENCES account(id),
  delta       integer NOT NULL CHECK (delta <> 0),   -- + grant, - consumption
  reason      ledger_reason NOT NULL,
  -- allowance is spent before purchased credits, so a period boundary never
  -- destroys something the customer paid for
  pool        text NOT NULL DEFAULT 'allowance',     -- allowance | purchased
  expires_at  timestamptz,                           -- allowance expires, purchased does not
  ref_kind    text,                                  -- payment | subscription | usage_event
  ref_id      uuid,
  note        text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX credit_ledger_account ON credit_ledger (account_id, created_at DESC);

CREATE VIEW credit_balance AS
  SELECT account_id,
         sum(delta) FILTER (WHERE expires_at IS NULL OR expires_at > now()) AS balance,
         sum(delta) FILTER (WHERE pool = 'allowance' AND (expires_at IS NULL OR expires_at > now())) AS allowance,
         sum(delta) FILTER (WHERE pool = 'purchased') AS purchased
    FROM credit_ledger
   GROUP BY account_id;

-- What was actually run, so a bill can be explained line by line.
CREATE TABLE usage_event (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id    uuid NOT NULL REFERENCES account(id),
  action        text NOT NULL,
  credits       integer NOT NULL,
  -- what it cost us, so margin is measurable rather than assumed
  cost_minor    bigint,
  currency      char(3),
  meter_sent_at timestamptz,               -- null = not yet reported to the provider
  idempotency_key text NOT NULL UNIQUE,    -- the caller's key; a retry bills once
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------- invoices
CREATE TABLE invoice (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id    uuid NOT NULL REFERENCES account(id),
  number        text NOT NULL UNIQUE,      -- gapless, per Norwegian bookkeeping rules
  provider      provider NOT NULL,
  external_id   text,
  currency      char(3) NOT NULL,
  net_minor     bigint NOT NULL,
  vat_minor     bigint NOT NULL,
  gross_minor   bigint NOT NULL,
  issued_at     timestamptz NOT NULL,
  due_at        timestamptz NOT NULL,
  paid_at       timestamptz,
  -- EHF 3.0 / Peppol BIS Billing
  ehf_sent_at   timestamptz,
  ehf_message_id text,
  pdf_url       text,
  CONSTRAINT gross_is_sum CHECK (gross_minor = net_minor + vat_minor)
);

-- ------------------------------------------------------------ provider edge
-- The idempotency guarantee. The unique constraint does the work; application
-- code only has to not swallow the conflict.
CREATE TABLE webhook_event (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider          provider NOT NULL,
  provider_event_id text NOT NULL,
  type              text NOT NULL,
  payload           jsonb NOT NULL,
  signature_ok      boolean NOT NULL,
  received_at       timestamptz NOT NULL DEFAULT now(),
  processed_at      timestamptz,
  attempts          integer NOT NULL DEFAULT 0,
  last_error        text,
  UNIQUE (provider, provider_event_id)
);
CREATE INDEX webhook_unprocessed ON webhook_event (received_at)
  WHERE processed_at IS NULL;

-- Requests we made outward, so a retry after a timeout cannot double-charge.
CREATE TABLE outbound_idempotency (
  key         text PRIMARY KEY,
  provider    provider NOT NULL,
  operation   text NOT NULL,
  response    jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Who did what to money. Not optional in a system that can refund.
CREATE TABLE audit_log (
  id          bigserial PRIMARY KEY,
  actor       text NOT NULL,               -- account_user id, 'system', or 'webhook:stripe'
  action      text NOT NULL,
  subject     text NOT NULL,               -- 'payment:<uuid>'
  before      jsonb,
  after       jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMIT;

-- ---------------------------------------------------------------------------
-- Seed: the credit costs from the pricing plan. Change by inserting a new row
-- with a later valid_from and closing the old one — never by UPDATE.
--
-- INSERT INTO credit_price (action, credits) VALUES
--   ('trend_scan', 1), ('keyword_analysis', 2), ('research', 5),
--   ('article', 20), ('deep_report', 50);
--
-- Balance for an account:
--   SELECT * FROM credit_balance WHERE account_id = $1;
--
-- Spend, refusing to go negative, in one statement:
--   INSERT INTO credit_ledger (account_id, delta, reason, pool, ref_kind, ref_id)
--   SELECT $1, -$2, 'consumption', 'allowance', 'usage_event', $3
--    WHERE (SELECT coalesce(balance, 0) FROM credit_balance WHERE account_id = $1) >= $2;
--   -- zero rows affected means insufficient credits. No read-then-write race.
