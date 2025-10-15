# API Schema Quality Review - Handoff Note

## Task Overview
This task involves conducting a quality check of schema files for each API and resource. The goal is to identify dead code and shared code between schemas that should be refactored to a /shared folder.

## Original Instructions
- Review each API in alphabetical order: wsdot-border-crossings, wsdot-bridge-clearances, wsdot-commercial-vehicle-restrictions, wsdot-highway-alerts, wsdot-highway-cameras, wsdot-mountain-pass-conditions, wsdot-toll-rates, wsdot-traffic-flow, wsdot-travel-times, wsdot-weather-information, wsdot-weather-readings, wsdot-weather-stations, wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels
- For each API, review each *.input.ts and *.output.ts schema file for dead code
- Determine whether there is any shared code between schemas (like base schemas) that should be refactored to a /shared folder
- Do not consider files under the /original folders as they are beyond the scope
- Summarize findings and await confirmation before proceeding to the next API

## PRD Reference
See the API Migration Process PRD at [`docs/agents/api-migration-process-prd.md`](docs/agents/api-migration-process-prd.md) for detailed specifications on the expected schema structure and migration process.

## Important Notes from PRD
- Do not consider the files under the /original folders (inputSchemas.original.ts and outputSchemas.original.ts) as they are beyond the scope of this quality control project
- Focus on identifying dead code and shared schema opportunities
- Look for schema definitions that are duplicated across multiple files that could be consolidated
- Consider creating shared schemas for common patterns across resources within the same API
- Maintain the existing file structure and naming conventions as specified in the PRD

## Clarifications Provided
- Focus on finding duplicate code rather than detailed analysis
- Do not consider original files in the analysis
- After analyzing each API, pause and wait for user confirmation before proceeding to the next API
- Do not continue automatically to the next API without explicit approval

## Current Status
The new agent should start from the beginning with the first API in the list: wsdot-border-crossings

## Instructions for New Agent
1. Start with the first API in the list: wsdot-border-crossings
2. Review all schema files (*.input.ts and *.output.ts) for that API
3. Look for dead code and duplicate schemas across resources within the same API
4. Determine if any schemas should be refactored to a shared folder
5. Report findings
6. Wait for explicit confirmation before proceeding to the next API
7. Continue through all APIs in the specified alphabetical order
8. Do not automatically continue to subsequent APIs without confirmation
9. Focus on identifying duplicate code rather than detailed analysis
10. Remember to pause and wait for user input after each API analysis