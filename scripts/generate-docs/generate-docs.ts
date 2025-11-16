#!/usr/bin/env node
/**
 * Generate Redoc HTML documentation from OpenAPI specifications
 *
 * This script uses @redocly/cli to generate static HTML documentation
 * from all OpenAPI YAML specifications.
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../..");

const openApiSpecDir = join(projectRoot, "docs", "generated", "openapi");
const outputDir = join(projectRoot, "docs", "api-reference");

/**
 * Generate HTML documentation for a single OpenAPI spec
 */
function generateHtmlForSpec(yamlFile: string): void {
  const apiName = yamlFile.replace(".yaml", "");
  const openApiSpecPath = join(openApiSpecDir, yamlFile);
  const outputPath = join(outputDir, `${apiName}.html`);

  // Check if OpenAPI spec exists
  if (!existsSync(openApiSpecPath)) {
    console.error(
      `✗ Skipping ${apiName}: OpenAPI spec not found at ${openApiSpecPath}`
    );
    return;
  }

  try {
    // Generate HTML using redocly CLI with custom configuration
    execSync(
      `npx @redocly/cli build-docs "${openApiSpecPath}" --output "${outputPath}" --theme.openapi.expandResponses "200" --theme.schema.description "expanded" --theme.schema.maxDisplayedProperties 20 --theme.schema.sectionsOrder "example|properties|description"`,
      {
        stdio: "pipe",
        cwd: projectRoot,
      }
    );

    console.log(`✓ ${apiName}: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error generating HTML for ${apiName}:`, error);
    throw error;
  }
}

/**
 * Main execution
 */
function main() {
  try {
    console.log("Generating Redoc HTML documentation...\n");

    // Check if OpenAPI spec directory exists
    if (!existsSync(openApiSpecDir)) {
      console.error(
        `Error: OpenAPI spec directory not found at ${openApiSpecDir}`
      );
      console.error(
        "Please run 'npm run docs:openapi' first to generate the OpenAPI specifications."
      );
      process.exit(1);
    }

    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      const { mkdirSync } = require("fs");
      mkdirSync(outputDir, { recursive: true });
    }

    // Get all YAML files from the OpenAPI directory
    const yamlFiles = readdirSync(openApiSpecDir).filter((file) =>
      file.endsWith(".yaml")
    );

    if (yamlFiles.length === 0) {
      console.error(`Error: No OpenAPI YAML files found in ${openApiSpecDir}`);
      console.error(
        "Please run 'npm run docs:openapi' first to generate the OpenAPI specifications."
      );
      process.exit(1);
    }

    console.log(`Found ${yamlFiles.length} OpenAPI specification(s)\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const yamlFile of yamlFiles) {
      try {
        generateHtmlForSpec(yamlFile);
        successCount++;
      } catch (error) {
        errorCount++;
        // Continue with other files even if one fails
      }
    }

    console.log(`\n✓ Generated ${successCount} HTML documentation file(s)`);
    if (errorCount > 0) {
      console.error(`✗ Failed to generate ${errorCount} HTML file(s)`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error generating Redoc HTML:", error);
    process.exit(1);
  }
}

main();
