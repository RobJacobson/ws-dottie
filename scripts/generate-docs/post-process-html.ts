#!/usr/bin/env node

/**
 * Post-process generated HTML documentation to enhance tag documentation
 *
 * This script reads generated HTML files from Redoc and injects
 * custom CSS and JavaScript to enhance the display of tag documentation
 * with use cases, cache strategies, and update frequencies.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Main function to post-process HTML file
 */
function main() {
  // Get HTML file path from command line arguments
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Error: Please provide the path to the HTML file to process");
    process.exit(1);
  }

  const htmlFilePath = args[0];

  try {
    // Read the HTML file
    let htmlContent = readFileSync(htmlFilePath, "utf-8");

    // Check if this is a Redoc-generated HTML file
    if (!htmlContent.includes("redoc")) {
      console.error(
        "Error: This doesn't appear to be a Redoc-generated HTML file"
      );
      process.exit(1);
    }

    // Inject custom CSS styles
    const customCSS = `
      <style>
        /* Custom styles for enhanced tag documentation */
        .tag-description {
          background-color: #f8f9fa;
          border-left: 4px solid #3f51b5;
          padding: 16px;
          margin: 16px 0;
          border-radius: 4px;
        }
        
        .tag-use-cases {
          margin-top: 12px;
        }
        
        .tag-use-cases h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #3f51b5;
        }
        
        .tag-use-cases ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .tag-use-cases li {
          margin-bottom: 6px;
          font-size: 14px;
        }
        
        .tag-meta {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          font-size: 12px;
          color: #666;
        }
        
        .tag-meta-item {
          display: flex;
          align-items: center;
        }
        
        .tag-meta-label {
          font-weight: 600;
          margin-right: 4px;
        }
        
        .cache-strategy {
          background-color: #e3f2fd;
          color: #0d47a1;
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .update-frequency {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
      </style>
    `;

    // Inject CSS into HTML head
    htmlContent = htmlContent.replace(/<\/head>/, `${customCSS}\n  </head>`);

    // Inject custom JavaScript to enhance tag descriptions
    const customJS = `
      <script>
        // Custom script to enhance tag documentation display
        window.addEventListener('DOMContentLoaded', () => {
          // Wait for Redoc to fully load
          setTimeout(() => {
            enhanceTagDescriptions();
          }, 2000);
        });
        
        function enhanceTagDescriptions() {
          // Debug: Log the available global variables
          console.log('Available global variables:', Object.keys(window));
          
          // Try to access the OpenAPI spec from __redoc_state
          if (typeof __redoc_state !== 'undefined') {
            console.log('Found __redoc_state:', __redoc_state);
            
            // Extract the tags from the spec
            const tags = __redoc_state.spec.data.tags;
            console.log('Tags from spec:', tags);
            
            // Create a map of tag names to metadata for easy lookup
            const tagMetadataMap = {};
            if (tags && Array.isArray(tags)) {
              tags.forEach(tag => {
                tagMetadataMap[tag.name] = {
                  description: tag.description,
                  xDescription: tag['x-description'],
                  cacheStrategy: tag['x-cacheStrategy'],
                  useCases: tag['x-useCases'],
                  updateFrequency: tag['x-updateFrequency']
                };
              });
            }
            
            console.log('Tag metadata map:', tagMetadataMap);
            
            // Find all tag elements in DOM
            const tagElements = document.querySelectorAll('[id^="tag/"]');
            console.log('Found tag elements:', tagElements.length);
            
            tagElements.forEach(tagElement => {
              // Extract tag name from the ID (remove "tag/" prefix)
              const tagId = tagElement.id;
              const tagName = tagId.replace('tag/', '');
              
              console.log('Processing tag:', tagName);
              
              if (!tagName || !tagMetadataMap[tagName]) {
                console.log('No metadata found for tag:', tagName);
                return;
              }
              
              const metadata = tagMetadataMap[tagName];
              console.log('Metadata for tag:', tagName, metadata);
              
              // Generate enhanced description with actual metadata
              let enhancedDescription = '<div class="tag-description">';
              
              // Add extended description if available
              if (metadata.xDescription) {
                enhancedDescription += '<p>' + metadata.xDescription + '</p>';
              } else if (metadata.description) {
                enhancedDescription += '<p>' + metadata.description + '</p>';
              }
              
              // Add use cases if available
              if (metadata.useCases && Array.isArray(metadata.useCases) && metadata.useCases.length > 0) {
                enhancedDescription += '<div class="tag-use-cases">' +
                  '<h4>Use Cases:</h4>' +
                  '<ul>';
                
                metadata.useCases.forEach(useCase => {
                  enhancedDescription += '<li>' + useCase + '</li>';
                });
                
                enhancedDescription += '</ul></div>';
              }
              
              // Add metadata badges
              enhancedDescription += '<div class="tag-meta">';
              
              // Add cache strategy if available
              if (metadata.cacheStrategy) {
                enhancedDescription += '<div class="tag-meta-item">' +
                  '<span class="tag-meta-label">Cache:</span>' +
                  '<span class="cache-strategy">' + metadata.cacheStrategy + '</span>' +
                  '</div>';
              }
              
              // Add update frequency if available
              if (metadata.updateFrequency) {
                enhancedDescription += '<div class="tag-meta-item">' +
                  '<span class="tag-meta-label">Updates:</span>' +
                  '<span class="update-frequency">' + metadata.updateFrequency + '</span>' +
                  '</div>';
              }
              
              enhancedDescription += '</div></div>';
              
              // Find description element within tag section
              // The description is in a div with classes including "redoc-markdown"
              const descriptionElement = tagElement.querySelector('div[class*="redoc-markdown"]');
              if (descriptionElement) {
                descriptionElement.innerHTML = enhancedDescription;
                console.log('Enhanced description for tag:', tagName);
              } else {
                console.log('Could not find description element for tag:', tagName);
              }
            });
          } else {
            console.error('__redoc_state not found');
          }
        }
      </script>
    `;

    // Inject JavaScript before the closing body tag
    htmlContent = htmlContent.replace(/<\/body>/, `${customJS}\n</body>`);

    // Write the modified HTML back to the file
    writeFileSync(htmlFilePath, htmlContent, "utf-8");

    console.log(`Successfully enhanced ${htmlFilePath}`);
  } catch (error) {
    console.error(`Error processing HTML file ${htmlFilePath}:`, error);
    process.exit(1);
  }
}

main();
