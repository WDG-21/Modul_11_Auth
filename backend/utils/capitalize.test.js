import capitalize from './capitalize.js';
import { test, expect, describe } from 'vitest';

//  Unit Test
test("Should capitalize 'hello world!'", () => {
  // Arrange
  const testCase = 'hello world!';
  const expectedResult = 'Hello World!';

  // Act
  const actualResult = capitalize(testCase);

  // Assert
  expect(actualResult).not.toBe(20);
  expect(actualResult).toBe(expectedResult);
});

//  Test Tabelle
describe('capitalize function with test table', () => {
  const testCases = [
    { input: 'hello world!', expected: 'Hello World!' },
    { input: 'Dies ist mein zweiter testcase', expected: 'Dies Ist Mein Zweiter Testcase' },
    { input: '42 test', expected: '42 Test' },
    { input: '', expected: '' },
  ];

  testCases.forEach((testCase) => {
    test(`capitalize ${testCase.input} to ${testCase.expected}`, () => {
      const actual = capitalize(testCase.input);
      expect(actual).toBe(testCase.expected);
    });
  });
});
