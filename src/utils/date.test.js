import { prettifyDate } from './date';

const date = new Date(1533376903000);

console.dir = jest.fn();
console.log = jest.fn();

test('prettifyDate: Implementaiton', () => {
  expect(prettifyDate({ date })).toBe('August 4th, 2018 at 10:01am');
});
