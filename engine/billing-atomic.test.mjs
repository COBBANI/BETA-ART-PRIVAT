import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openBilling, ensureAccount, addCredits, spendCredits, creditBalance, recordPayment, hasEntitlement } from './billing.mjs';

test('a failed usage record cannot leave a debit behind', () => {
  const db = openBilling(':memory:');
  try {
    const {id} = ensureAccount(db, {email:'rollback@example.test'});
    addCredits(db, id, 100);
    assert.throws(() => spendCredits(db, id, 'article', {meta:{invalid:1n}}));
    assert.equal(creditBalance(db, id), 100);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM usage_events').get().n, 0);
    assert.equal(spendCredits(db, id, 'article').balance, 80);
  } finally { db.close(); }
});

test('failed entitlement rolls back payment and credits, so the payment can be retried', () => {
  const db = openBilling(':memory:');
  try {
    const {id} = ensureAccount(db, {email:'payment@example.test'});
    const payment = {accountId:id, provider:'test', providerRef:'ref-1', amount:100,
      currency:'NOK', kind:'one_time', credits:10, feature:'report'};
    db.exec("CREATE TRIGGER fail_entitlement BEFORE INSERT ON entitlements BEGIN SELECT RAISE(ABORT, 'test failure'); END;");
    assert.throws(() => recordPayment(db, payment), /test failure/);
    assert.equal(creditBalance(db, id), 0);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM payments').get().n, 0);
    db.exec('DROP TRIGGER fail_entitlement');
    assert.ok(recordPayment(db, payment).ok);
    assert.equal(creditBalance(db, id), 10);
    assert.ok(hasEntitlement(db, id, 'report'));
    assert.equal(recordPayment(db, payment).reason, 'zaten_islenmis');
  } finally { db.close(); }
});

test('credits reject invalid numbers and respect a caller rollback', () => {
  const db = openBilling(':memory:');
  try {
    const {id} = ensureAccount(db, {email:'numbers@example.test'});
    for (const amount of [NaN, Infinity, 1.5, '20', 0, -1])
      assert.throws(() => addCredits(db, id, amount));
    for (const operation of ['constructor','toString','unknown'])
      assert.throws(() => spendCredits(db, id, operation), /Bilinmeyen/);
    db.exec('BEGIN');
    addCredits(db, id, 20);
    assert.equal(creditBalance(db, id), 20);
    db.exec('ROLLBACK');
    assert.equal(creditBalance(db, id), 0);
  } finally { db.close(); }
});
