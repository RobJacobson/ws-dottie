/**
 * @fileoverview WSF Terminals API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Terminals API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsfTerminalsApi } from "./endpoints";

// Export all input types
export type {
  CacheFlushDateInput,
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
  TerminalSailingSpaceByIdInput,
  TerminalSailingSpaceInput,
  TerminalTransportsByIdInput,
  TerminalTransportsInput,
  TerminalVerboseByIdInput,
  TerminalVerboseInput,
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  CacheFlushDate,
  TerminalBasic,
  TerminalBasicDetailsList,
  TerminalBulletin,
  TerminalBulletinsList,
  TerminalLocation,
  TerminalLocationsList,
  TerminalSailingSpace,
  TerminalSailingSpacesList,
  TerminalTransportationOption,
  TerminalTransportationOptionsList,
  TerminalVerbose,
  TerminalVerboseDetailsList,
  TerminalWaitTime,
  TerminalWaitTimesList,
} from "./original/outputSchemas.original";
