// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Cache flush date
export * from "./getCacheFlushDateTerminals";
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
// Terminal transports
export * from "./getTerminalTransports";
export * from "./getTerminalTransportsByTerminalId";
// Terminal verbose
export * from "./getTerminalVerbose";
export * from "./getTerminalVerboseByTerminalId";
// Terminal wait times
export * from "./getTerminalWaitTimes";
export * from "./getTerminalWaitTimesByTerminalId";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE (with explicit re-exports to resolve conflicts)
// ============================================================================

export {
  terminalBasicsArraySchema,
  terminalBasicsSchema,
} from "./getTerminalBasics";
export {
  terminalBulletinArraySchema,
  terminalBulletinSchema,
} from "./getTerminalBulletins";
export {
  terminalLocationArraySchema,
  terminalLocationSchema,
} from "./getTerminalLocations";
export {
  terminalSailingSpaceArraySchema,
  terminalSailingSpaceSchema,
} from "./getTerminalSailingSpace";
export {
  terminalTransitLinkSchema,
  terminalTransportArraySchema,
  terminalTransportSchema,
} from "./getTerminalTransports";
export {
  terminalVerboseArraySchema,
  terminalVerboseSchema,
  terminalWaitTimeSchema,
} from "./getTerminalVerbose";
export { terminalWaitTimesSchema } from "./getTerminalWaitTimes";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

export * from "./cache";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { TerminalBasics } from "./getTerminalBasicsByTerminalId";
export type {
  TerminalBulletin,
  TerminalBulletinItem,
} from "./getTerminalBulletinsByTerminalId";
export type { TerminalLocation } from "./getTerminalLocationsByTerminalId";
export type {
  TerminalDepartingSpace,
  TerminalSailingSpace,
} from "./getTerminalSailingSpaceByTerminalId";
export type {
  TerminalTransitLink,
  TerminalTransport,
} from "./getTerminalTransportsByTerminalId";
export type { TerminalVerbose } from "./getTerminalVerboseByTerminalId";
export type {
  TerminalWaitTime,
  TerminalWaitTimes,
} from "./getTerminalWaitTimesByTerminalId";
