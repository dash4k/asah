import { test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

test('Positive Sum (1 + 2)', () => {
  assert.strictEqual(sum(1, 2), 3);
});

test('Zero with Positive (0 + 5)', () => {
  assert.strictEqual(sum(0, 5), 5);
});

test('Zeros Sum (0 + 0)', () => {
  assert.strictEqual(sum(0, 0), 0);
});

test('Floating Sum (2.5 + 2.5)', () => {
  assert.strictEqual(sum(2.5, 2.5), 5);
});

test('Negative first param (-1 + 2)', () => {
  assert.strictEqual(sum(-1, 2), 0);
});

test('Negative second param (1 + -2)', () => {
  assert.strictEqual(sum(1, -2), 0);
});

test('String inputs ("a" + "b")', () => {
  assert.strictEqual(sum('a', 'b'), 0);
});

test('Mixed number and string (1 + "2")', () => {
  assert.strictEqual(sum(1, '2'), 0);
});

test('Objects as input ({}, [])', () => {
  assert.strictEqual(sum({}, []), 0);
});

test('Undefined and null (undefined + null)', () => {
  assert.strictEqual(sum(undefined, null), 0);
});

test('Large numbers (MAX_SAFE_INTEGER + 1)', () => {
  assert.strictEqual(sum(Number.MAX_SAFE_INTEGER, 1), Number.MAX_SAFE_INTEGER + 1);
});