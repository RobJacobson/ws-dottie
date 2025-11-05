/**
 * @fileoverview WSF Terminals API - Core Functions
 *
 * This module provides strongly-typed functions for WSF Terminals API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { TerminalsCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
import type { TerminalsCacheFlushDate } from "./cacheFlushDate/cacheFlushDate.output";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics/terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics/terminalBasics.output";
import type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins/terminalBulletins.input";
import type { TerminalBulletin } from "./terminalBulletins/terminalBulletins.output";
import type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations/terminalLocations.input";
import type { TerminalLocation } from "./terminalLocations/terminalLocations.output";
import type {
  TerminalSailingSpaceByIdInput,
  TerminalSailingSpaceInput,
} from "./terminalSailingSpace/terminalSailingSpace.input";
import type { TerminalSailingSpace } from "./terminalSailingSpace/terminalSailingSpace.output";
import type {
  TerminalTransportsByIdInput,
  TerminalTransportsInput,
} from "./terminalTransports/terminalTransports.input";
import type { TerminalTransport } from "./terminalTransports/terminalTransports.output";
import type {
  TerminalVerboseByIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose/terminalVerbose.input";
import type { TerminalVerbose } from "./terminalVerbose/terminalVerbose.output";
import type {
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./terminalWaitTimes/terminalWaitTimes.input";
import type { TerminalWaitTime } from "./terminalWaitTimes/terminalWaitTimes.output";

// Create strongly-typed functions using the factory
export const getTerminalBasics = createApiFunction<
  TerminalBasicsInput,
  TerminalBasic[]
>("wsf-terminals:getTerminalBasics");
export const getTerminalBasicsByTerminalId = createApiFunction<
  TerminalBasicsByIdInput,
  TerminalBasic
>("wsf-terminals:getTerminalBasicsByTerminalId");
export const getTerminalBulletins = createApiFunction<
  TerminalBulletinsInput,
  TerminalBulletin[]
>("wsf-terminals:getTerminalBulletins");
export const getTerminalBulletinsByTerminalId = createApiFunction<
  TerminalBulletinsByIdInput,
  TerminalBulletin
>("wsf-terminals:getTerminalBulletinsByTerminalId");
export const getTerminalLocations = createApiFunction<
  TerminalLocationsInput,
  TerminalLocation[]
>("wsf-terminals:getTerminalLocations");
export const getTerminalLocationsByTerminalId = createApiFunction<
  TerminalLocationsByIdInput,
  TerminalLocation
>("wsf-terminals:getTerminalLocationsByTerminalId");
export const getTerminalSailingSpace = createApiFunction<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
>("wsf-terminals:getTerminalSailingSpace");
export const getTerminalSailingSpaceByTerminalId = createApiFunction<
  TerminalSailingSpaceByIdInput,
  TerminalSailingSpace
>("wsf-terminals:getTerminalSailingSpaceByTerminalId");
export const getTerminalTransports = createApiFunction<
  TerminalTransportsInput,
  TerminalTransport[]
>("wsf-terminals:getTerminalTransports");
export const getTerminalTransportsByTerminalId = createApiFunction<
  TerminalTransportsByIdInput,
  TerminalTransport
>("wsf-terminals:getTerminalTransportsByTerminalId");
export const getTerminalVerbose = createApiFunction<
  TerminalVerboseInput,
  TerminalVerbose[]
>("wsf-terminals:getTerminalVerbose");
export const getTerminalVerboseByTerminalId = createApiFunction<
  TerminalVerboseByIdInput,
  TerminalVerbose
>("wsf-terminals:getTerminalVerboseByTerminalId");
export const getTerminalWaitTimes = createApiFunction<
  TerminalWaitTimesInput,
  TerminalWaitTime[]
>("wsf-terminals:getTerminalWaitTimes");
export const getTerminalWaitTimesByTerminalId = createApiFunction<
  TerminalWaitTimesByIdInput,
  TerminalWaitTime
>("wsf-terminals:getTerminalWaitTimesByTerminalId");
export const getTerminalsCacheFlushDate = createApiFunction<
  TerminalsCacheFlushDateInput,
  TerminalsCacheFlushDate
>("wsf-terminals:getTerminalsCacheFlushDate");
