import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('Positive Sum (1 + 2)', () => {
  assert.strictEqual(sum(1, 2), 3);
});

test('Negative Sum (-1 + 1)', () => {
  assert.strictEqual(sum(-1, 1), 0);
});

test('Zeros Sum (0 + 0)', () => {
  assert.strictEqual(sum(0, 0), 0);
});

test('Floatings Sum (2.5 + 2.5)', () => {
  assert.strictEqual(sum(2.5, 2.5), 5);
});

test('Strings Sum (Concatenation) (\'a\' + \'b\')', () => {
  assert.strictEqual(sum('a', 'b'), 'ab');
});

test('Mixed Sum (string + bool) (\'a\' + bool)', () => {
  assert.strictEqual(sum('a', true), 'atrue');
});
