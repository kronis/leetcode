// https://leetcode.com/problems/merge-sorted-array/?envType=study-plan-v2&envId=top-interview-150

/**
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. 
To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged,
and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
 */

/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  nums1.splice(m); 
  for (let i = 0; i < n; i++) {
    const v = nums2.shift();
    if (v !== undefined) {
      nums1.push(v);
    }
  }
  nums1.sort((a, b) => a - b);
}

export function solution88() {
  verify([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3, [1, 2, 2, 3, 5, 6]);
  verify([1], 1, [], 0, [1]);
  verify([0], 0, [1], 1, [1]);
  verify([-1, -1, 0, 0, 0, 0], 4, [-1, 0], 2, [-1, -1, -1, 0, 0, 0]);
}

function verify(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number,
  result: number[],
) {
  const original = nums1.slice();
  merge(nums1, m, nums2, n);
  const a1 = JSON.stringify(result);
  const a2 = JSON.stringify(nums1);

  // console.log("expected: " + a1);
  // console.log("nums1:    " + a2);

  console.log(
    `  ===> Verifying ${original} : ${m} : ${nums2} : ${n} gives ${result} ===> ${a1 === a2} ${a1 === a2 ? "✅" : "❌"}`,
  );
}
