# GitHub Release Notes

Use this document as the single source of truth when drafting GitHub releases. Each entry follows the same structure so past and future releases stay consistent.

---

## v1.2.0 — 2025-11-08

### 🚀 Features
- Cache flush date helpers moved into a shared factory so every API ships consistent `fetchCacheFlushDate*` utilities
- Fetch function factory rebuilt to emit strongly typed functions that accept the new `FetchFunctionParams` object across the entire surface

### 🛠 Improvements
- Standardized schema imports, endpoint names, and factory wiring for all APIs
- Refactored every TanStack `useQuery` hook to accept the unified `FetchFunctionParams` signature (`params`, `fetchMode`, `validate`)
- Updated TanStack Query hooks and docs to align with the new fetch signature

### 🐛 Fixes
- Corrected per-API `exports` mappings so consumers resolve binaries from `dist/apis/...` without custom path aliases

### 📚 Documentation
- Regenerated the endpoint catalog with cache flush endpoints and refreshed tables

### 🧱 Build & Chore
- Added a `typesVersions` map for IDE compatibility on older TypeScript releases
- Updated bundler entry paths to track the reorganized API definitions

### ✅ Upgrade Notes
- No breaking changes. Consumers only need to bump to `ws-dottie@1.2.0`.

---

## v1.1.0 — 2025-11-08

### 🚀 Features
- Introduced the initial endpoint factory workflow for generating typed fetch helpers and TanStack hooks
- Added API-specific bundles (`index`, `core`, `schemas`) to enable tree-shakable imports
- Enabled schema opt-in so endpoints can omit validation while preserving type safety defaults

### 🛠 Improvements
- Expanded shared type helpers, renamed endpoint functions, and standardized schema naming
- Aligned package exports and descriptions around the new factory-based architecture
- Streamlined shared fetching utilities and endpoint creation scripts

### 📚 Documentation
- Added generated sample datasets and refreshed README guidance with new endpoint naming
- Expanded documentation to highlight the factory approach and updated import examples

### 🧱 Build & Chore
- Introduced release tooling, including the endpoint summary script and expanded build config

### ✅ Upgrade Notes
- No breaking changes. Review the README for the new import surface.

---

## v1.0.0 — 2025-11-05

### 🚀 Features
- Launched the TanStack Query hooks factory covering every WS-Dottie endpoint
- Added automated OpenAPI generation with interactive Redoc documentation
- Delivered comprehensive testing including E2E orchestration and sample data management
- Introduced robust JSON parsing utilities and MCP integrations

### 🛠 Improvements
- Migrated to the endpoint group architecture with enhanced documentation interface
- Upgraded CLI ergonomics with colorized output, improved date handling, and limiting controls
- Added dedicated test configuration and enhanced path resolution

### 📚 Documentation
- Published complete API documentation with interactive HTML examples and implementation guides

### ✅ Upgrade Notes
- First stable release of `ws-dottie`.

---

## v0.9.0 — 2025-10-19

### 🚀 Features
- Enhanced URL parameter validation to catch malformed requests before they reach upstream APIs
- Expanded CLI capabilities with colorized output, date handling, and result limiting
- Added rich endpoint descriptions to improve discoverability for MCP tools
- Introduced a fully automated E2E testing architecture with comprehensive suites

### 🛠 Improvements
- Refined weather API schemas (nullable → optional) and standardized date formats
- Simplified URL builders by splitting parameter logic into focused helpers
- Restructured APIs into resource-based modules with consistent endpoint naming

### 🐛 Fixes
- Migrated all WSDOT endpoints from HTTP to HTTPS for improved security

### ✅ Upgrade Notes
- Pure feature release; no breaking changes. Install `ws-dottie@0.9.0` to pick up CLI and schema improvements.

---

## v0.8.1 — 2025-10-09

### 🛠 Improvements
- Enabled code splitting in the build pipeline to shrink the main bundle and improve tree-shaking

### 🧱 Build & Chore
- Tuned `tsup` configuration for smaller, more focused output chunks

### ✅ Upgrade Notes
- Drop-in patch release focused on bundle size; upgrade if you want leaner builds.

---

## v0.8.0 — 2025-10-07

### 🚀 Features
- Major README refresh emphasizing production-readiness and TanStack Query usage
- Delivered an end-to-end `fetch-dottie` CLI with comprehensive transport and formatting options

### 🛠 Improvements
- Overhauled API architecture to a unified endpoint model covering 90+ endpoints across 16 APIs
- Refactored fetching internals for better error handling and modularity
- Expanded automated E2E validation to cover the full endpoint catalog

### ⚠️ Breaking Changes
- Standardized API import paths to match the new endpoint-based architecture; update imports when upgrading.

---

## v0.7.0 — 2025-09-30

### 🛠 Improvements
- Rebuilt fetching to use Zod validation end-to-end with strict schema enforcement
- Transitioned to a one-file-per-endpoint layout for maintainability
- Enriched Zod metadata (descriptions, supplemental info) for better documentation and DX
- Standardized API import patterns, caching strategies, and query option types across modules

### 📚 Documentation
- Added “Returns” and “Update Frequency” sections throughout API docs
- Introduced a documentation index and context7 integration config
- Updated README to highlight new features and workflows

### 🧱 Build & Chore
- Corrected type export paths, nullable handling, and cleaned repository artifacts
- Updated `.gitignore` and removed outdated internal planning docs

### ✅ Upgrade Notes
- Focused on refactoring and documentation improvements; no breaking API changes.

---

## v0.5.0 — 2025-08-11

### 🚀 Features
- Delivered expanded vessel history fetching (single, multiple, fleet-wide)
- Added comprehensive date range support for vessel history endpoints

### 🛠 Improvements
- Strengthened type definitions and query hook safety across the codebase

### 📚 Documentation
- Refreshed API references with clearer caching strategies and examples
- Updated vessel documentation and highlighted automatic type inference

### 🧱 Build & Chore
- Polished dual ESM/CJS packaging and cleaned build artifacts
- Removed the legacy example app to slim the published package

### ✅ Upgrade Notes
- No breaking changes; upgrade to leverage richer vessel history tooling.

---

## v0.3.0 — 2025-07-26

### 🚀 Features
- Added extensive vessel history utilities (single, multiple, fleet-wide scenarios)

### 🛠 Improvements
- Introduced explicit query option types and standardized module imports
- Unified fetch function naming across APIs and optimized caching for vessel data

### 📚 Documentation
- Documented new vessel history features, module formats, and configuration guidance

### 🧱 Build & Chore
- Finalized dual-module packaging (ESM/CJS) and associated tooling

### ✅ Upgrade Notes
- Safe upgrade for better vessel tooling and documentation coverage.

---

## v0.2.x — 2025-07-25 to 2025-07-26

### 🛠 Improvements
- Unified fetch naming, query options, and caching cadences (daily/hourly) across APIs
- Simplified API key management and switched base URLs to relative paths
- Reorganized shared fetching and configuration modules for clarity

### 📚 Documentation
- Expanded README guidance with validation examples and configuration walkthroughs
- Added comprehensive API reference updates and caching scenarios

### 🧱 Build & Chore
- Updated package config for ESM compatibility, added `.npmignore`, and strengthened E2E validation

### 🐛 Fixes
- Hardened vessel validation tests and corrected import paths for config and toll types

### ✅ Upgrade Notes
- Targets developer experience and reliability; upgrade for smoother configuration and docs.

---

## v0.1.x — 2025-07-22

### 🚀 Features
- Initial npm release covering WSDOT and WSF APIs (highway alerts, traffic, weather, terminals, vessels, schedules, fares, and more)
- Included CLI, shared utilities, and configuration management primitives

### 🛠 Improvements
- Added unit/E2E validation tests, JSONP compatibility checks, and date parsing helpers

### 📚 Documentation
- Published the first API docs, configuration guides, and integration examples

### ✅ Upgrade Notes
- First public availability of `ws-dottie`; install for the complete baseline feature set.

---

## Initial Work — 2025-07-10 to 2025-07-21

### 🚀 Features
- Bootstrapped the project with coverage for all major WSDOT and WSF APIs
- Established end-to-end validation, hook testing, and browser compatibility

### 📚 Documentation
- Authored foundational docs for configuration, usage, and best practices

### ✅ Notes
- Pre-release groundwork that set the stage for `0.1.x` and beyond.


