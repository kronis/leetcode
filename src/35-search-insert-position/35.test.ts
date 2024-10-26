// 35. Search Insert Position
// https://leetcode.com/problems/search-insert-position

/**
 * Solve
 */
function searchInsert(nums: number[], target: number): number {
  let p1 = 0;
  let p2 = nums.length - 1;

  while (p1 <= p2) {
    const mid = Math.floor((p1 + p2) / 2);
    if (nums[mid] < target) {
      p1 = mid + 1;
    } else if (nums[mid] > target) {
      p2 = mid - 1;
    } else {
      return mid;
    }
  }
  return p1;
}

/**
 * Test
 */
describe("35. Search Insert Position", () => {
  type inputType = {
    nums: number[];
    target: number;
    output: number;
  };

  const testData: inputType[] = [
    {
      nums: [1, 3, 5, 6],
      target: 5,
      output: 2,
    },
    {
      nums: [1, 3, 5, 6],
      target: 2,
      output: 1,
    },
    {
      nums: [1, 3, 5, 6],
      target: 7,
      output: 4,
    },
  ];

  testData.forEach((test) => {
    it(`Test: ${test.nums} with target ${test.target} should be ${test.output}`, () => {
      expect(searchInsert(test.nums, test.target)).toBe(test.output);
    });
  });
});

// Make this file a module to avoid global scoping
export {};
