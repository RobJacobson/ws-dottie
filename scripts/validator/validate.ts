#!/usr/bin/env node

/**
 * Simplified Validation Script
 *
 * Compares native API data (via native-fetch) with parsed data (via dottie-fetch)
 * to identify differences and validate data consistency.
 *
 * Usage:
 *   node validate.ts <function-name> [params]
 *
 * Examples:
 *   node validate.ts getTravelTimes
 *   node validate.ts getTravelTimeById '{"travelTimeId": 1}'
 */

import { execSync } from "child_process";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Ensure output directory exists
const outputDir = join(process.cwd(), "validation-results");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

/**
 * Execute CLI command and return parsed JSON
 */
const executeCli = (command: string): unknown => {
  try {
    const output = execSync(command, {
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    // Clean the output - remove any debug messages before JSON
    const cleanOutput = output.trim();

    // Look for the pattern "}...[" which indicates the start of the actual JSON array
    const arrayStart = cleanOutput.indexOf("}...[");
    if (arrayStart !== -1) {
      // Skip the "}...[" part and start from the '['
      const jsonStart = arrayStart + 4; // Skip "}...[" (4 characters)
      const jsonOutput = cleanOutput.substring(jsonStart);

      // Find the end of the JSON array
      const lastBracket = jsonOutput.lastIndexOf("]");
      if (lastBracket !== -1) {
        const finalJson = jsonOutput.substring(0, lastBracket + 1);
        return JSON.parse(finalJson);
      }
    }

    // Look for the pattern "}...{" which indicates the start of the actual JSON object
    const objectStart = cleanOutput.indexOf("}...{");
    if (objectStart !== -1) {
      // Skip the "}...{" part and start from the '{'
      const jsonStart = objectStart + 4; // Skip "}...{" (4 characters)
      const jsonOutput = cleanOutput.substring(jsonStart);

      // Find the end of the JSON object
      const lastBrace = jsonOutput.lastIndexOf("}");
      if (lastBrace !== -1) {
        const finalJson = jsonOutput.substring(0, lastBrace + 1);
        return JSON.parse(finalJson);
      }
    }

    // Fallback: look for the first '[' or '{' character
    const jsonStart = Math.min(
      cleanOutput.indexOf("[") === -1 ? Infinity : cleanOutput.indexOf("["),
      cleanOutput.indexOf("{") === -1 ? Infinity : cleanOutput.indexOf("{")
    );

    if (jsonStart === Infinity) {
      throw new Error("No JSON found in CLI output");
    }

    const jsonOutput = cleanOutput.substring(jsonStart);

    // Try to find the end of JSON by looking for the last ']' or '}'
    let jsonEnd = jsonOutput.length;
    const lastBracket = jsonOutput.lastIndexOf("]");
    const lastBrace = jsonOutput.lastIndexOf("}");

    if (lastBracket !== -1 || lastBrace !== -1) {
      jsonEnd = Math.max(lastBracket, lastBrace) + 1;
    }

    const finalJson = jsonOutput.substring(0, jsonEnd);
    return JSON.parse(finalJson);
  } catch (error) {
    throw new Error(`CLI execution failed: ${error}`);
  }
};

/**
 * Get native data using native-fetch with default parameters
 */
const getNativeData = (
  functionName: string,
  params: Record<string, unknown> = {}
): unknown => {
  const paramsString = JSON.stringify(params);
  const command = `node dist/cli/native-fetch.js ${functionName} '${paramsString}' --silent --fix-dates`;
  return executeCli(command);
};

/**
 * Get parsed data using dottie-fetch with --fix-dates flag
 */
const getParsedData = (
  functionName: string,
  params: Record<string, unknown> = {}
): unknown => {
  const paramsString = JSON.stringify(params);
  const command = `node dist/cli/dottie-fetch.js ${functionName} '${paramsString}' --silent`;
  return executeCli(command);
};

/**
 * Deep compare two objects and find differences
 */
const compareObjects = (
  obj1: unknown,
  obj2: unknown,
  path = ""
): Array<{
  type:
    | "missing_in_parsed"
    | "missing_in_native"
    | "value_difference"
    | "type_mismatch";
  path: string;
  nativeValue?: unknown;
  parsedValue?: unknown;
  nativeType?: string;
  parsedType?: string;
}> => {
  const differences: Array<{
    type:
      | "missing_in_parsed"
      | "missing_in_native"
      | "value_difference"
      | "type_mismatch";
    path: string;
    nativeValue?: unknown;
    parsedValue?: unknown;
    nativeType?: string;
    parsedType?: string;
  }> = [];

  const compare = (val1: unknown, val2: unknown, currentPath: string): void => {
    // Handle null/undefined cases
    if (
      val1 === null ||
      val1 === undefined ||
      val2 === null ||
      val2 === undefined
    ) {
      if (val1 !== val2) {
        differences.push({
          type: "value_difference",
          path: currentPath,
          nativeValue: val1,
          parsedValue: val2,
        });
      }
      return;
    }

    // Handle primitive types
    if (typeof val1 !== "object" || typeof val2 !== "object") {
      if (typeof val1 !== typeof val2) {
        differences.push({
          type: "type_mismatch",
          path: currentPath,
          nativeType: typeof val1,
          parsedType: typeof val2,
          nativeValue: val1,
          parsedValue: val2,
        });
      } else if (val1 !== val2) {
        differences.push({
          type: "value_difference",
          path: currentPath,
          nativeValue: val1,
          parsedValue: val2,
        });
      }
      return;
    }

    // Handle arrays
    if (Array.isArray(val1) && Array.isArray(val2)) {
      const maxLength = Math.max(val1.length, val2.length);
      for (let i = 0; i < maxLength; i++) {
        const arrayPath = `${currentPath}[${i}]`;
        if (i >= val1.length) {
          differences.push({
            type: "missing_in_native",
            path: arrayPath,
            parsedValue: val2[i],
          });
        } else if (i >= val2.length) {
          differences.push({
            type: "missing_in_parsed",
            path: arrayPath,
            nativeValue: val1[i],
          });
        } else {
          compare(val1[i], val2[i], arrayPath);
        }
      }
      return;
    }

    // Handle objects
    if (
      typeof val1 === "object" &&
      typeof val2 === "object" &&
      val1 !== null &&
      val2 !== null
    ) {
      const obj1 = val1 as Record<string, unknown>;
      const obj2 = val2 as Record<string, unknown>;
      const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

      for (const key of allKeys) {
        const keyPath = currentPath ? `${currentPath}.${key}` : key;

        if (!(key in obj1)) {
          differences.push({
            type: "missing_in_native",
            path: keyPath,
            parsedValue: obj2[key],
          });
        } else if (!(key in obj2)) {
          differences.push({
            type: "missing_in_parsed",
            path: keyPath,
            nativeValue: obj1[key],
          });
        } else {
          compare(obj1[key], obj2[key], keyPath);
        }
      }
    }
  };

  compare(obj1, obj2, path);
  return differences;
};

/**
 * Categorize differences for reporting
 */
const categorizeDifferences = (
  differences: ReturnType<typeof compareObjects>
) => {
  return {
    missingInParsed: differences.filter((d) => d.type === "missing_in_parsed"),
    missingInNative: differences.filter((d) => d.type === "missing_in_native"),
    valueDifferences: differences.filter((d) => d.type === "value_difference"),
    typeMismatches: differences.filter((d) => d.type === "type_mismatch"),
  };
};

/**
 * Compare native and parsed data for a single endpoint
 */
const compareEndpoint = (
  functionName: string,
  params: Record<string, unknown> = {}
) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const baseFilename = `${functionName}-${timestamp}`;
  const nativeFile = join(outputDir, `${baseFilename}-native.json`);
  const parsedFile = join(outputDir, `${baseFilename}-parsed.json`);
  const diffFile = join(outputDir, `${baseFilename}-differences.json`);

  console.log(`🔍 Comparing: ${functionName}`);
  if (Object.keys(params).length > 0) {
    console.log(`   Parameters: ${JSON.stringify(params)}`);
  }

  let nativeData: unknown;
  let parsedData: unknown;
  let nativeError: string | null = null;
  let parsedError: string | null = null;

  // Get native data
  try {
    nativeData = getNativeData(functionName, params);
    writeFileSync(nativeFile, JSON.stringify(nativeData, null, 2));
    console.log(`   ✅ Native data retrieved`);
  } catch (error) {
    nativeError = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ Native data failed: ${nativeError}`);
  }

  // Get parsed data
  try {
    parsedData = getParsedData(functionName, params);
    writeFileSync(parsedFile, JSON.stringify(parsedData, null, 2));
    console.log(`   ✅ Parsed data retrieved`);
  } catch (error) {
    parsedError = error instanceof Error ? error.message : String(error);
    console.log(`   ❌ Parsed data failed: ${parsedError}`);
  }

  // Handle errors
  if (nativeError && parsedError) {
    console.log(`   ❌ Both native and parsed data failed`);
    return { success: false, error: "Both data sources failed" };
  }

  if (nativeError) {
    console.log(`   ❌ Cannot compare - native data failed`);
    return { success: false, error: `Native data failed: ${nativeError}` };
  }

  if (parsedError) {
    console.log(`   ❌ Cannot compare - parsed data failed`);
    return { success: false, error: `Parsed data failed: ${parsedError}` };
  }

  // Compare data
  const differences = compareObjects(nativeData, parsedData);
  const categories = categorizeDifferences(differences);

  // Save differences report
  const diffReport = {
    timestamp: new Date().toISOString(),
    functionName,
    parameters: params,
    summary: {
      totalDifferences: differences.length,
      missingInParsed: categories.missingInParsed.length,
      missingInNative: categories.missingInNative.length,
      valueDifferences: categories.valueDifferences.length,
      typeMismatches: categories.typeMismatches.length,
    },
    differences: differences,
    files: {
      native: nativeFile,
      parsed: parsedFile,
    },
  };

  writeFileSync(diffFile, JSON.stringify(diffReport, null, 2));

  // Report results
  console.log(`   📊 Results:`);
  console.log(`      Total differences: ${differences.length}`);
  console.log(`      Missing in parsed: ${categories.missingInParsed.length}`);
  console.log(`      Missing in native: ${categories.missingInNative.length}`);
  console.log(`      Value differences: ${categories.valueDifferences.length}`);
  console.log(`      Type mismatches: ${categories.typeMismatches.length}`);

  // Show missing fields in parsed data (undocumented fields from API)
  if (categories.missingInParsed.length > 0) {
    console.log(`   📋 Undocumented fields found in native API:`);
    categories.missingInParsed.slice(0, 5).forEach((diff) => {
      console.log(`      - ${diff.path}: ${JSON.stringify(diff.nativeValue)}`);
    });
    if (categories.missingInParsed.length > 5) {
      console.log(
        `      ... and ${categories.missingInParsed.length - 5} more`
      );
    }
  }

  // Show missing fields in native data (fields removed by parsing)
  if (categories.missingInNative.length > 0) {
    console.log(`   📋 Fields removed by parsing:`);
    categories.missingInNative.slice(0, 5).forEach((diff) => {
      console.log(`      - ${diff.path}: ${JSON.stringify(diff.parsedValue)}`);
    });
    if (categories.missingInNative.length > 5) {
      console.log(
        `      ... and ${categories.missingInNative.length - 5} more`
      );
    }
  }

  console.log(`   📄 Files saved:`);
  console.log(`      Native: ${nativeFile}`);
  console.log(`      Parsed: ${parsedFile}`);
  console.log(`      Differences: ${diffFile}`);

  return {
    success: true,
    differences: differences.length,
    categories,
    files: { native: nativeFile, parsed: parsedFile, differences: diffFile },
  };
};

/**
 * Main execution function
 */
const main = () => {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
🚀 Data Validation Tool

Compares native API data (via native-fetch) with parsed data (via dottie-fetch)
to identify differences and validate data consistency.

Usage:
  node validate.ts <function-name> [params]

Examples:
  node validate.ts getTravelTimes
  node validate.ts getTravelTimeById '{"travelTimeId": 1}'

Environment:
  WSDOT_ACCESS_TOKEN must be set
`);
    return;
  }

  // Check for required environment variable
  if (!process.env.WSDOT_ACCESS_TOKEN) {
    console.error(
      "❌ Error: WSDOT_ACCESS_TOKEN environment variable is required"
    );
    process.exit(1);
  }

  const functionName = args[0];
  const paramsString = args[1];

  if (!functionName) {
    console.error("❌ Error: Function name is required");
    process.exit(1);
  }

  let params: Record<string, unknown> = {};
  if (paramsString) {
    try {
      params = JSON.parse(paramsString);
    } catch (error) {
      console.error(`❌ Error: Invalid JSON parameters: ${error}`);
      process.exit(1);
    }
  }

  console.log("🚀 Starting data validation...\n");

  const result = compareEndpoint(functionName, params);

  if (result.success) {
    console.log(
      `\n✅ Validation complete! Found ${result.differences} differences.`
    );
  } else {
    console.log(`\n❌ Validation failed: ${result.error}`);
    process.exit(1);
  }
};

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
