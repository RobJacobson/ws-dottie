# TSDoc Comments Cleanup — Working Guide

## Overview

This guide defines how to rewrite TSDoc comments consistently across the repository. It is concise and normative for this project.

> Canonical examples:
> - WSF: `src/api/wsf-vessels/vesselLocations.ts`
> - WSDOT: `src/api/wsdot-border-crossings/borderCrossings.ts`

## Scope and Sources of Truth

- **Scope**: Replace TSDoc comments only. Do not modify any Zod schemas or implementation logic.
- **Sources of truth**: Use both of the following:
  - ws-dottie CLI output (compiled `dist` CLI)
  - Official WSDOT/WSF documentation pages
- **Do not**: run curl/fetch requests, edit schemas, or run builds.

## Terminology

- **Module**: one TypeScript source file (e.g., `src/api/wsf-vessels/vesselLocations.ts`).
- **Endpoint**: one specific REST endpoint invoked via `zodFetch` within the module.
- **Hook**: the hook factory function(s) at the end of a module that create and wrap a `useQuery` hook.
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
8. `@exampleResponse` (single, pretty-printed JSON for a representative object; no bullets/labels)
9. `@see`

- **@see policy**:
  - WSDOT modules: link to the URL from the "Docs" column in `docs/getting-started-for-agents.md`.
  - WSF modules: link to the URL from the "WSF Specification" column in `docs/getting-started-for-agents.md`.

## Function / Hook / Schema / Type Comments

- Use block-style TSDoc (multi-line `/** ... */`) for:
  - Each exported function (params, returns, example, throws)
  - Each exported schema
  - Each exported type alias
  - Each hook factory
- Prefer TypeScript-first IntelliSense:
  - Function params/returns use exported TS types (e.g., `GetXParams`, `XResult`)
  - Keep schemas authoritative; types are inferred from schemas (`z.infer<typeof schema>`) but referenced as TS types in signatures
- Section-level indices: For major sections, include a short list of contained items (as in the existing code banners) to help scanning.

### Documentation vs Schema Verification (mandatory)

- Cross-check official docs against our schema for each parameter and field.
- If docs specify a parameter as optional/nullable (e.g., `Route` for bridge clearances), ensure the input schema reflects that (`.optional()` and/or `.nullable()` as appropriate).
- If a mismatch is found and you are not authorized to edit schemas, file a discrepancy report and notify the maintainer.
- Reference: WSDOT Commercial Vehicle docs for clearances indicate `Route` is optional/nullable ([source](https://wsdot.wa.gov/traffic/api/Documentation/group___commercial_vehicle.html#gaf5657e1b96d282406991305986957a6a)).

### Formatting rules

- Keep schema field definitions single-spaced, one field per line (no blank lines between fields) to improve scanability and avoid double-spacing.

### Function comment essentials

- `@param` entries describe each parameter
- `@returns` describes the result type succinctly
- `@example` shows a minimal TypeScript usage example
- `@throws` lists validation/error conditions (brief)

## Discrepancy Handling

- If CLI output differs from official documentation fields/descriptions, do not change code/schemas.
- File a report at `docs/misc/tsdoc-cleanup/discrepancies/<api>/<endpoint>.md` using the provided template.

## Checklist (per module)

- Header present, at top, blocks in required order
- `@cli` includes exact commands in zodFetch order
- `@exampleResponse` contains a single pretty-printed JSON object (no bullets/labels)
- Block-style TSDoc comments for every exported function, schema, type, and hook factory
- Section-level indices present for major code sections
- Official docs cross-checked against schema (optional/nullable parameters verified)
- Discrepancies documented if any

## Example CLI Usage

```bash
# Single item
node dist/cli.mjs getVesselLocationsByVesselId '{"vesselId": 1}'

# Array endpoint
node dist/cli.mjs getVesselLocations
```
