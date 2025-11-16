import * as endpoints from "./timeAdjustments.endpoints";

export const fetchTimeAdjustments = endpoints.fetchTimeAdjustments.fetch;

export const fetchTimeAdjustmentsByRoute =
  endpoints.fetchTimeAdjustmentsByRoute.fetch;

export const fetchTimeAdjustmentsBySchedRoute =
  endpoints.fetchTimeAdjustmentsBySchedRoute.fetch;
