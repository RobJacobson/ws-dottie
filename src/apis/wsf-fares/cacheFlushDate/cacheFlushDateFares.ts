import type {
  CacheFlushDateInput,
  CacheFlushDateOutput,
} from "@/apis/shared/cacheFlushDate";
import { createFetchAndHook } from "@/shared/factories";
import { wsfFaresApiMeta } from "../apiMeta";
import { cacheFlushDateFaresMeta } from "./shared/cacheFlushDate.endpoints";

/**
 * Factory result for cache flush date fares
 */
const cacheFlushDateFaresFactory = createFetchAndHook<
  CacheFlushDateInput,
  CacheFlushDateOutput
>({
  api: wsfFaresApiMeta,
  endpoint: cacheFlushDateFaresMeta,
  getEndpointGroup: () =>
    require("./shared/cacheFlushDate.endpoints").cacheFlushDateFaresGroup,
});

/**
 * Fetch function and React Query hook for retrieving cache flush timestamp for static fares data
 */
export const { fetch: fetchCacheFlushDateFares, hook: useCacheFlushDateFares } =
  cacheFlushDateFaresFactory;
