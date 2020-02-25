import { double, power } from './number';

test('double', () => {
  const result = double(2);
  expect(result).toBe(4);
});

test('power', () => {
  const result = power(2, 4);
  expect(result).toBe(16);
});
