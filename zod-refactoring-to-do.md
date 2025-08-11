### Zod refactoring TODO

#### How we got here (current state)
- Runtime path: API URL compose (`createFetchFactory`) → platform fetch (`createApiClient` using JSONP in web, native fetch on server) → JSON.parse with `parseWsdotJson` reviver → return typed data via TypeScript interfaces.
- Runtime transformations in `parseWsdotJson`:
  - Converts WSDOT `/Date(…)/` to `Date` and selected WSF date fields to `Date`.
  - Filters a few unreliable VesselWatch fields.
  - Preserves PascalCase keys.
- Validation today: Zod schemas live only in tests under `tests/e2e/validation/**`. Runtime does not validate shapes.
- Types: hand-written `types.ts` per API under `src/api/**` are the public types.
- Docs: API docs exist in `docs/apis/**`; API-REFERENCE and GETTING-STARTED mention transforms and behavior.

#### Goals and principles
- Adopt Zod Mini at runtime as the single source of truth for API response and parameter shapes.
- Keep responses pass-through by default: accept unknown/upstream-added fields via `.passthrough()`; do not strip undocumented fields.
- Date handling remains; consolidate date conversion into Zod preprocessors/helpers to reduce custom parsing code.
- Parameter objects must be validated before URL interpolation.
- Make response validation optional and non-breaking (config-driven: off/warn/throw). Default to off in production, warn in development.
- Maintain current folder-per-API organization with per-API `schemas.ts`; derive public types from schemas via `z.infer` to remove duplication with `types.ts`.
- Prefer small, composable helpers; keep transforms minimal; no business logic in schemas.

#### Decision: Zod Mini first, upgrade path to full Zod 4
- Start with Zod Mini to minimize client bundle impact while covering object/array/primitive/nullable/date needs.
- If a concrete need for advanced features emerges (e.g., upgraded discriminated unions, `.overwrite()`, custom error APIs), switching to full Zod 4 will be straightforward.

#### Shared fetching refactor proposal (minimize custom code)
Two viable paths; recommended is A with incremental rollout:

- A) Move transforms into Zod helpers (recommended)
  - Replace `parseWsdotJson` reviver with plain `JSON.parse` and apply per-API Zod schemas that include lightweight preprocessors for known date fields.
  - Provide shared helpers in `src/shared/validation/`:
    - `zWsdotDate()` → preprocess `/Date(…)/` strings to `Date | null`.
    - `zWsdotNullableDate()` → nullable variant.
    - `zWsFDate()` / `zWsFDateTime()` → preprocess WSF `MM/DD/YYYY` and `MM/DD/YYYY hh:mm:ss AM/PM`.
    - `zPassthroughObject(shape)` → `.passthrough()` wrapper.
  - Continue filtering WSF VesselWatch fields (known unreliable/undocumented) behind a config flag (default: on) to reduce payload noise.
  - Pros: eliminates reviver and most custom parsing; schemas become the sole source of truth. Cons: schemas include some preprocess logic; mitigated by shared helpers.

- B) Keep reviver, add Zod validation only
  - Keep `parseWsdotJson` date conversion; Zod schemas omit preprocessors and only assert structure.
  - Pros: simpler schemas; less change. Cons: custom reviver remains and duplicates concern with schemas. Not chosen given “eliminate custom code” goal.

Incremental plan: start with A for the first API; if complexity is acceptable, proceed. If not, fall back to B temporarily for specific APIs.

#### Global implementation plan
1) Dependencies
   - Add Zod Mini: `npm i zod@^4` and import from `zod/mini` where possible.
   - Ensure bundler/tsconfig are compatible (no code changes expected).

2) Shared validation helpers (new)
   - Create `src/shared/validation/`:
     - `date.ts`: `zWsdotDate`, `zWsdotNullableDate`, `zWsFDate`, `zWsFDateTime` (preprocessors to `Date | null`).
     - `primitives.ts`: common `nullableString`, `nullableNumber`, `nullableBoolean`.
     - `index.ts`: re-export helpers.

3) Config: response validation mode and VesselWatch filtering (optional, non-breaking)
   - Extend `configManager` with:
     - `getValidationMode() | setValidationMode(mode: 'off' | 'warn' | 'throw')`.
     - `getFilterVesselWatch() | setFilterVesselWatch(enabled: boolean)`; default `true`.
   - Defaults: validation `off` in production, `warn` in development; VesselWatch filtering `true`.
   - API layer will branch on these for response validation and conditional field filtering in WSF vessels endpoints.

4) Update `createApiClient`
   - Remove reliance on `parseWsdotJson`; return raw JSON string from strategy, then `JSON.parse` without a reviver.
   - Error handling unchanged (wrap with `createApiError`).

5) Update `createFetchFactory`
   - Keep URL construction and parameter interpolation intact.
   - Remove response generic type; all fetchers return `Promise<unknown>`.
   - Optionally support parameter schema validation per API before interpolation.

6) Implement configurable VesselWatch field filtering
   - Remove VesselWatch filtering from `parseWsdotJson` and reimplement it as an explicit post-parse step applied only in WSF vessels endpoints, controlled by `configManager.getFilterVesselWatch()`.

7) Type exports
   - Replace `types.ts` content per API with `export type … = z.infer<typeof …Schema>` imported from new `schemas.ts`.
   - Re-export public types unchanged at package root for consumers.

8) Tests
   - Reuse runtime schemas in e2e tests; delete test-only duplicate schemas over time.
   - Keep existing test coverage and commands; ensure CI remains green.

#### Per-API migration checklist (alphabetical)
For each API under `src/api/**`, perform the following steps in order, then stop for review after each API is completed and tests are green.

1) Review external source of truth
   - Read latest WSDOT/WSF docs for the API and confirm endpoints, required/nullable fields, and date fields.

2) Review our docs
   - Skim `docs/apis/<api>.md` and update only if any public behavior changed (should be minimal).

3) Implement schemas
   - Add `schemas.ts` in the API folder.
   - Define per-endpoint response schemas using shared helpers; all objects `.passthrough()`.
   - Define parameter object schemas as needed; validate before URL interpolation.
   - Export `export type … = z.infer<typeof …Schema>`.

4) Wire runtime validation
   - In `api.ts` functions, after fetching (as unknown) and `JSON.parse` if needed, validate:
     - Always validate parameters.
     - Conditionally validate responses based on validation mode: off (return raw parsed), warn (log issues, return parsed), throw (throw validation error wrapped in `createApiError`).
   - Fetch via `createFetch(...): Promise<unknown>`, then validate with per-endpoint Zod schema and return strongly typed data.

5) Update types
   - Replace imports from `./types` with types inferred from `./schemas`.

6) Tests
   - Run existing e2e tests for this API (native and JSONP as applicable) and fix schema if needed.

7) Docs
   - If any public-facing behavior changed (unlikely), adjust `docs/apis/<api>.md` minimally.

8) Review checkpoint
   - Commit and pause for maintainer review before moving to the next API.

#### Alphabetical API order
1. `wsdot-border-crossings`
2. `wsdot-bridge-clearances`
3. `wsdot-commercial-vehicle-restrictions`
4. `wsdot-highway-alerts`
5. `wsdot-highway-cameras`
6. `wsdot-mountain-pass-conditions`
7. `wsdot-toll-rates`
8. `wsdot-traffic-flow`
9. `wsdot-travel-times`
10. `wsdot-weather-information`
11. `wsdot-weather-information-extended`
12. `wsdot-weather-stations`
13. `wsf-fares`
14. `wsf-schedule`
15. `wsf-terminals`
16. `wsf-vessels`

We will implement the first one (`wsdot-border-crossings`) as a pilot, then pause for review.

#### Definition of done (per API)
- New `schemas.ts` with `.passthrough()` objects and shared date helpers; parameter schemas where applicable.
- `types.ts` replaced by `z.infer`-derived exports from `schemas.ts` (or re-exported types via `index.ts`).
 - `api.ts` fetches as unknown, validates with Zod, and returns strongly typed data; parameters validated before interpolation when applicable.
- E2E validation tests passing (native and JSONP where applicable).
- Docs audited; only minimal changes if needed.

#### Risks and mitigations
- Upstream shape drift: Use `.passthrough()` and nullable fields conservatively; prefer warn mode initially.
- Bundle size concerns: Using Zod Mini reduces impact; revisit if metrics suggest regressions.
- Duplicated date logic: Centralize with shared Zod helpers; remove reviver.
- Browser behavior: Keep JSONP strategy; no changes to transport layer behavior.

#### Rollback plan
- Validation mode can be set to `off` globally to bypass runtime validation without reverting code.
- If needed, revert to reviver-based date parsing by restoring `parseWsdotJson` and removing preprocessors (changes are contained).

#### Next actions
- Implement shared validation helpers in `src/shared/validation/**` and config flag in `configManager`.
- Pilot: migrate `wsdot-border-crossings` end-to-end following the checklist; run tests; pause for review.

#### Reference
- Zod 4 release notes and guidance: `https://zod.dev/v4`

#### Incorporations from prior plan (sanity check)
- Keep co-location of schemas with each API and derive types via `z.infer`.
- Add explicit quality gates and success metrics (below) and maintain rollback per-API.
- Use shared date helpers rather than bespoke per-API code.
- Note: the earlier plan used a `.pipe(...)` pattern on fetch results; our `createFetchFactory` returns a `Promise<T>`, so validation will be applied explicitly after `await`, not via `.pipe`.

#### Quality gates
- All existing E2E tests pass (native and JSONP where applicable) before moving to the next API.
- No material increase in bundle size beyond agreed threshold; monitor after pilot.
- No change to public API shapes exported by the package (types transition to `z.infer` transparently).
- Validation mode default remains non-breaking (off in prod, warn in dev).

#### Success metrics
- Pilot API migrated with zero breaking changes and green tests.
- Bundle-size delta acceptable (target: minimal/no increase using Zod Mini).
- Reduced custom parsing code (removal of reviver; VesselWatch filtering moved to a small, configurable post-parse utility limited to WSF vessels endpoints).
- Developer ergonomics improved (single schema source, fewer duplicate types).


