// Persistent QueryClient Setup
// Configures React Query with localStorage persistence for offline-first experience

import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import * as React from "react";

/**
 * Create a persistent QueryClient with localStorage persistence
 *
 * This QueryClient will:
 * - Persist all query cache to localStorage
 * - Restore cache on app startup
 * - Keep data for up to 7 days
 * - Provide instant data loading on app restart
 */
export const createPersistentQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Default to infrequent update settings
        staleTime: 7 * 24 * 60 * 60 * 1000, // 1 week
        gcTime: 30 * 24 * 60 * 60 * 1000, // 30 days
        retry: 3,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });

  // Only set up persistence on web platform
  if (typeof window !== "undefined") {
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
      key: "wsf-query-cache", // Namespace for WSF data
    });

    persistQueryClient({
      queryClient,
      persister,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      buster: "v1", // Cache buster for app updates
    });
  }

  return queryClient;
};

/**
 * Hook for invalidating real-time queries on app startup
 *
 * This ensures that real-time data (vessel locations, terminal capacity)
 * gets refreshed immediately after the app starts, while infrequent data
 * (terminal info, vessel specs, schedules) stays cached until cache flush invalidation.
 */
export const useStartupRefetch = () => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    // Only refetch real-time data on startup
    // Infrequent data will be invalidated by cache flush dates when needed
    queryClient.invalidateQueries({ queryKey: ["vessels", "locations"] });
    queryClient.invalidateQueries({ queryKey: ["terminals", "sailingSpace"] });
  }, [queryClient]);
};
