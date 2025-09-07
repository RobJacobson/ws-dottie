#!/usr/bin/env node

/**
 * ws-dottie CLI
 *
 * Command-line interface for accessing Washington State transportation APIs
 * (WSDOT and WSF) with smart caching and data transformation.
 *
 * Usage: ws-dottie <function-name> [params] [--pretty=false]
 */

import chalk from "chalk";
import { Command } from "commander";
import { handleCommand, generateHelpText } from "./commands";
import type { CliOptions } from "./types";

/**
 * Main CLI program
 */
const program = new Command();

program
  .name("ws-dottie")
  .description("CLI for Washington State transportation APIs (WSDOT and WSF)")
  .version("1.0.0")
  .argument("<function>", "API function name to call")
  .argument("[params]", "JSON parameters object as string", "{}")
  .option("--pretty", "pretty-print JSON output with 2-space indentation", true)
  .option("--raw", "output raw (unformatted) JSON", false)
  .option(
    "--agent",
    "agent mode: suppress debug output and verbose messages",
    false
  )
  .option(
    "--quiet",
    "quiet mode: suppress debug output and verbose messages",
    false
  )
  .option(
    "--silent",
    "silent mode: suppress all output except final JSON result",
    false
  )
  .action(
    async (functionName: string, paramsString: string, options: CliOptions) => {
      try {
        await handleCommand(functionName, paramsString, options);
      } catch (error) {
        console.error(chalk.red("Unexpected error:"), error);
        process.exit(1);
      }
    }
  );

// Add help examples
program.addHelpText("after", generateHelpText());

/**
 * Main entry point
 */
async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(chalk.red("Unexpected error:"), error);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default program;
