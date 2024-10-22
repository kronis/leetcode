// 383. Ransom Note
// https://leetcode.com/problems/ransom-note

/**
 * Solve
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
    const rn = ransomNote.split("");
    const m = magazine.split("");

    let result = true;
    rn.forEach((c) => {
        const i = m.indexOf(c);
        if (i !== -1) {
            m.splice(i, 1);
        } else {
            result = false;
        }

    })
    return result;
}

/**
 * Test
 */
describe("383. Ransom Note", () => {
  type inputType = {
    ransomNote: string;
    magazine: string;
    output: boolean;
  };

  const testData: inputType[] = [
    {
      ransomNote: "a",
      magazine: "b",
      output: false,
    },
    {
      ransomNote: "aa",
      magazine: "ab",
      output: false,
    },
    {
      ransomNote: "aa",
      magazine: "aab",
      output: true,
    },
  ];

  testData.forEach((test) => {
    it(`Test: ${test.ransomNote} in ${test.magazine} should be ${test.output}`, () => {
      expect(canConstruct(test.ransomNote, test.magazine)).toBe(test.output);
    });
  });
});

// Make this file a module to avoid global scoping
export {};
