# API Migration Process PRD

## Overview
This document outlines the standardized process for migrating API schemas from the original format to a resource-specific schema architecture. This process ensures consistent, maintainable, and scalable API implementations across the codebase.

## Objective
To establish a clear, repeatable process for migrating API endpoints to use resource-specific input and output schema files, replacing the original monolithic schema structure with a more modular and maintainable approach.

## Success Criteria
- All API endpoints use resource-specific schema files
- TypeScript compilation passes without errors
- All existing functionality remains intact
- Schema files follow the established naming convention
- Import statements correctly reference new schema locations

## Process Steps

### Step 1: Analysis
- Examine the API directory structure to identify all resource files that need migration
- Review the original input and output schema files to understand the schema definitions
- Identify which schemas are used by each resource file
- Document the current import structure and endpoint definitions

### Step 2: Schema Extraction
- Create a subdirectory for each resource within the API directory:
  - `[resourceName]/` - Contains the resource file and its associated schemas
- Within each resource subdirectory, create the following files:
  - `[resourceName].ts` - The main resource file (may already exist)
  - `[resourceName].input.ts` - Contains all input schema definitions for the resource
  - `[resourceName].output.ts` - Contains all output schema definitions for the resource
- Copy the relevant schema definitions from the original files to the new resource-specific files
- Preserve all Zod schema configurations, descriptions, and TypeScript types

### Step 3: Import Updates
- Update each resource file to import from the new schema files instead of the original files
- Change import statements from:
  - `./original/inputSchemas.original` to `./schemas/[resourceName].input`
  - `./original/outputSchemas.original` to `./schemas/[resourceName].output`
- Ensure all schema references continue to work correctly after the import changes

### Step 4: Shared Schema Handling
- Identify any schema definitions that are used across multiple resource files within the same API
- Create a `shared` directory within the API directory if it doesn't exist
- Move shared schema definitions to the `shared` directory in appropriate files
- Update import statements in resource files to reference shared schemas when needed

### Step 5: Validation
- Run TypeScript compilation (`npx tsc --noEmit --project .`) to verify all imports and references are correct
- Check that all schema definitions are properly accessible in their new locations
- Verify that endpoint definitions still function as expected
- Confirm no breaking changes to existing API contracts

### Step 6: Quality Assurance
- Verify that the new resource subdirectories follow the established structure
- Ensure each resource has its own dedicated input and output schema files within its subdirectory
- Confirm that shared schema definitions are properly located in the shared directory
- Validate that all import paths are correctly updated to reflect the new structure
- Ensure that schema definitions are properly exported and accessible
- Validate that the migration maintains backward compatibility

## Key Requirements

### Directory Structure
- Each resource should have its own subdirectory: `[apiName]/[resourceName]/`
- Within each resource subdirectory:
  - `[resourceName].ts` - The main resource file
  - `[resourceName].input.ts` - Contains all input schema definitions for the resource
  - `[resourceName].output.ts` - Contains all output schema definitions for the resource
- Shared schemas across resources should be in: `[apiName]/shared/`
- Original schema files should be in: `[apiName]/original/`

### Naming Convention
- Resource subdirectories: `[resourceName]/`
- Main resource files: `[resourceName].ts`
- Input schema files: `[resourceName].input.ts`
- Output schema files: `[resourceName].output.ts`
- Schema definitions should maintain their original names and functionality

### Directory Structure
- All schema files must be placed in the `schemas` subdirectory within the API directory
- Each resource should have its own pair of input/output schema files
- Do not create API-level schema files (avoid consolidating multiple resources into single files)

### Import Pattern
- For resource-specific schemas, use the pattern `import * as i from "./[resourceName].input"` for input schemas
- For resource-specific schemas, use the pattern `import * as o from "./[resourceName].output"` for output schemas
- For shared schemas, use the pattern `import { schemaName } from "../shared/[sharedSchemaFile]"`
- Maintain consistency with the existing codebase patterns

## Quality Gates
- TypeScript compilation must pass without errors
- All endpoint definitions must continue to work as expected
- Schema integrity must be preserved (no changes to schema validation logic)
- No breaking changes to existing API contracts
- All imports must resolve correctly
- Directory structure must follow the new resource-subdirectory pattern
- Shared schemas must be properly identified and moved to the shared directory

## Error Prevention
- Before deleting old schema files, ensure all resource files have been updated to use the new schema locations
- Verify that each resource has its own dedicated schema files when multiple resources exist in an API
- Test TypeScript compilation after each major change to catch issues early
- Ensure all schema definitions are properly exported from their new locations