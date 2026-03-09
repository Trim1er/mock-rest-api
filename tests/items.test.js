const test = require('node:test');
const assert = require('node:assert/strict');
const { getItems } = require('../src/server');

test('pagination works', () => {
  const r = getItems({ page: '2', limit: '5' });
  assert.equal(r.items.length, 5);
  assert.equal(r.items[0].id, 6);
});

test('sorting works', () => {
  const r = getItems({ sortBy: 'price', order: 'desc', limit: '3' });
  assert.equal(r.items[0].price > r.items[1].price, true);
});
