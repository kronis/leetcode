// https://leetcode.com/problems/length-of-last-word/?envType=study-plan-v2&envId=top-interview-150

/**
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.
 */

function lengthOfLastWord(s: string): number {
  const words = s.split(/\s+/g).filter((w) => w !== "");
  return words[words.length - 1].length;
}

export function solution58() {
  verify("Hello World", 5);
  verify("   fly me   to   the moon  ", 4);
  verify("luffy is still joyboy", 6);
}

function verify(input: string, result: number) {
  const execution = lengthOfLastWord(input);

  console.log(
    `  ===> Verifying ${input} gives ${result} ===> ${execution === result} ${execution === result ? "✅" : "❌"}`,
  );
}
