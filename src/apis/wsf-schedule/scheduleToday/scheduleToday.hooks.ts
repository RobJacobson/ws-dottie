import {
  fetchScheduleTodayByRoute,
  fetchScheduleTodayByTerminals,
} from "./scheduleToday.endpoints";

export const useScheduleTodayByRoute = fetchScheduleTodayByRoute.useQuery;

export const useScheduleTodayByTerminals =
  fetchScheduleTodayByTerminals.useQuery;
