/**
 * @fileoverview Shared utilities for E2E tests
 *
 * This module provides common utilities to reduce code duplication across test files.
 */

import { exec } from "node:child_process";
import { promisify } from "node:util";
import JSON5 from "json5";
import type { Endpoint } from "@/shared/types";
import { testLogger } from "./logger";

const execAsync = promisify(exec);

/**
 * Options for CLI command execution
 */
interface CliTestOptions {
  timeout?: number;
  maxBuffer?: number;
}

/**
 * Executes a CLI command and validates the JSON output
 */
export async function executeCliTest(
  endpoint: Endpoint<unknown, unknown>,
  commandSuffix: string = "",
  options: CliTestOptions = {}
): Promise<{ success: boolean; message: string; data?: unknown }> {
  const { api, functionName } = endpoint;
  const qualifiedFunctionName = `${api}:${functionName}`;

  const {
    timeout = 600, // 60 second timeout
    maxBuffer = 1024 * 1024 * 10, // 10MB buffer to handle large API responses
  } = options;

  try {
    testLogger.testStep(`Testing CLI command for ${qualifiedFunctionName}`);

    // Execute the fetch-dottie CLI command
    const command = `node dist/cli/fetch-dottie.mjs ${qualifiedFunctionName}${commandSuffix}`;
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout,
      maxBuffer,
      env: process.env,
    });

    // Check for stderr output which might indicate issues
    if (stderr && stderr.trim() !== "") {
      testLogger.warn(
        `Command ${qualifiedFunctionName} produced stderr: ${stderr}`
      );
    }

    // Try to parse the output to ensure it's valid JSON using JSON5 which is more tolerant of formatting issues
    let data: unknown;
    try {
      data = JSON5.parse(stdout);
    } catch (parseError) {
      return {
        success: false,
        message: `Failed to parse JSON output from CLI: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
      };
    }

    // Verify that we got meaningful data back
    if (data === null || data === undefined) {
      return {
        success: false,
        message: `CLI command returned null or undefined for ${qualifiedFunctionName}`,
      };
    }

    // For arrays, check if they have content (unless whitelisted)
    if (Array.isArray(data)) {
      const emptyDataWhitelist = [
        "wsf-schedule:routesHavingServiceDisruptions",
        "wsf-schedule:timeAdjustmentsBySchedRoute",
      ];

      if (
        !emptyDataWhitelist.includes(qualifiedFunctionName) &&
        data.length === 0
      ) {
        testLogger.warn(
          `CLI command returned empty array for ${qualifiedFunctionName} (not in whitelist)`
        );
      }
    }

    testLogger.testStep(`CLI test passed for ${qualifiedFunctionName}`, {
      resultType: typeof data,
      isArray: Array.isArray(data),
      hasData: Array.isArray(data) ? data.length > 0 : data !== null,
    });

    return {
      success: true,
      message: `CLI test passed for ${qualifiedFunctionName}`,
      data,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    testLogger.error(
      `CLI test failed for ${qualifiedFunctionName}: ${errorMessage}`
    );

    return {
      success: false,
      message: `CLI test failed for ${qualifiedFunctionName}: ${errorMessage}`,
    };
  }
}

/**
 * Checks if data is useful (not null, not empty array if array)
 */
export function isUsefulData(
  value: unknown,
  qualifiedFunctionName: string
): boolean {
  // Whitelist for endpoints that are expected to return empty data
  const emptyDataWhitelist = [
    "wsf-schedule:routesHavingServiceDisruptions",
    "wsf-schedule:timeAdjustmentsBySchedRoute",
  ];

  if (emptyDataWhitelist.includes(qualifiedFunctionName)) {
    // For whitelisted endpoints, return true even if data is empty
    return true;
  }

  if (value === null || value === undefined) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }

  return true;
}
