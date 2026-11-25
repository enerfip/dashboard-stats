import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseEnerfipInsuredAmountData, parseEnerfipAmountData } from './response.js';

const response = (row) => ({ query_result: { data: { rows: [row] } } });

test('reads the insured amount without changing the collected amount', () => {
  const data = response({ insured_amount: 123456.78, collected_amount: 987654 });
  assert.equal(parseEnerfipInsuredAmountData(data), 123456.78);
  assert.equal(parseEnerfipAmountData(data), 987654);
});

test('distinguishes a genuine zero from an unavailable amount', () => {
  assert.equal(parseEnerfipInsuredAmountData(response({ insured_amount: 0 })), 0);
  assert.equal(parseEnerfipInsuredAmountData(response({ insured_amount: null })), null);
});

test('rejects missing, malformed and negative insured amounts', () => {
  for (const amount of [undefined, '123', NaN, Infinity, -1]) {
    assert.throws(
      () => parseEnerfipInsuredAmountData(response({ insured_amount: amount })),
      /Invalid insured amount/,
    );
  }
});

test('rejects missing and empty query results', () => {
  for (const data of [{}, { query_result: { data: { rows: [] } } }]) {
    assert.throws(() => parseEnerfipInsuredAmountData(data), /No data available/);
  }
});
