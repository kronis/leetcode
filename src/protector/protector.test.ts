import {
  filterAnagrams,
  getKey,
  groupAnagrams,
  printResultToConsole,
  readFile,
  solution,
} from "./protector";

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
