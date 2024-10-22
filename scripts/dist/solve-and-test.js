"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateSolveAndTest = templateSolveAndTest;
function templateSolveAndTest(title, slugName, code) {
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
