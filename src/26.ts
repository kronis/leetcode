// https://leetcode.com/problems/remove-duplicates-from-sorted-array/?envType=study-plan-v2&envId=top-interview-150

/**
Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. 
The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. 
The remaining elements of nums are not important as well as the size of nums.
Return k.
*/

/**
 Do not return anything, modify nums1 in-place instead.
 */
function removeDuplicates(nums: number[]): number {
  let removed = nums.length;
  let i = 1;
  while (i < nums.length) {
    if (nums[i] === nums[i - 1]) {
      removed--;
      nums.splice(i, 1);
      continue;
    }
    i++;
  }

  return removed;
}

export function solution26() {
  verify([1, 1, 2], 2);
  verify([0, 0, 1, 1, 1, 2, 2, 3, 3, 4], 5);
}

function verify(param: number[], result: number) {
  const original = param.slice();
  const execution = removeDuplicates(param);
  console.log(execution) ;
  console.log(param) ;
  console.log(
    `  ===> Verifying ${original} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
