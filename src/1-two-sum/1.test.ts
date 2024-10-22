// 1. Two Sum
// https://leetcode.com/problems/two-sum

/**
 * Solve
 */
function twoSum(nums: number[], target: number): number[] {
  let result: number[] = [];
  nums.forEach((i, iIndex) => {
    nums.forEach((j, jIndex) => {
      if (result.length !== 2 && jIndex > iIndex) {
        if (i + j === target) {
        //   console.log( `Length: ${result.length} --- ${i} (${iIndex}) + ${j} (${jIndex}) = ${i + j}`,);
          result.push(iIndex);
          result.push(jIndex);
        }
      }
    });
  });

  return result;
}

/**
 * Test
 */
describe.skip("1. Two Sum", () => {
  type inputType = {
    nums: number[];
    target: number;
    output: number[];
  };

  const testData: inputType[] = [
    {
      nums: [2, 7, 11, 15],
      target: 9,
      output: [0, 1],
    },
    {
      nums: [3, 2, 4],
      target: 6,
      output: [1, 2],
    },
    {
      nums: [3, 3],
      target: 6,
      output: [0, 1],
    },
  ];

  testData.forEach((test) => {
    it(`Test: ${test.nums} adds up to ${test.target} should be ${test.output}`, () => {
      expect(twoSum(test.nums, test.target)).toStrictEqual(test.output);
    });
  });
});

// Make this file a module to avoid global scoping
export {};
