// Schedule Schedules API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { ScheduleDeparture as Sailing, Schedule } from "../types";

/**
 * API function for fetching schedule by route from WSF Schedule API
 */
export const getScheduleByRoute = (params: {
  tripDate: Date;
  routeID: number;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl("/schedule/{tripDate}/{routeID}", params)
  );

/**
 * API function for fetching schedule by terminals from WSF Schedule API
 */
export const getScheduleByTerminals = (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl(
      "/schedule/{tripDate}/{departingTerminalID}/{arrivingTerminalID}",
      params
    )
  );

/**
 * API function for fetching today's schedule by route from WSF Schedule API
 */
export const getScheduleTodayByRoute = (params: {
  routeID: number;
  onlyRemainingTimes?: boolean;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl("/scheduletoday/{routeID}", params)
  );

/**
 * API function for fetching today's schedule by terminals from WSF Schedule API
 */
export const getScheduleTodayByTerminals = (params: {
  departingTerminalID: number;
  arrivingTerminalID: number;
  onlyRemainingTimes?: boolean;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl(
      "/scheduletoday/{departingTerminalID}/{arrivingTerminalID}",
      params
    )
  );

/**
 * API function for fetching sailings from WSF Schedule API
 */
export const getSailings = (params: {
  schedRouteID: number;
}): Promise<Sailing[]> =>
  fetchWsfArray<Sailing>(
    "schedule",
    buildWsfUrl("/sailings/{schedRouteID}", params)
  );

/**
 * API function for fetching all sailings from WSF Schedule API
 */
export const getAllSailings = (params: {
  schedRouteID: number;
  year: number;
}): Promise<Sailing[]> =>
  fetchWsfArray<Sailing>(
    "schedule",
    buildWsfUrl("/allsailings/{schedRouteID}/{year}", params)
  );
