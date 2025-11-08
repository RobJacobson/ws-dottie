#!/usr/bin/env node

/**
 * Regenerates the Markdown table of SDK endpoints by inspecting the
 * definitions in `src/apis/<api>/<group>.endpoints.ts`.
 *
 * Usage:
 *   node scripts/generate-endpoints-table.js
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const apisRoot = path.join(projectRoot, "src", "apis");
const outputPath = path.join(
  projectRoot,
  "docs",
  "overview",
  "endpoints-new-table.md"
);

function isDirectory(targetPath) {
  try {
    return fs.statSync(targetPath).isDirectory();
  } catch {
    return false;
  }
}

function walk(dir, predicate) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(fullPath, predicate));
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractEndpointsBlock(fileText) {
  const labelIndex = fileText.indexOf("endpoints");
  if (labelIndex === -1) return null;
  const braceIndex = fileText.indexOf("{", labelIndex);
  if (braceIndex === -1) return null;

  let depth = 0;
  for (let i = braceIndex; i < fileText.length; i += 1) {
    const char = fileText[i];
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return fileText.slice(braceIndex + 1, i);
      }
    }
  }
  return null;
}

function tidy(value) {
  return value.replace(/\s+/g, " ").replace(/ ,/g, ",").trim();
}

function inferHookName(functionName) {
  if (functionName.startsWith("fetch")) {
    const remainder = functionName.slice(5);
    return remainder ? `use${remainder}` : "use";
  }
  return `use${functionName.charAt(0).toUpperCase()}${functionName.slice(1)}`;
}

function collectRows() {
  const apiDirs = fs
    .readdirSync(apisRoot)
    .filter((name) => {
      if (name.startsWith(".")) return false;
      const fullPath = path.join(apisRoot, name);
      return isDirectory(fullPath) && name !== "shared";
    })
    .sort((a, b) => a.localeCompare(b));

  const rows = [];

  for (const apiDir of apiDirs) {
    const apiPath = path.join(apisRoot, apiDir);
    const endpointFiles = walk(apiPath, (p) =>
      p.endsWith(".endpoints.ts")
    ).sort((a, b) => a.localeCompare(b));

    for (const endpointFile of endpointFiles) {
      const fileText = fs.readFileSync(endpointFile, "utf8");
      const endpointsBlock = extractEndpointsBlock(fileText);
      if (!endpointsBlock) continue;

      const groupNameMatch = fileText.match(/name:\s*"([^"]+)"/);
      const groupName = groupNameMatch
        ? groupNameMatch[1]
        : path.basename(endpointFile).replace(".endpoints.ts", "");

      const endpointRegex =
        /(\w+)\s*:\s*{\s*([\s\S]*?)\s*}\s*satisfies\s*EndpointDefinition<([^,>]+),\s*([^>]+)>/g;

      let match = endpointRegex.exec(endpointsBlock);

      while (match) {
        const [, functionName, block, rawInputType, rawOutputType] = match;
        const endpointPathMatch = block.match(/endpoint:\s*"([^"\n]+)"/);
        const inputSchemaMatch = block.match(/inputSchema:\s*([^,\n]+)/);
        const outputSchemaMatch = block.match(/outputSchema:\s*([^,\n]+)/);

        rows.push({
          apiName: apiDir,
          groupName,
          functionName,
          hookName: inferHookName(functionName),
          endpointUrl: endpointPathMatch ? endpointPathMatch[1] : "",
          inputSchema: inputSchemaMatch ? tidy(inputSchemaMatch[1]) : "",
          outputSchema: outputSchemaMatch ? tidy(outputSchemaMatch[1]) : "",
        });

        match = endpointRegex.exec(endpointsBlock);
      }
    }
  }

  return rows.sort((a, b) => {
    return (
      a.apiName.localeCompare(b.apiName) ||
      a.groupName.localeCompare(b.groupName) ||
      a.functionName.localeCompare(b.functionName)
    );
  });
}

function writeMarkdown(rows) {
  const lines = [];
  lines.push("# API Endpoints Overview");
  lines.push("");
  lines.push(
    `This table reflects all current endpoints defined under \`src/apis\` as of ${
      new Date().toISOString().split("T")[0]
    }.`
  );
  lines.push("");
  lines.push(
    "| API Name | Endpoint Group Name | Function Name | Hook Name | Endpoint URL | Input Schema | Output Schema |"
  );
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");

  for (const row of rows) {
    lines.push(
      `| ${row.apiName} | ${row.groupName} | ${row.functionName} | ${row.hookName} | ${row.endpointUrl} | ${row.inputSchema} | ${row.outputSchema} |`
    );
  }

  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  if (!isDirectory(apisRoot)) {
    console.error(`Unable to locate apis directory at ${apisRoot}`);
    process.exitCode = 1;
    return;
  }

  const rows = collectRows();
  writeMarkdown(rows);
  console.log(`Updated table with ${rows.length} rows at ${outputPath}`);
}

main();
