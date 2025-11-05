/**
 * @fileoverview WSF Vessels API - Core Functions
 *
 * This module provides strongly-typed functions for WSF Vessels API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations/vesselAccommodations.input";
import type { VesselAccommodations } from "./vesselAccommodations/vesselAccommodations.output";
import type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics/vesselBasics.input";
import type { VesselBasic } from "./vesselBasics/vesselBasics.output";
import type { GetVesselHistoryInput } from "./vesselHistories/vesselHistories.input";
import type { VesselHistoryResponse } from "./vesselHistories/vesselHistories.output";
import type { VesselLocationsInput } from "./vesselLocations/vesselLocations.input";
import type { VesselLocations } from "./vesselLocations/vesselLocations.output";
// Import all input/output types
import type {
  VesselStatsByIdInput,
  VesselStatsInput,
} from "./vesselStats/vesselStats.input";
import type { VesselStats } from "./vesselStats/vesselStats.output";
import type { VesselVerbose } from "./vesselVerbose/vesselVerbose.output";

// Create strongly-typed functions using the factory
export const getVesselStats = createApiFunction<
  VesselStatsInput,
  VesselStats[]
>("wsf-vessels:getVesselStats");
export const getVesselStatsByVesselId = createApiFunction<
  VesselStatsByIdInput,
  VesselStats
>("wsf-vessels:getVesselStatsByVesselId");
export const getVesselAccommodations = createApiFunction<
  VesselAccommodationsInput,
  VesselAccommodations[]
>("wsf-vessels:getVesselAccommodations");
export const getVesselAccommodationsByVesselId = createApiFunction<
  VesselAccommodationsByIdInput,
  VesselAccommodations
>("wsf-vessels:getVesselAccommodationsByVesselId");
export const getVesselBasics = createApiFunction<
  VesselBasicsInput,
  VesselBasic[]
>("wsf-vessels:getVesselBasics");
export const getVesselBasicsByVesselId = createApiFunction<
  VesselBasicsByIdInput,
  VesselBasic
>("wsf-vessels:getVesselBasicsByVesselId");
export const getVesselHistories = createApiFunction<
  GetVesselHistoryInput,
  VesselHistoryResponse[]
>("wsf-vessels:getVesselHistories");
export const getVesselHistoriesByVesselNameAndDateRange = createApiFunction<
  GetVesselHistoryInput,
  VesselHistoryResponse[]
>("wsf-vessels:getVesselHistoriesByVesselNameAndDateRange");
export const getVesselLocations = createApiFunction<
  VesselLocationsInput,
  VesselLocations[]
>("wsf-vessels:getVesselLocations");
export const getVesselLocationsByVesselId = createApiFunction<
  VesselLocationsInput,
  VesselLocations[]
>("wsf-vessels:getVesselLocationsByVesselId");
export const getVesselsVerbose = createApiFunction<void, VesselVerbose[]>(
  "wsf-vessels:getVesselsVerbose"
);
export const getVesselsVerboseByVesselId = createApiFunction<
  { VesselID: number },
  VesselVerbose
>("wsf-vessels:getVesselsVerboseByVesselId");
