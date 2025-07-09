// Schedule Time Adjustments API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { TimeAdjustment } from "../types";

/**
 * API function for fetching all time adjustments from WSF Schedule API
 */
export const getTimeAdjustments = (): Promise<TimeAdjustment[]> =>
  fetchWsfArray<TimeAdjustment>("schedule", "/timeadj");

/**
 * API function for fetching time adjustments by route from WSF Schedule API
 */
export const getTimeAdjustmentsByRoute = (
  routeID: number
): Promise<TimeAdjustment[]> =>
  fetchWsfArray<TimeAdjustment>(
    "schedule",
    buildWsfUrl("/timeadjbyroute/{routeID}", { routeID })
  );

/**
 * API function for fetching time adjustments by scheduled route from WSF Schedule API
 */
export const getTimeAdjustmentsBySchedRoute = (
  schedRouteID: number
): Promise<TimeAdjustment[]> =>
  fetchWsfArray<TimeAdjustment>(
    "schedule",
    buildWsfUrl("/timeadjbyschedroute/{schedRouteID}", { schedRouteID })
  );
