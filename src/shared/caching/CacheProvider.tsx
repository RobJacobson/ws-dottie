// Generic Cache Provider Component
// Monitors cache flush dates and automatically invalidates queries when data changes

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

/**
 * Generic Cache Provider Component
 *
 * This component monitors cache flush dates and automatically
 * invalidates queries when the cache flush date changes, indicating
 * that the underlying data has been updated on the server.
 *
 * @param queryKey - The React Query key to invalidate when cache flush date changes
 * @param useCacheFlushDateHook - Hook that returns cache flush date data
 * @returns null (this component doesn't render anything)
 */
export const CacheProvider = <T extends Date | null | undefined>(
  queryKey: string[],
  useCacheFlushDateHook: () => { data: T }
) => {
  const queryClient = useQueryClient();
  const previousFlushDate = useRef<Date | null>(null);
  const { data: currentFlushDate } = useCacheFlushDateHook();

  useEffect(() => {
    if (
      previousFlushDate.current &&
      currentFlushDate &&
      previousFlushDate.current.getTime() !== currentFlushDate.getTime()
    ) {
      queryClient.invalidateQueries({ queryKey });
    }

    previousFlushDate.current = currentFlushDate || null;
  }, [currentFlushDate, queryClient, queryKey]);

  // This component doesn't render anything
  return null;
};
