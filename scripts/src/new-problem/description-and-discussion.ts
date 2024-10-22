export function templateDescribeAndDiscuss(
  title: string,
  slugName: string,
  description: string
): string {
  return `# ${title}

https://leetcode.com/problems/${slugName}
${description}

`;
}
