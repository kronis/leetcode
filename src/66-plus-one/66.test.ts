// 66. Plus One
import { split } from '../../scripts/node_modules/@apollo/client/link/core/split';
// https://leetcode.com/problems/plus-one

/**
 * Solve
 */
function plusOne(digits: number[]): number[] {
    const s = digits.join("");
    let n = BigInt(s);
    n++;
    return String(n).split("").map((v) => {
        return Number(v)
    });
}

/**
 * Test
 */
describe("66. Plus One", () => {
  type inputType = {
    digits: number[];
    output: number[];
  };

  const testData: inputType[] = [
    {
      digits: [1, 2, 3],
      output: [1, 2, 4],
    },
    {
      digits: [4, 3, 2, 1],
      output: [4, 3, 2, 2],
    },
    {
      digits: [9],
      output: [1, 0],
    },
  ];

  testData.forEach((test) => {
    it(`Test: ${test.digits} should be ${test.output}`, () => {
      expect(plusOne(test.digits)).toStrictEqual(test.output);
    });
  });
});

// Make this file a module to avoid global scoping
export {};
