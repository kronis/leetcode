"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateDescribeAndDiscuss = templateDescribeAndDiscuss;
function templateDescribeAndDiscuss(title, slugName, description) {
    return `# ${title}

https://leetcode.com/problems/${slugName}
${description}

`;
}
