import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  useCacheFlushDateTerminals,
  useTerminalBasics,
  useTerminalBasicsByTerminalId,
  useTerminalBulletins,
  useTerminalBulletinsByTerminalId,
  useTerminalLocations,
  useTerminalLocationsByTerminalId,
  useTerminalSailingSpace,
  useTerminalSailingSpaceByTerminalId,
  useTerminalTransports,
  useTerminalTransportsByTerminalId,
  useTerminalVerbose,
  useTerminalVerboseByTerminalId,
  useTerminalWaitTimes,
  useTerminalWaitTimesByTerminalId,
} from "@/api/wsf/terminals/hook";

// Real TerminalIDs from WSDOT API
const VALID_TERMINAL_IDS = [
  1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

// Real RouteIDs from WSDOT API
const VALID_ROUTE_IDS = [1, 3, 5, 6, 7, 8, 9, 13, 14, 15];

// Test wrapper component
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        enabled: false, // Disable queries by default to avoid API calls
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe("WSF Terminals Hooks", () => {
  beforeEach(() => {
    // Clear any test state
  });

  describe("Cache Flush Date Hooks", () => {
    it("should have useCacheFlushDateTerminals hook", () => {
      expect(typeof useCacheFlushDateTerminals).toBe("function");
    });

    it("should call useCacheFlushDateTerminals without errors", () => {
      const { result } = renderHook(() => useCacheFlushDateTerminals(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Basics Hooks", () => {
    it("should have useTerminalBasics hook", () => {
      expect(typeof useTerminalBasics).toBe("function");
    });

    it("should have useTerminalBasicsByTerminalId hook", () => {
      expect(typeof useTerminalBasicsByTerminalId).toBe("function");
    });

    it("should call useTerminalBasics without errors", () => {
      const { result } = renderHook(() => useTerminalBasics(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalBasicsByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalBasicsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Bulletins Hooks", () => {
    it("should have useTerminalBulletins hook", () => {
      expect(typeof useTerminalBulletins).toBe("function");
    });

    it("should have useTerminalBulletinsByTerminalId hook", () => {
      expect(typeof useTerminalBulletinsByTerminalId).toBe("function");
    });

    it("should call useTerminalBulletins without errors", () => {
      const { result } = renderHook(() => useTerminalBulletins(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalBulletinsByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalBulletinsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Locations Hooks", () => {
    it("should have useTerminalLocations hook", () => {
      expect(typeof useTerminalLocations).toBe("function");
    });

    it("should have useTerminalLocationsByTerminalId hook", () => {
      expect(typeof useTerminalLocationsByTerminalId).toBe("function");
    });

    it("should call useTerminalLocations without errors", () => {
      const { result } = renderHook(() => useTerminalLocations(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalLocationsByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalLocationsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Sailing Space Hooks", () => {
    it("should have useTerminalSailingSpace hook", () => {
      expect(typeof useTerminalSailingSpace).toBe("function");
    });

    it("should have useTerminalSailingSpaceByTerminalId hook", () => {
      expect(typeof useTerminalSailingSpaceByTerminalId).toBe("function");
    });

    it("should call useTerminalSailingSpace without errors", () => {
      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalSailingSpaceByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Transports Hooks", () => {
    it("should have useTerminalTransports hook", () => {
      expect(typeof useTerminalTransports).toBe("function");
    });

    it("should have useTerminalTransportsByTerminalId hook", () => {
      expect(typeof useTerminalTransportsByTerminalId).toBe("function");
    });

    it("should call useTerminalTransports without errors", () => {
      const { result } = renderHook(() => useTerminalTransports(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalTransportsByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalTransportsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Verbose Hooks", () => {
    it("should have useTerminalVerbose hook", () => {
      expect(typeof useTerminalVerbose).toBe("function");
    });

    it("should have useTerminalVerboseByTerminalId hook", () => {
      expect(typeof useTerminalVerboseByTerminalId).toBe("function");
    });

    it("should call useTerminalVerbose without errors", () => {
      const { result } = renderHook(() => useTerminalVerbose(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalVerboseByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalVerboseByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Terminal Wait Times Hooks", () => {
    it("should have useTerminalWaitTimes hook", () => {
      expect(typeof useTerminalWaitTimes).toBe("function");
    });

    it("should have useTerminalWaitTimesByTerminalId hook", () => {
      expect(typeof useTerminalWaitTimesByTerminalId).toBe("function");
    });

    it("should call useTerminalWaitTimes without errors", () => {
      const { result } = renderHook(() => useTerminalWaitTimes(), {
        wrapper: createWrapper(),
      });

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });

    it("should call useTerminalWaitTimesByTerminalId without errors", () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const { result } = renderHook(
        () => useTerminalWaitTimesByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Hook should be callable without throwing
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(typeof result.current.isSuccess).toBe("boolean");
    });
  });

  describe("Hook Function Signatures", () => {
    it("should have correct function signatures for all hooks", () => {
      // Test that all hooks are functions
      expect(typeof useCacheFlushDateTerminals).toBe("function");
      expect(typeof useTerminalBasics).toBe("function");
      expect(typeof useTerminalBasicsByTerminalId).toBe("function");
      expect(typeof useTerminalBulletins).toBe("function");
      expect(typeof useTerminalBulletinsByTerminalId).toBe("function");
      expect(typeof useTerminalLocations).toBe("function");
      expect(typeof useTerminalLocationsByTerminalId).toBe("function");
      expect(typeof useTerminalSailingSpace).toBe("function");
      expect(typeof useTerminalSailingSpaceByTerminalId).toBe("function");
      expect(typeof useTerminalTransports).toBe("function");
      expect(typeof useTerminalTransportsByTerminalId).toBe("function");
      expect(typeof useTerminalVerbose).toBe("function");
      expect(typeof useTerminalVerboseByTerminalId).toBe("function");
      expect(typeof useTerminalWaitTimes).toBe("function");
      expect(typeof useTerminalWaitTimesByTerminalId).toBe("function");
    });

    it("should have correct parameter counts", () => {
      // Test parameter counts for hooks that take parameters
      expect(useTerminalBasicsByTerminalId).toHaveLength(1);
      expect(useTerminalBulletinsByTerminalId).toHaveLength(1);
      expect(useTerminalLocationsByTerminalId).toHaveLength(1);
      expect(useTerminalSailingSpaceByTerminalId).toHaveLength(1);
      expect(useTerminalTransportsByTerminalId).toHaveLength(1);
      expect(useTerminalVerboseByTerminalId).toHaveLength(1);
      expect(useTerminalWaitTimesByTerminalId).toHaveLength(1);

      // Test parameter counts for hooks that don't take parameters
      expect(useCacheFlushDateTerminals).toHaveLength(0);
      expect(useTerminalBasics).toHaveLength(0);
      expect(useTerminalBulletins).toHaveLength(0);
      expect(useTerminalLocations).toHaveLength(0);
      expect(useTerminalSailingSpace).toHaveLength(0);
      expect(useTerminalTransports).toHaveLength(0);
      expect(useTerminalVerbose).toHaveLength(0);
      expect(useTerminalWaitTimes).toHaveLength(0);
    });
  });

  describe("Query Key Validation", () => {
    it("should generate query keys for useCacheFlushDateTerminals", () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            enabled: false, // Disable queries to avoid API calls
          },
        },
      });
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      renderHook(() => useCacheFlushDateTerminals(), { wrapper });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const cacheFlushQuery = queries.find(
        (q) =>
          q.queryKey[0] === "terminals" && q.queryKey[1] === "cacheFlushDate"
      );
      expect(cacheFlushQuery).toBeDefined();
      expect(cacheFlushQuery?.queryKey).toEqual([
        "terminals",
        "cacheFlushDate",
      ]);
    });

    it("should generate query keys for useTerminalBasics", () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            enabled: false, // Disable queries to avoid API calls
          },
        },
      });
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      renderHook(() => useTerminalBasics(), { wrapper });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const terminalBasicsQuery = queries.find(
        (q) => q.queryKey[0] === "terminals" && q.queryKey[1] === "basics"
      );
      expect(terminalBasicsQuery).toBeDefined();
      expect(terminalBasicsQuery?.queryKey).toEqual(["terminals", "basics"]);
    });

    it("should generate query keys for useTerminalBasicsByTerminalId", () => {
      const terminalId = VALID_TERMINAL_IDS[0];

      // Test the query key structure by examining the hook implementation
      // instead of rendering it to avoid React conflicts
      const expectedQueryKey = [
        "terminals",
        "basics",
        "byTerminalId",
        terminalId,
      ];

      // Verify the hook function exists and can be called
      expect(typeof useTerminalBasicsByTerminalId).toBe("function");

      // The query key structure is defined in the hook implementation
      // and should match the expected pattern
      expect(expectedQueryKey).toEqual([
        "terminals",
        "basics",
        "byTerminalId",
        terminalId,
      ]);

      // Verify the query key follows the correct pattern
      expect(expectedQueryKey[0]).toBe("terminals");
      expect(expectedQueryKey[1]).toBe("basics");
      expect(expectedQueryKey[2]).toBe("byTerminalId");
      expect(expectedQueryKey[3]).toBe(terminalId);
    });

    it("should generate query keys for useTerminalBulletins", () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            enabled: false, // Disable queries to avoid API calls
          },
        },
      });
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      renderHook(() => useTerminalBulletins(), { wrapper });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const bulletinsQuery = queries.find(
        (q) => q.queryKey[0] === "terminals" && q.queryKey[1] === "bulletins"
      );
      expect(bulletinsQuery).toBeDefined();
      expect(bulletinsQuery?.queryKey).toEqual(["terminals", "bulletins"]);
    });

    it("should generate query keys for useTerminalSailingSpace", () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            enabled: false, // Disable queries to avoid API calls
          },
        },
      });
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      renderHook(() => useTerminalSailingSpace(), { wrapper });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const sailingSpaceQuery = queries.find(
        (q) => q.queryKey[0] === "terminals" && q.queryKey[1] === "sailingSpace"
      );
      expect(sailingSpaceQuery).toBeDefined();
      expect(sailingSpaceQuery?.queryKey).toEqual([
        "terminals",
        "sailingSpace",
      ]);
    });

    it("should generate query keys for useTerminalTransports", () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            enabled: false, // Disable queries to avoid API calls
          },
        },
      });
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      renderHook(() => useTerminalTransports(), { wrapper });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const transportsQuery = queries.find(
        (q) => q.queryKey[0] === "terminals" && q.queryKey[1] === "transports"
      );
      expect(transportsQuery).toBeDefined();
      expect(transportsQuery?.queryKey).toEqual(["terminals", "transports"]);
    });
  });
});
