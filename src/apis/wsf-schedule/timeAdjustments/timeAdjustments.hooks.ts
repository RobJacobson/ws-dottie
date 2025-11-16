import {
  fetchTimeAdjustments,
  fetchTimeAdjustmentsByRoute,
  fetchTimeAdjustmentsBySchedRoute,
} from "./timeAdjustments.endpoints";

export const useTimeAdjustments = fetchTimeAdjustments.useQuery;

export const useTimeAdjustmentsByRoute = fetchTimeAdjustmentsByRoute.useQuery;

export const useTimeAdjustmentsBySchedRoute =
  fetchTimeAdjustmentsBySchedRoute.useQuery;
