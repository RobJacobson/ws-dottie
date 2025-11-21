import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import { cacheFlushDateTerminalsMeta } from "./shared/cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./shared/cacheFlushDate.input";
import type { CacheFlushDateOutput } from "./shared/cacheFlushDate.output";

/**
 * Factory result for cache flush date terminals
 */
const cacheFlushDateTerminalsFactory = createFetchAndHook<
  CacheFlushDateInput,
  CacheFlushDateOutput
>({
  api: wsfTerminalsApiMeta,
  endpoint: cacheFlushDateTerminalsMeta,
  getEndpointGroup: () =>
    require("./shared/cacheFlushDate.endpoints").cacheFlushDateTerminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving cache invalidation timestamp for static wsf-terminals data
 */
export const {
  fetch: fetchCacheFlushDateTerminals,
  hook: useCacheFlushDateTerminals,
} = cacheFlushDateTerminalsFactory;
