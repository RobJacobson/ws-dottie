#!/usr/bin/env node

/**
 * Script to remove all existing JSDoc/TSDoc comments from API files
 * This makes the comment cleanup process more efficient by removing old comments first
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Patterns to match JSDoc/TSDoc comments
const commentPatterns = [
  // Multi-line JSDoc/TSDoc comments starting with /** and ending with */
  /\/\*\*[\s\S]*?\*\//g,
  // Single-line JSDoc/TSDoc comments starting with /**
  /\/\*\*.*?\*\//g,
  // Single-line JSDoc/TSDoc comments starting with /// (less common)
  /\/\/\/.*$/gm,
];

// Function to remove comments from a file
function removeComments(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let originalContent = content;
    let commentCount = 0;

    // Apply each comment pattern
    commentPatterns.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        commentCount += matches.length;
      }
      content = content.replace(pattern, "");
    });

    // Clean up any resulting empty lines or excessive whitespace
    content = content
      .replace(/\n\s*\n\s*\n/g, "\n\n") // Remove excessive empty lines
      .replace(/^\s*\n/, "") // Remove leading empty line
      .replace(/\n\s*$/, "\n"); // Ensure single newline at end

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ ${filePath}: Removed ${commentCount} comments`);
      return true;
    } else {
      console.log(`⏭️  ${filePath}: No comments found`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log("🧹 Nuking JSDoc/TSDoc comments from API files...\n");

  // Find all TypeScript files under src/api
  const apiFiles = glob.sync("src/api/**/*.ts", {
    ignore: ["**/*.d.ts", "**/node_modules/**"],
  });

  if (apiFiles.length === 0) {
    console.log("No API files found under src/api/");
    return;
  }

  console.log(`Found ${apiFiles.length} API files to process:\n`);

  let processedCount = 0;
  let modifiedCount = 0;

  apiFiles.forEach((filePath) => {
    processedCount++;
    if (removeComments(filePath)) {
      modifiedCount++;
    }
  });

  console.log(`\n🎯 Summary:`);
  console.log(`   Files processed: ${processedCount}`);
  console.log(`   Files modified: ${modifiedCount}`);
  console.log(`   Files unchanged: ${processedCount - modifiedCount}`);

  if (modifiedCount > 0) {
    console.log(
      `\n✨ Successfully removed comments from ${modifiedCount} files!`
    );
    console.log(
      `   You can now run the comment cleanup process to add new structured comments.`
    );
  } else {
    console.log(`\nℹ️  No files were modified. All files may already be clean.`);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { removeComments, commentPatterns };
