/**
 * @fileoverview WSF Vessels API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSF Vessels API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSF Vessels hooks from the main hooks file
export {
  useGetVesselAccommodations,
  useGetVesselAccommodationsByVesselId,
  useGetVesselBasics,
  useGetVesselBasicsByVesselId,
  useGetVesselHistories,
  useGetVesselHistoriesByVesselNameAndDateRange,
  useGetVesselLocations,
  useGetVesselLocationsByVesselId,
  useGetVesselStats,
  useGetVesselStatsByVesselId,
  useGetVesselsVerbose,
  useGetVesselsVerboseByVesselId,
} from "@/shared/tanstack/hooks";
