// https://leetcode.com/problems/valid-palindrome/?envType=study-plan-v2&envId=top-interview-150

/**
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters,
 it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.
 */

function isPalindrome(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (clean.length === 0) return true;

  let result = true;
  clean.split("").forEach((c, index) => {
    if (c !== clean[clean.length - 1 - index]) {
      result = false;
    }
  });
  return result;
}

export function solution125() {
  verify("A man, a plan, a canal: Panama", true);
  verify("race a car", false);
  verify(" ", true);
  verify("0P", false);
}

function verify(input: string, result: boolean) {
  const execution = isPalindrome(input);

  console.log(
    `  ===> Verifying ${input} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
