// https://leetcode.com/problems/array-prototype-last/

/**
 * Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element.
 * If there are no elements in the array, it should return -1.
 *
 * You may assume the array is the output of JSON.parse.
 */

interface Array<T> {
  last(): T | -1;
}

Array.prototype.last = function () {
  if (this.length === 0) return -1;
  return this[this.length - 1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */

export function solution2619() {
  verify([1, 2, 3], 3);
  verify([], -1);
}

function verify(arr: any[], result: number) {
  const execution = arr.last();

  console.log(
    `  ===> Verifying ${arr} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
