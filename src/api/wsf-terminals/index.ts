/**
 * WSF Terminals API - Complete Export Module
 *
 * This module provides access to Washington State Ferries terminal data including
 * basic information, locations, sailing space, transports, bulletins, wait times,
 * and comprehensive verbose terminal details.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Terminal basics
export * from "./getTerminalBasics";
export * from "./getTerminalBasicsByTerminalId";
// Terminal bulletins
export * from "./getTerminalBulletins";
export * from "./getTerminalBulletinsByTerminalId";
// Terminal locations
export * from "./getTerminalLocations";
export * from "./getTerminalLocationsByTerminalId";
// Terminal sailing space
export * from "./getTerminalSailingSpace";
export * from "./getTerminalSailingSpaceByTerminalId";
// Terminal transports - explicit exports to avoid conflicts
export {
  type GetTerminalTransportsParams,
  getTerminalTransports,
  getTerminalTransportsParamsSchema,
  terminalTransportsArraySchema,
  useTerminalTransports,
} from "./getTerminalTransports";
export {
  type GetTerminalTransportsByTerminalIdParams,
  getTerminalTransportsByTerminalId,
  getTerminalTransportsByTerminalIdParamsSchema,
  type TerminalTransitLink,
  type TerminalTransport,
  terminalTransitLinkSchema,
  terminalTransportSchema,
  useTerminalTransportsByTerminalId,
} from "./getTerminalTransportsByTerminalId";
// Terminal verbose information - explicit exports to avoid conflicts
export {
  type GetTerminalVerboseParams,
  getTerminalVerbose,
  getTerminalVerboseParamsSchema,
  type TerminalVerbose,
  terminalVerboseArraySchema,
  terminalVerboseSchema,
  useTerminalVerbose,
} from "./getTerminalVerbose";
export {
  type GetTerminalVerboseByTerminalIdParams,
  getTerminalVerboseByTerminalId,
  getTerminalVerboseByTerminalIdParamsSchema,
  useTerminalVerboseByTerminalId,
} from "./getTerminalVerboseByTerminalId";
// Terminal wait times
export * from "./getTerminalWaitTimes";
export * from "./getTerminalWaitTimesByTerminalId";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Note: All schemas are available through the wildcard exports above.
// This section is reserved for explicit re-exports if needed to resolve conflicts.

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is now handled automatically via useQueryWithAutoUpdate
// No manual cache provider needed

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Note: All types are available through the wildcard exports above.
// This section is reserved for explicit type re-exports if needed to resolve conflicts.
