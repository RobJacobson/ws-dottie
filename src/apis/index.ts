/**
 * @fileoverview Deprecated API barrel.
 *
 * Historically this module re-exported every API surface, but that pattern
 * prevents effective tree-shaking and bloats consumer bundles. The preferred
 * approach is to import from the specific API package entries exposed via
 * `package.json` (e.g., `ws-dottie/wsf-vessels` or `ws-dottie/wsdot-toll-rates`).
 *
 * The file is kept as a minimal shim so that any lingering internal imports
 * keep working during the transition period. New code should import directly
 * from API-specific entry points.
 */

export * from "./types";
