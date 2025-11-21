import type {
  CacheFlushDateInput,
  CacheFlushDateOutput,
} from "@/apis/shared/cacheFlushDate";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import { cacheFlushDateScheduleMeta } from "./shared/cacheFlushDate.endpoints";

/**
 * Factory result for cache flush date schedule
 */
const cacheFlushDateScheduleFactory = createFetchAndHook<
  CacheFlushDateInput,
  CacheFlushDateOutput
>({
  api: wsfScheduleApiMeta,
  endpoint: cacheFlushDateScheduleMeta,
  getEndpointGroup: () =>
    require("./shared/cacheFlushDate.endpoints").cacheFlushDateScheduleGroup,
});

/**
 * Fetch function and React Query hook for retrieving timestamp of when static wsf-schedule data was last updated
 */
export const {
  fetch: fetchCacheFlushDateSchedule,
  hook: useCacheFlushDateSchedule,
} = cacheFlushDateScheduleFactory;
