#!/usr/bin/env.node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const description_and_discussion_1 = require("./description-and-discussion");
const solve_and_test_1 = require("./solve-and-test");
const fs = __importStar(require("fs"));
const TurndownService = __importStar(require("turndown"));
const core_1 = require("@apollo/client/core");
const dev_1 = require("@apollo/client/dev");
const options = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
const title = options.t;
const verbose = options.v || false;
const logVerbose = (message) => {
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
const createStarterFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    logVerbose("🛠  Setting up starter files...");
    const basePath = `${__dirname}/../../src/${slugTitle}`;
    try {
        fs.mkdirSync(basePath, { recursive: true });
        console.log(" ✓ Done making folder");
        logVerbose(`Folder created at: ${basePath}`);
        console.log(`✅ Your files are ready: src/${slugTitle}/`);
    }
    catch (error) {
        console.error("🚨 Something went wrong!");
        console.error(error);
    }
});
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
    (0, dev_1.loadDevMessages)();
    (0, dev_1.loadErrorMessages)();
}
const aClient = new core_1.ApolloClient({
    uri: "https://leetcode.com/graphql/",
    cache: new core_1.InMemoryCache({
        typePolicies: {
            QuestionNode: {
                keyFields: ["questionId"],
            },
        },
    }),
});
const generateMdFile = (client) => {
    logVerbose("Generating Markdown file...");
    client
        .query({
        variables: {
            titleSlug: slugName,
        },
        query: (0, core_1.gql) `
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
        const mdContent = (0, description_and_discussion_1.templateDescribeAndDiscuss)(title, slugName, markdown);
        const basePath = `${__dirname}/../../src/${slugTitle}`;
        fs.writeFileSync(`${basePath}/${number}.md`, mdContent);
        logVerbose(`Markdown file created at ${basePath}/${number}.md`);
    })
        .catch((error) => console.error(error));
};
const generateTsFile = (client) => {
    logVerbose("Generating TypeScript file...");
    client
        .query({
        variables: {
            titleSlug: slugName,
        },
        query: (0, core_1.gql) `
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
        const codeSnippets = result.data.question.codeSnippets;
        const ts = codeSnippets.find((val) => val.lang === "TypeScript");
        if (ts) {
            const basePath = `${__dirname}/../../src/${slugTitle}`;
            const tsContent = (0, solve_and_test_1.templateSolveAndTest)(title, slugName, ts.code);
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
