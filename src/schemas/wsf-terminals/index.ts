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

// ============================================================================
// LOCATIONS
// ============================================================================

export * from "./dispGISZoomLoc.zod";
export * from "./terminalLocation.zod";

// ============================================================================
// SAILING SPACE
// ============================================================================

export * from "./departingSpace.zod";
export * from "./spaceForArrivalTerminal.zod";
export * from "./terminalSailingSpace.zod";

// ============================================================================
// TERMINALS
// ============================================================================

export * from "./terminal.zod";
export * from "./terminalBasics.zod";
export * from "./terminalVerbose.zod";

// ============================================================================
// TRANSPORTS
// ============================================================================

export * from "./terminalTransports.zod";
export * from "./transitLink.zod";

// ============================================================================
// WAIT TIMES
// ============================================================================

export * from "./terminalWaitTimes.zod";
export * from "./waitTime.zod";
