// https://leetcode.com/problems/to-be-or-not-to-be/

/**
 Write a function expect that helps developers test their code. It should take in any value val and return an object with the following two functions.

toBe(val) accepts another value and returns true if the two values === each other. If they are not equal, it should throw an error "Not Equal".
notToBe(val) accepts another value and returns true if the two values !== each other. If they are equal, it should throw an error "Equal".
**/

type ToBeOrNotToBe = {
  toBe: (val: any) => boolean;
  notToBe: (val: any) => boolean;
};

function expect(v: any): ToBeOrNotToBe {
  const result: ToBeOrNotToBe = {
    toBe(val) {
      if (val === v) {
        return true;
      }
      throw new Error("Not Equal");
    },
    notToBe(val) {
      if (val !== v) {
        return true;
      }
      throw new Error("Equal");
    },
  };
  return result;
}

export function solution2704() {
  console.log(expect(5).toBe(5)); // true
  console.log(expect(5).notToBe(5)); // throws "Equal"
}
