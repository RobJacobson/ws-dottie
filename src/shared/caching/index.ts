// Shared caching utilities

export * from "./CacheProvider";
export * from "./config";
export * from "./useGlobalCacheFlushMonitor";
export * from "./WSFCacheProvider";

// Note: Individual WSF API cache providers are now exported from their respective API modules:
// - VesselCacheProvider from "@/api/wsf-vessels/cache"
// - TerminalCacheProvider from "@/api/wsf-terminals/cache"
// - ScheduleCacheProvider from "@/api/wsf-schedule/cache"
// - FaresCacheProvider from "@/api/wsf-fares/cache"
//
// NEW: Use WSFCacheProvider for automatic monitoring of all WSF APIs
// - Zero configuration required
// - Automatically monitors all cache flush endpoints
// - Polls every 5 minutes for efficiency
