// 392. Is Subsequence
// https://leetcode.com/problems/is-subsequence

/**
 * Solve
 */
function isSubsequence(s: string, t: string): boolean {
  const lookFor = s.split("");
  const inArray = t.split("");

  let result = true;
  lookFor.forEach((lookForChar, index) => {
    const i = inArray.indexOf(lookForChar);
    if (i !== -1) {
      inArray.splice(0, i + 1);
    } else {
      result = false;
    }
  });
  return result;
}

/**
 * Test
 */
describe("392. Is Subsequence", () => {
  const testData = [
    {
      s: "abc",
      t: "ahbgdc",
      output: true,
    },
    {
      s: "axc",
      t: "ahbgdc",
      output: false,
    },
    {
      s: "rjufvjafbxnbgriwgokdgqdqewn",
      t: "mjmqqjrmzkvhxlyruonekhhofpzzslupzojfuoztvzmmqvmlhgqxehojfowtrinbatjujaxekbcydldglkbxsqbbnrkhfdnpfbuaktupfftiljwpgglkjqunvithzlzpgikixqeuimmtbiskemplcvljqgvlzvnqxgedxqnznddkiujwhdefziydtquoudzxstpjjitmiimbjfgfjikkjycwgnpdxpeppsturjwkgnifinccvqzwlbmgpdaodzptyrjjkbqmgdrftfbwgimsmjpknuqtijrsnwvtytqqvookinzmkkkrkgwafohflvuedssukjgipgmypakhlckvizmqvycvbxhlljzejcaijqnfgobuhuiahtmxfzoplmmjfxtggwwxliplntkfuxjcnzcqsaagahbbneugiocexcfpszzomumfqpaiydssmihdoewahoswhlnpctjmkyufsvjlrflfiktndubnymenlmpyrhjxfdcq",
      output: false,
    }, {
      s: "aaaaaa",
      t: "bbaaaa",
      output: false,
    },
  ];

  testData.forEach((test) => {
    it(
      "Test: " + test.s + " in " + test.t + " should be " + test.output,
      () => {
        expect(isSubsequence(test.s, test.t)).toBe(test.output);
      },
    );
  });
});

// Make this file a module to avoid global scoping
export {};
