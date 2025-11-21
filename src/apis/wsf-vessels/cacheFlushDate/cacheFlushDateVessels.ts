import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { cacheFlushDateVesselsMeta } from "./shared/cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./shared/cacheFlushDate.input";
import type { CacheFlushDateOutput } from "./shared/cacheFlushDate.output";

/**
 * Factory result for cache flush date vessels
 */
const cacheFlushDateVesselsFactory = createFetchAndHook<
  CacheFlushDateInput,
  CacheFlushDateOutput
>({
  api: wsfVesselsApiMeta,
  endpoint: cacheFlushDateVesselsMeta,
  getEndpointGroup: () =>
    require("./shared/cacheFlushDate.endpoints").cacheFlushDateVesselsGroup,
});

/**
 * Fetch function and React Query hook for retrieving cache invalidation timestamp for static vessel data
 */
export const {
  fetch: fetchCacheFlushDateVessels,
  hook: useCacheFlushDateVessels,
} = cacheFlushDateVesselsFactory;
