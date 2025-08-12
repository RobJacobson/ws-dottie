# Changelog

All notable changes to this project will be documented in this file.

- Format: Keep entries concise and high‑signal. Group by type: Features, Improvements, Fixes, Docs, Build/Chore.
- Dates are in YYYY‑MM‑DD.

## [0.6.0] - 2025-08-12

- Improvements
  - Standardized API import patterns and caching strategies across modules
  - Refined query options types in API hooks for stronger type safety
- Docs
  - Added “Returns” and “Update Frequency” sections across all API pages in `docs/apis/`
  - Added Doc Map link in `README.md` to `docs/INDEX.md`
  - Created Context7 integration config and workflow (no auto‑run)
- Build/Fix
  - Corrected type export paths and nullable types in build output
- Chore
  - Repo hygiene: removed internal planning docs and untracked editor settings

## [0.5.0] - 2025-08-11

- Docs
  - Enhanced API reference and examples; clarified caching strategies and install/import guidance
- Build/Fix
  - Build cleanups for type exports; packaging polish for dual ESM/CJS outputs
- Chore
  - Release automation and repo housekeeping

## [0.3.0] - 2025-07-26

- Features
  - Multiple vessel history fetching utilities (single, multiple, fleet‑wide)
- Improvements
  - Added explicit types for query options; strengthened type safety in hooks
  - Standardized query options and module import patterns
- Docs
  - Updated vessels docs with new history endpoints
  - Documented module format support and automatic type inference details
- Build
  - Dual module support (ESM/CJS) configuration and packaging updates

## [0.2.x] - 2025-07-25 to 2025-07-26

- Improvements
  - Unified fetch function naming and query options across modules
  - Adjusted caching strategies (vessel data freshness, daily/hourly updates)
  - Simplified API key/env management; updated base URLs
- Docs
  - README and API reference refinements; validation examples
- Build
  - Package config updates; added `.npmignore` to exclude examples

## [0.1.x] - 2025-07-22

- Initial Releases
  - Published `ws-dottie` to npm; repository and badges setup
  - Early documentation and example updates

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
