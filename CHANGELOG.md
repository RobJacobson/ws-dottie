# Changelog

All notable changes to this project will be documented in this file.

- Format: Keep entries concise and high‑signal. Group by type: Features, Improvements, Fixes, Docs, Build/Chore.
- Dates are in YYYY‑MM‑DD.

## [0.9.0] - 2025-10-19

- Features
  - **Enhanced URL Parameter Validation**: Added comprehensive parameter validation to URL building functions for improved reliability
  - **CLI Enhancements**: Added colorized output, date handling and limit functionality for CLI results
  - **API Endpoint Descriptions**: Added descriptions to API endpoints for MCP tool discovery, enhancing AI agent integration
  - **New E2E Testing Architecture**: Implemented hierarchical test orchestration system with comprehensive API test suites

- Improvements
  - **API Schema Refinements**: Changed Zod schema fields from nullable to optional in weather APIs and updated date input format
  - **URL Building Logic**: Simplified URL building logic by splitting into focused functions and separating parameter handling
  - **Resource-Based Architecture**: Restructured API modules into resource-based format with standardized endpoint names

- Fixes
  - **HTTPS Migration**: Updated WSDOT API endpoints from HTTP to HTTPS for improved security

## [0.8.1] - 2025-10-09

- Improvements
  - **Bundle Size Optimization**: Enabled code-splitting in build configuration to reduce initial bundle size and improve tree-shaking

## [0.8.0] - 2025-10-07

- Features
  - **CLI Tool Enhancement**: Added comprehensive `fetch-dottie` command-line tool with configurable transport options, output formatting, and improved parameter processing
  - **README Overhaul**: Complete redesign with emphasis on production-ready features and detailed TanStack Query integration

- Improvements
  - **API Architecture Overhaul**: Complete restructuring to unified endpoint-based architecture, consolidating 90+ endpoints across 16 API modules
  - **Enhanced Fetching System**: Refactored core fetching logic into modular components with improved error handling
  - **E2E Testing Revolution**: Dynamic endpoint discovery system that automatically tests all endpoints in parallel

- Breaking Changes
  - **API Import Paths**: Changed from individual client imports to unified endpoint imports

## [0.7.0] - 2025-09-30

- Improvements
  - Complete refactoring of fetch system to use Zod end-to-end with strict schema validation
  - Overhaul of API codebase to a one-file-per-endpoint file structure
  - Enhanced Zod descriptions for endpoints and returned fields with supplemental information


- Improvements
  - Created new system of Zod schemas for type definitions and testing, replacing hard-coded TypeScript types for greater consistency
  - Standardized API import patterns and caching strategies across all modules
  - Refined query options types in API hooks for stronger type safety and better developer experience
  - Enhanced error handling in Zod validation to use 'issues' instead of 'errors' for better error reporting
- Docs
  - Added "Returns" and "Update Frequency" sections across all API pages in `docs/apis/`
  - Added Doc Map link in `README.md` to `docs/INDEX.md`
  - Created Context7 integration config and workflow (no auto-run)
  - Enhanced README for clarity and feature highlights
  - Updated API documentation for import standardization and caching strategies
- Build/Fix
  - Corrected type export paths and nullable types in build output
- Chore
  - Repo hygiene: removed internal planning docs and untracked editor settings
  - Updated .gitignore to exclude working directories

## [0.5.0] - 2025-08-11

- Features
  - Added multiple vessel history fetching capabilities (single, multiple, fleet-wide)
  - Enhanced vessel history endpoints with comprehensive date range support
- Improvements
  - Improved type definitions in API query hooks for better type safety
  - Enhanced type safety for API query hooks across all modules
- Docs
  - Enhanced API reference and examples with clearer caching strategies and install/import guidance
  - Updated WSF Vessels API documentation with new vessel history endpoints
  - Added automatic type inference details to documentation
- Build/Fix
  - Build cleanups for type exports with packaging polish for dual ESM/CJS outputs
  - Corrected type export paths and nullable types in build output
- Chore
  - Release automation and repo housekeeping
  - Removed example app from repository to reduce package size

## [0.3.0] - 2025-07-26

- Features
  - Multiple vessel history fetching utilities (single, multiple, fleet-wide)
- Improvements
  - Added explicit types for query options to enhance type safety across all modules
  - Standardized query options and module import patterns for consistency
  - Unified API fetch function naming across multiple modules
  - Optimized caching strategy for vessel data updates with improved data freshness
  - Adjusted query caching strategies for better performance
- Docs
  - Updated vessels documentation with new history endpoints
  - Documented module format support and automatic type inference details
  - Enhanced documentation with configuration and caching examples
- Build
  - Dual module support (ESM/CJS) configuration and packaging updates
  - Updated package configuration for dual module support

## [0.2.x] - 2025-07-25 to 2025-07-26

- Improvements
  - Unified fetch function naming and query options across all modules
  - Adjusted caching strategies for vessel data freshness (daily/hourly updates instead of weekly)
  - Simplified API key and environment variable management
  - Updated API base URLs to use relative paths for better portability
  - Reorganized shared/fetching module for better organization
  - Moved configManager to shared/config for better organization
- Docs
  - Enhanced README features section for clarity and detail
  - README and API reference refinements with validation examples
  - Enhanced documentation and examples for WS-Dottie API
  - Added comprehensive configuration and caching examples
- Build
  - Package config updates with added `.npmignore` to exclude examples
  - Updated package configuration for ESM compatibility
  - Enhanced E2E validation tests for WSDOT APIs
- Fixes
  - Improved validation checks in WSF Vessels E2E tests
  - Refactored E2E tests to use structured objects for terminal ID parameters
  - Fixed import paths for config and toll rates types

## [0.1.x] - 2025-07-22

- Initial Releases
  - Published `ws-dottie` to npm with repository and badges setup
  - Implemented core WSDOT and WSF APIs: Highway Alerts, Cameras, Toll Rates, Traffic Flow, Travel Times, Weather Information, Weather Stations, Mountain Pass Conditions, Bridge Clearances, Commercial Vehicle Restrictions, WSF Terminals, Vessels, Schedule, and Fares
  - Created comprehensive API client with fetch factory for streamlined API interactions
  - Added unit tests and E2E validation tests for all endpoints
  - Established shared utilities and configuration management
  - Created initial API documentation and examples

## [Initial work] - 2025-07-10 to 2025-07-21

- Features
  - Implemented core WSDOT and WSF APIs: Highway Alerts, Cameras, Toll Rates, Traffic Flow, Travel Times, Weather Information (+ Extended), Weather Stations, Mountain Pass Conditions, Bridge Clearances, Commercial Vehicle Restrictions, WSF Terminals, Vessels, Schedule, and Fares
- Tests
  - E2E validation and hook tests; browser JSONP compatibility; date parsing
- Docs
  - Initial API docs, configuration, and examples

---

Guidelines for maintainers:
- For each release, summarize notable user‑visible changes first.
- Keep entries scoped to what affects users of the library (APIs, types, behavior, docs).
- Avoid listing trivial refactors or internal shuffles unless they affect the public API or reliability.

### Release notes template (copy for new versions)

```
## [X.Y.Z] - YYYY-MM-DD

- Features
  - ...

- Improvements
  - ...

- Fixes
  - ...

- Docs
  - ...

- Build/Chore
  - ...

Upgrade notes
- Breaking changes: ...
- Migration steps: ...
```
