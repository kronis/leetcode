// 9. Palindrome Number
// https://leetcode.com/problems/palindrome-number

/**
 * Solve
 */
function isPalindrome(x: number): boolean {
    // const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const clean = String(x);

    if (clean.length === 0) return true;
  
    let result = true;
    clean.split("").forEach((c, index) => {
      if (c !== clean[clean.length - 1 - index]) {
        result = false;
      }
    });
    return result;
}

/**
 * Test
 */
describe.skip("9. Palindrome Number", () => {
  type inputType = {
    x: number;
    output: boolean;
  };

  const testData: inputType[] = [
    {
      x: 121,
      output: true,
    },
    {
      x: -121,
      output: false,
    },
    {
      x: 10,
      output: false,
    },
  ];

  testData.forEach((test) => {
    it(`Test: ${test.x} should be ${test.output}`, () => {
      expect(isPalindrome(test.x)).toBe(test.output);
    });
  });
});

// Make this file a module to avoid global scoping
export {};
