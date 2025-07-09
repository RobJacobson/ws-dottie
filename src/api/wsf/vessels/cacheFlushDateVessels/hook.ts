// Cache flush date hooks

import { useQuery } from "@tanstack/react-query";

import { createCacheFlushOptions } from "@/shared/caching/config";
import type { VesselsCacheFlushDate as VesselCacheFlushDate } from "../types";
import { getCacheFlushDateVessels } from "./api";

/**
 * Hook function for fetching cache flush date from WSF Vessels API with React Query
 *
 * @returns React Query result with VesselCacheFlushDate data
 */
export const useCacheFlushDateVessels = () => {
  return useQuery({
    queryKey: ["vessels", "cacheFlushDate"],
    queryFn: getCacheFlushDateVessels,
    ...createCacheFlushOptions(),
  });
};
