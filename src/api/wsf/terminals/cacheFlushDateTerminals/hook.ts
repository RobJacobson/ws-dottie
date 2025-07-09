// CacheFlushDateTerminals React Query hooks

import { useQuery } from "@tanstack/react-query";

import { createCacheFlushOptions } from "@/shared/caching/config";
import { getCacheFlushDateTerminals } from "./api";

/**
 * Hook function for fetching cache flush date from WSF Terminals API with React Query
 */
export const useCacheFlushDateTerminals = () =>
  useQuery({
    queryKey: ["terminals", "cacheFlushDate"],
    queryFn: getCacheFlushDateTerminals,
    ...createCacheFlushOptions(),
  });
