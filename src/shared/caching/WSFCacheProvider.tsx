import { useGlobalCacheFlushMonitor } from "./useGlobalCacheFlushMonitor";

/**
 * WSF Cache Provider Component
 *
 * This component automatically monitors all WSF cache flush endpoints
 * and invalidates queries when data changes. No configuration required.
 *
 * Features:
 * - Monitors fares, schedule, terminals, and vessels cache flush dates
 * - Automatically invalidates queries when changes are detected
 * - Polls every 5 minutes for efficiency
 * - Zero user configuration required
 *
 * Usage:
 * Simply include this component anywhere in your React tree where
 * WSF data is used. It will automatically handle all WSF APIs.
 *
 * @returns null (this component doesn't render anything)
 */
export const WSFCacheProvider = () => {
  // Use the global cache flush monitor
  useGlobalCacheFlushMonitor();

  // This component doesn't render anything
  return null;
};
