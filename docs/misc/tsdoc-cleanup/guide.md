# TSDoc Comments Cleanup — Working Guide

## Overview

This guide defines how to rewrite TSDoc comments consistently across the repository. It is concise and normative for this project.

> Note: There is no canonical reference at this time. This PRD defines the
> standard going forward; we will establish a canonical example after this
> PRD is applied across the codebase.

## Scope and Sources of Truth

- **Scope**: Replace TSDoc comments only. Do not modify any Zod schemas or implementation logic.
- **Sources of truth**:
  - Primary: Official WSDOT/WSF documentation pages (prefer the “Docs” column)
  - Secondary: ws-dottie CLI output (compiled `dist` CLI)
- **Do not**: run curl/fetch requests, edit schemas, or run builds.

## Terminology

- **Module**: one TypeScript source file (e.g., `src/api/wsf-vessels/vesselLocations.ts`).
- **Endpoint**: one specific REST endpoint invoked via `zodFetch` within the module.
- **Query Options**: exported functions that return TanStack Query v5 `queryOptions` objects.
- **Example response**: raw JSON for a representative item. For array-only endpoints, show an abbreviated array format like: `[ { ...one item... }, ... ]`.

## Assignment and Flow

1. Work only on the API assigned to you.
2. Within that API, complete endpoints in **alphabetical order** by endpoint/function name.
3. When the API is fully completed, **stop and wait** for further instructions. Do not start another API.

## Command Policy

- Use the CLI directly from `dist`:
  - `node dist/cli.mjs <functionName> '<jsonParams>'`
- Do not create scripts or aliases. Do not run builds. Do not execute curl/fetch.

## Required Module Header Structure (order is mandatory)

Place the module header at the very top of the file, before any imports. Use dash `- ` lists for multi-item sections.

Order:
1. `@module`
2. `@description` followed by “Provides:” and “Data includes:” lists
3. `@functions`
4. `@input`
5. `@output`
6. `@baseType`
7. `@cli` (exact CLI commands for each `zodFetch` function, in order)
8. `@exampleResponse` (single, pretty-printed JSON for a representative object; no bullets/labels). Must be fresh and sourced from a recent ws-dottie CLI run (avoid stale timestamps; use current month/year).
9. `@see`

- @input and @output sections MUST include a one-line description for each parameter/field.
  - Keep these one-liners short and sourced from the official Docs pages.
  - For nested objects, list the nested fields under the parent with indentation.

- **@see policy**:
  - WSDOT modules: link to the URL from the "Docs" column in `docs/misc/getting-started-for-agents.md`.
  - WSF modules: link to the URL from the "WSF Specification" column in `docs/misc/getting-started-for-agents.md`.

## Function / Query Options / Schema / Type Comments

- Prefer one-line JSDoc comments for schemas, types, and API functions where possible. Keep multi-line blocks only when necessary for examples/throws.
  - Example one-liners: `/** Vessel locations array schema */`, `/** VesselLocation type */`, `/** Fetches all vessel locations */`
  - Query Options functions: brief one-liners (e.g., “Returns options for ...; polls every 60s”).
- Prefer TypeScript-first IntelliSense:
  - Function params/returns use exported TS types (e.g., `GetXParams`, `XResult`)
  - Keep schemas authoritative; types are inferred from schemas (`z.infer<typeof schema>`) but referenced as TS types in signatures
- Section-level indices: For major sections, include a short list of contained items (as in the existing code banners) to help scanning.

### Documentation vs Schema Verification (mandatory)

- Cross-check official Docs pages against our schema for each parameter and field.
- If you find any mismatch between Docs and our schema or CLI behavior, inform the user in chat immediately and pause work until resolved. Do not change schemas or implementations as part of this project.

### Formatting rules

- Keep schema field definitions single-spaced, one field per line (no blank lines between fields) to improve scanability and avoid double-spacing.

### Function comment essentials

- `@param` entries describe each parameter
- `@returns` describes the result type succinctly
- `@example` shows a minimal TypeScript usage example
- `@throws` lists validation/error conditions (brief)

## Field Commenting Rules (inline in code)

- Place a single-line JSDoc comment directly above each field in both input and output `z.object` schemas.
- Conventions:
  - Short noun phrase; lightly normalize wording from official Docs.
  - Include units/format where helpful (e.g., “Latitude in decimal degrees”).
  - Mark "Optional" or "Nullable" only when applicable.
  - Dates: use “JS Date”.

## Checklist (per module)

- Header present, at top, blocks in required order
- @input and @output include one-line per-field docs (including nested fields)
- `@cli` includes exact commands in zodFetch order
- `@exampleResponse` contains a single pretty-printed JSON object (no bullets/labels)
- Block-style TSDoc comments for every exported function, schema, type, and Query Options function
- Inline one-line JSDoc comments above every input/output schema field
- Official Docs cross-checked; any mismatches reported in chat and work paused

## Example CLI Usage

```bash
# Single item
node dist/cli.mjs getVesselLocationsByVesselId '{"vesselId": 1}'

# Array endpoint
node dist/cli.mjs getVesselLocations
```

### How to capture a fresh @exampleResponse

Use the ws-dottie CLI and pipe to Node to select a single representative object. Paste the resulting JSON directly into the `@exampleResponse` block.

```bash
# Example: capture the first item from getBorderCrossings
node dist/cli.mjs getBorderCrossings \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);console.log(JSON.stringify(Array.isArray(j)?j[0]:j,null,2));})'
```

Notes:
- Ensure the timestamp reflects the current month/year.
- Do not hand-edit field names or shapes; paste as-is from the CLI output.
