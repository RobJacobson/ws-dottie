/**
 * @fileoverview WSF Terminals API Schemas
 *
 * This file re-exports all Zod schemas for the WSF Terminals API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSF Terminals functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/} WSF API Documentation
 */

// ============================================================================
// BULLETINS
// ============================================================================

export * from "./bulletin.zod";
export * from "./terminalBulletins.zod";
export * from "./terminalBulletinss.zod";

// ============================================================================
// LOCATIONS
// ============================================================================

export * from "./dispGISZoomLoc.zod";
export * from "./terminalLocation.zod";
export * from "./terminalLocations.zod";

// ============================================================================
// SAILING SPACE
// ============================================================================

export * from "./departingSpace.zod";
export * from "./spaceForArrivalTerminal.zod";
export * from "./terminalSailingSpace.zod";
export * from "./terminalSailingSpaces.zod";

// ============================================================================
// TERMINALS
// ============================================================================

export * from "./terminal.zod";
export * from "./terminalBasics.zod";
export * from "./terminalBasicss.zod";
export * from "./terminalVerbose.zod";
export * from "./terminalVerboses.zod";

// ============================================================================
// TRANSPORTS
// ============================================================================

export * from "./terminalTransports.zod";
export * from "./terminalTransportss.zod";
export * from "./transitLink.zod";

// ============================================================================
// WAIT TIMES
// ============================================================================

export * from "./terminalWaitTimes.zod";
export * from "./terminalWaitTimess.zod";
export * from "./waitTime.zod";
