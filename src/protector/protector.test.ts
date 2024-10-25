import * as fs from "fs";

/**
 * Reads a file in current directory.
 * @returns A string[] with all lines from the file, trimmed.
 */
function readFile(fileName: string = "ordbok-utf8.txt"): string[] {
  const filePath = `${__dirname}/${fileName}`;
  const words = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  return words;
}

/**
 * We need a key for the hashmap for every anagram.
 * @param word The word that we need to create/find correct key for.
 * @returns A string of the key.
 */
function getKey(word: string): string {
  return word.toLowerCase().split("").sort().join("");
}

/**
 * Create a hashmap to store our anagrams.
 * @param words A word list to look in.
 * @param getKeyFunc A function to generate a key for the hashmap for a word.
 * @returns An object of all anagrams.
 */
function groupAnagrams(
  words: string[],
  getKeyFunc: (word: string) => string,
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  words.map((word) => {
    const key = getKeyFunc(word);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(word);
  });
  return result;
}

/**
 * How we should present the anagrams.
 * @param anagrams A hashmap containing the correct information.
 */
function printResultToConsole(anagrams: Record<string, string[]>) {
  Object.keys(anagrams).forEach((key) => {
    console.log(anagrams[key].join(" "));
  });
}

/**
 * Filter out all words from an anagram object that only has one word in it.
 * @param anagrams A hashmap containing all anagrams.
 * @returns A filtered list of anagrams.
 */
function filterAnagrams(
  anagrams: Record<string, string[]>,
): Record<string, string[]> {
  return Object.keys(anagrams).reduce(
    (filteredAnagrams, anagramKey) => {
      if (anagrams[anagramKey].length > 1) {
        filteredAnagrams[anagramKey] = anagrams[anagramKey];
      }
      return filteredAnagrams;
    },
    {} as Record<string, string[]>,
  );
}

/**
 * Function that solves the presented problem.
 * - Read a file with a list of words.
 * - Not all words have an anagram.
 * - Each line in the result should contain the words that are anagrams of each other.
 * - You should only find one-word anagrams. (I am note sure about this)
 */
function solution() {
  const words = readFile();
  const anagrams = groupAnagrams(words, getKey);
  const filterdAnagrams = filterAnagrams(anagrams);
  printResultToConsole(filterdAnagrams);
}

// Below all tests for running it all.
describe("Protector test", () => {
  it("Should read a file", () => {
    const words = readFile();
    expect(words).toHaveLength(1139);
  });

  it("Should sort the letters in a word to generate a key for a hash map", () => {
    expect(getKey("abc")).toBe("abc");
    expect(getKey("aBc")).toBe("abc");
    expect(getKey("søvn")).toBe("nsvø");
    expect(getKey("krykkene")).toBe("eekkknry");
  });

  it("Should create a hashMap with anagrams", () => {
    const resultSimple = groupAnagrams(["bak", "bakom", "kab"], getKey);
    expect(resultSimple).toStrictEqual({
      abk: ["bak", "kab"],
      abkmo: ["bakom"],
    });
  });

  it("Should print out the result", () => {
    const logSpy = jest.spyOn(console, "log");
    printResultToConsole({ abk: ["bak", "kab"], abkmo: ["bakom"] });
    expect(logSpy).toHaveBeenCalledWith("bak kab");
    expect(logSpy).toHaveBeenCalledWith("bakom");
    logSpy.mockRestore();
  });

  it("Should filter out anagrams that is more than just one word", () => {
    expect(
      filterAnagrams({
        abk: ["bak", "kab"],
        abkmo: ["bakom"],
        abc: ["abc"],
        def: ["efd", "fed", "edf"],
      }),
    ).toStrictEqual({ abk: ["bak", "kab"], def: ["efd", "fed", "edf"] });
  });

  it("Should print the solution", () => {
    const logSpy = jest.spyOn(console, "log");
    solution();
    expect(logSpy).toHaveBeenCalledTimes(29);
    logSpy.mockRestore();
  });
});
