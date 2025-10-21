/**
 * @fileoverview WSF Terminals API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Terminals API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsfTerminalsApi } from "./apiDefinition";
// Export all input types
export type { TerminalsCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
// Export all output types
export type { TerminalsCacheFlushDate } from "./cacheFlushDate/cacheFlushDate.output";
export type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics/terminalBasics.input";
export type { TerminalBasic } from "./terminalBasics/terminalBasics.output";
export type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins/terminalBulletins.input";
export type { TerminalBulletin } from "./terminalBulletins/terminalBulletins.output";
export type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations/terminalLocations.input";
export type { TerminalLocation } from "./terminalLocations/terminalLocations.output";
export type {
  TerminalSailingSpaceByIdInput,
  TerminalSailingSpaceInput,
} from "./terminalSailingSpace/terminalSailingSpace.input";
export type { TerminalSailingSpace } from "./terminalSailingSpace/terminalSailingSpace.output";
export type {
  TerminalTransportsByIdInput,
  TerminalTransportsInput,
} from "./terminalTransports/terminalTransports.input";
export type { TerminalTransportationOption } from "./terminalTransports/terminalTransports.output";
export type {
  TerminalVerboseByIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose/terminalVerbose.input";
export type { TerminalVerbose } from "./terminalVerbose/terminalVerbose.output";
export type {
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./terminalWaitTimes/terminalWaitTimes.input";
export type { TerminalWaitTime } from "./terminalWaitTimes/terminalWaitTimes.output";
