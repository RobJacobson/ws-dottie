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
export * from "./terminalBasics";
// Terminal bulletins
export * from "./terminalBulletins";
// Terminal locations
export * from "./terminalLocations";
// Terminal sailing space
export * from "./terminalSailingSpace";
// Terminal transports
export * from "./terminalTransports";
// Terminal verbose information
export * from "./terminalVerbose";
// Terminal wait times
export * from "./terminalWaitTimes";
