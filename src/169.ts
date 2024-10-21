// https://leetcode.com/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150

/**
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
 */

function majorityElement(nums: number[]): number {
  const calc: Record<number, number> = {};

  nums.forEach((value) => {
    if (!calc[value]) {
      calc[value] = 1;
    } else {
      calc[value]++;
    }
  });
  // console.log(calc);

  let higest:
    | {
        value: number;
        label: string;
      }
    | undefined = undefined;
  Object.keys(calc).forEach((value: string) => {
    // console.log(calc[value])
    const v = calc[value];
    if (higest === undefined) {
      higest = {
        value: v,
        label: value,
      };
    } else if (v > higest.value) {
      higest = {
        value: v,
        label: value,
      };
    }
  });

  // console.log(higest)

  return Number(higest.label);
}

export function solution169() {
  verify([3, 2, 3], 3);
  verify([2, 2, 1, 1, 1, 2, 2], 2);
}

function verify(nums: number[], result: number) {
  const execution = majorityElement(nums);
  // console.log(execution);

  console.log(
    `  ===> Verifying ${nums} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
