/* Ödeme ve kredi mantığı — sağlayıcıdan bağımsız.
 *
 * Stripe/Vipps entegrasyonu buraya girmez; onlar yalnızca webhook gönderir,
 * bu dosya kaydı tutar. Böylece sağlayıcı değiştiğinde iş mantığı değişmez.
 */
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const nowISO = () => new Date().toISOString();

// Savepoints keep multi-table writes atomic, including inside caller transactions.
function atomic(db, work) {
  db.exec('SAVEPOINT qblogg_billing');
  try {
    const result = work();
    db.exec('RELEASE qblogg_billing');
    return result;
  } catch (error) {
    db.exec('ROLLBACK TO qblogg_billing; RELEASE qblogg_billing');
    throw error;
  }
}

/* Kredi fiyat listesi — bir işlem kaç kredi yer. */
export const CREDIT_COST = {
  trend_scan: 1,
  keyword_analysis: 2,
  research: 5,
  article: 20,
  deep_report: 50
};

export function openBilling(path = join(HERE, 'data', 'billing.db')) {
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  db.exec(readFileSync(join(HERE, 'schema-billing.sql'), 'utf8'));
  return db;
}

/* ---------------------------------------------------------------- hesap */

export function ensureAccount(db, { email, name = null, company = null, country = null, currency = 'NOK' }) {
  const found = db.prepare('SELECT * FROM accounts WHERE email = ?').get(email);
  if (found) return found;
  db.prepare(`INSERT INTO accounts (email, name, company, country, currency, created_at)
              VALUES (?,?,?,?,?,?)`).run(email, name, company, country, currency, nowISO());
  return db.prepare('SELECT * FROM accounts WHERE email = ?').get(email);
}

/* ---------------------------------------------------------------- kredi defteri */

/** Bakiye her zaman defterden hesaplanır — sütundan değil. */
export function creditBalance(db, accountId) {
  const row = db.prepare('SELECT COALESCE(SUM(delta), 0) AS balance FROM credit_ledger WHERE account_id = ?')
    .get(accountId);
  return Number(row.balance);
}

export function addCredits(db, accountId, amount, { reason = 'topup', refType = null, refId = null } = {}) {
  return atomic(db, () => {
    if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('Yükleme pozitif olmalı');
    const balance = creditBalance(db, accountId) + amount;
    if (!Number.isSafeInteger(balance)) throw new Error('Kredi bakiyesi güvenli tam sayı sınırını aşıyor');
    db.prepare(`INSERT INTO credit_ledger (account_id, delta, reason, ref_type, ref_id, balance_after, created_at)
                VALUES (?,?,?,?,?,?,?)`).run(accountId, amount, reason, refType, refId, balance, nowISO());
    return balance;
  });
}

/** Kredi harcar. Bakiye yetmezse hiçbir şey yazmaz ve false döner. */
export function spendCredits(db, accountId, operation, { refId = null, meta = null } = {}) {
  return atomic(db, () => {
    const cost = Object.hasOwn(CREDIT_COST, operation) ? CREDIT_COST[operation] : null;
    if (!cost) throw new Error('Bilinmeyen işlem: ' + operation);
    const balance = creditBalance(db, accountId);
    if (balance < cost) return { ok: false, balance, needed: cost };

    const after = balance - cost;
    db.prepare(`INSERT INTO credit_ledger (account_id, delta, reason, ref_type, ref_id, balance_after, created_at)
                VALUES (?,?,?,?,?,?,?)`).run(accountId, -cost, 'usage', 'job', refId, after, nowISO());
    db.prepare(`INSERT INTO usage_events (account_id, operation, credits, meta, created_at)
                VALUES (?,?,?,?,?)`).run(accountId, operation, cost, meta ? JSON.stringify(meta) : null, nowISO());
    return { ok: true, balance: after, spent: cost };
  });
}

/* ---------------------------------------------------------------- haklar */

export function grantEntitlement(db, accountId, feature, { sourceType, sourceId = null, expiresAt = null }) {
  db.prepare(`INSERT OR IGNORE INTO entitlements (account_id, feature, source_type, source_id, granted_at, expires_at)
              VALUES (?,?,?,?,?,?)`).run(accountId, feature, sourceType, sourceId, nowISO(), expiresAt);
}

export function hasEntitlement(db, accountId, feature) {
  const row = db.prepare(`SELECT 1 FROM entitlements
    WHERE account_id = ? AND feature = ? AND revoked_at IS NULL
      AND (expires_at IS NULL OR expires_at > ?) LIMIT 1`).get(accountId, feature, nowISO());
  return !!row;
}

/* ---------------------------------------------------------------- webhook */

/** Olayı tekilleştirir. false dönerse bu olay daha önce işlenmiştir. */
export function claimWebhook(db, provider, eventId, type, payload) {
  try {
    db.prepare(`INSERT INTO webhook_events (provider, event_id, type, payload, received_at)
                VALUES (?,?,?,?,?)`).run(provider, eventId, type, JSON.stringify(payload ?? null), nowISO());
    return true;
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) return false;   // aynı olay tekrar geldi
    throw e;
  }
}

export function markWebhook(db, provider, eventId, status, error = null) {
  db.prepare(`UPDATE webhook_events SET processed_at = ?, status = ?, error = ?
              WHERE provider = ? AND event_id = ?`).run(nowISO(), status, error, provider, eventId);
}

/* ---------------------------------------------------------------- ödeme kaydı */

/** Ödemeyi kaydeder ve karşılığındaki hakkı/krediyi verir.
 *  Aynı provider_ref ikinci kez gelirse hiçbir şey yapmaz. */
export function recordPayment(db, { accountId, provider, providerRef, amount, currency, kind,
                                    productCode = null, credits = 0, feature = null, expiresAt = null }) {
  return atomic(db, () => {
    if (!Number.isSafeInteger(amount) || amount < 0) throw new Error('Ödeme tutarı negatif olmayan tam sayı olmalı');
    if (!Number.isSafeInteger(credits) || credits < 0) throw new Error('Kredi miktarı negatif olmayan tam sayı olmalı');
    const exists = db.prepare('SELECT id FROM payments WHERE provider = ? AND provider_ref = ?')
      .get(provider, providerRef);
    if (exists) return { ok: false, reason: 'zaten_islenmis', paymentId: Number(exists.id) };

    const product = productCode
      ? db.prepare('SELECT id FROM products WHERE code = ?').get(productCode) : null;

    const res = db.prepare(`INSERT INTO payments
      (account_id, provider, provider_ref, amount, currency, status, kind, product_id, created_at)
      VALUES (?,?,?,?,?,'succeeded',?,?,?)`)
      .run(accountId, provider, providerRef, amount, currency, kind, product?.id ?? null, nowISO());
    const paymentId = Number(res.lastInsertRowid);

    if (credits > 0) addCredits(db, accountId, credits, { reason: 'purchase', refType: 'payment', refId: String(paymentId) });
    if (feature) grantEntitlement(db, accountId, feature, { sourceType: 'payment', sourceId: String(paymentId), expiresAt });
    return { ok: true, paymentId };
  });
}

/** Para biçimlendirme — tam sayı kuruştan okunabilir metne. */
export function formatMoney(minor, currency = 'NOK', locale = 'nb-NO') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(minor / 100);
}
