// 55. Jump Game
// https://leetcode.com/problems/jump-game

/**
 * Solve
 */
function canJump(nums: number[]): boolean {
  return false;
}

/**
 * Test
 */
describe.skip("55. Jump Game", () => {
  it("[2,3,1,1,4]", () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
  });
  it("[2,3,1,1,4]", () => {
    expect(canJump([3, 2, 1, 0, 4])).toBe(false);
  });
});

// Make this file a module to avoid global scoping
export {};
