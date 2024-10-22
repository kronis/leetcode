export function templateSolveAndTest(title: string, slugName: string, code: string): string {
  return `// ${title}
// https://leetcode.com/problems/${slugName}

/**
 * Solve
 */
${code}
 
/**
 * Test
 */
describe("${title}", () => {
    it("example 1", () => {
        // 🟡 Add test case here.
        const input = false;
        expect(input).toBe(true);
    });
});

// Make this file a module to avoid global scoping
export { }
`;
}
