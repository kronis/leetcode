#!/usr/bin/env.node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { templateDescribeAndDiscuss } from "./description-and-discussion";
import { templateSolveAndTest } from "./solve-and-test";
import * as fs from "fs";
import * as TurndownService from "turndown";
import {
  ApolloClient,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const options = yargs(hideBin(process.argv))
  .usage("Usage: $0 -t/--title [title]")
  .option("t", {
    alias: "title",
    describe: "Problem title",
    type: "string",
    demandOption: true,
    requiresArg: true,
  })
  .option("v", {
    alias: "verbose",
    describe: "Verbose mode",
    type: "boolean",
    demandOption: false,
    requiresArg: false,
  })
  .epilogue(`📌 Problem title must be formatted as: '{number}. {name}'`)
  .parseSync();

const title: string = options.t;
const verbose: boolean = options.v || false;

const logVerbose = (message: string) => {
  if (verbose) {
    console.log(`[DEBUG] ${message}`);
  }
};

// Verbose logging of the raw title input
logVerbose(`Raw title: ${title}`);

if (!title.match(/^[\d]+\. [\w ]+$/)) {
  throw new Error("Wrong format of title.");
}

const [number, name] = title.split(". ");
const slugName = name.toLowerCase().split(" ").join("-");
const slugTitle = `${number}-${slugName}`;

// Verbose logging of extracted details
logVerbose(`Number: ${number}`);
logVerbose(`Name: ${name}`);
logVerbose(`SlugName: ${slugName}`);
logVerbose(`SlugTitle: ${slugTitle}`);

/**
 * Create starter files
 */
const createStarterFiles = async () => {
  logVerbose("🛠  Setting up starter files...");

  const basePath = `${__dirname}/../../src/${slugTitle}`;

  try {
    fs.mkdirSync(basePath, { recursive: true });
    console.log(" ✓ Done making folder");
    logVerbose(`Folder created at: ${basePath}`);
    console.log(`✅ Your files are ready: src/${slugTitle}/`);
  } catch (error) {
    console.error("🚨 Something went wrong!");
    console.error(error);
  }
};

/**
 * Render Intro
 */
const renderIntro = () => {
  console.log("===> " + slugTitle + " <===");
  logVerbose("Intro rendered for the problem.");
};

/**
 * Render Outro
 */
const renderOutro = () => {
  logVerbose("Outro rendered. Process completed.");
};

if (verbose) {
  loadDevMessages();
  loadErrorMessages();
}

const aClient = new ApolloClient({
  uri: "https://leetcode.com/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      QuestionNode: {
        keyFields: ["questionId"],
      },
    },
  }),
});

const generateMdFile = (client: ApolloClient<NormalizedCacheObject>) => {
  logVerbose("Generating Markdown file...");
  client
    .query({
      variables: {
        titleSlug: slugName,
      },
      query: gql`
        query questionContent($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            content
          }
        }
      `,
    })
    .then((result) => {
      const html = result.data.question.content;
      var turndownService = new TurndownService.default();
      const markdown = turndownService.turndown(html);
      const mdContent = templateDescribeAndDiscuss(title, slugName, markdown);
      const basePath = `${__dirname}/../../src/${slugTitle}`;
      fs.writeFileSync(`${basePath}/${number}.md`, mdContent);
      logVerbose(`Markdown file created at ${basePath}/${number}.md`);
    })
    .catch((error) => console.error(error));
};

const generateTsFile = (client: ApolloClient<NormalizedCacheObject>) => {
  logVerbose("Generating TypeScript file...");
  client
    .query({
      variables: {
        titleSlug: slugName,
      },
      query: gql`
        query questionEditorData($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            questionFrontendId
            codeSnippets {
              lang
              langSlug
              code
            }
          }
        }
      `,
    })
    .then((result) => {
      type CodeSnippetType = {
        lang: string;
        langSlug: string;
        code: string;
      };

      const codeSnippets: CodeSnippetType[] = result.data.question.codeSnippets;
      const ts = codeSnippets.find(
        (val: CodeSnippetType) => val.lang === "TypeScript",
      );

      if (ts) {
        const basePath = `${__dirname}/../../src/${slugTitle}`;
        const tsContent = templateSolveAndTest(title, slugName, ts.code);
        if (!fs.existsSync(`${basePath}/${number}.test.ts`)) {
          fs.writeFileSync(`${basePath}/${number}.test.ts`, tsContent);
          logVerbose(`TypeScript file created at ${basePath}/${number}.test.ts`);
          console.log(" ✓ Done creating .ts file");
        }
      }
    })
    .catch((error) => console.error(error));
};

/**
 * Run functions
 */
renderIntro();
createStarterFiles();
generateMdFile(aClient);
generateTsFile(aClient);
renderOutro();
