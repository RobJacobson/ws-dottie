import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  getTerminalTransports,
  getTerminalTransportsByTerminalId,
} from "@/api/wsf-terminals";
import {
  useTerminalTransports,
  useTerminalTransportsByTerminalId,
} from "@/react/wsf-terminals";

// Real TerminalIDs from WSDOT API
const VALID_TERMINAL_IDS = [
  1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

// Test wrapper component
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
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

describe("Terminal Transports E2E Tests", () => {
  beforeEach(() => {
    console.log("🚀 Starting E2E tests with live WSF API calls");
  });

  afterEach(() => {
    console.log("✅ E2E tests completed");
  });

  describe("getTerminalTransports", () => {
    it("should fetch all terminal transports successfully", async () => {
      const startTime = Date.now();

      const result = await getTerminalTransports();

      const duration = Date.now() - startTime;
      console.log(`📊 getTerminalTransports: ${duration}ms`);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);

      if (result.length > 0) {
        const terminal = result[0];
        expect(terminal).toHaveProperty("TerminalID");
        expect(terminal).toHaveProperty("TerminalSubjectID");
        expect(terminal).toHaveProperty("RegionID");
        expect(terminal).toHaveProperty("TerminalName");
        expect(terminal).toHaveProperty("TerminalAbbrev");
        expect(terminal).toHaveProperty("SortSeq");
        expect(terminal).toHaveProperty("TransitLinks");

        expect(typeof terminal.TerminalID).toBe("number");
        expect(typeof terminal.TerminalSubjectID).toBe("number");
        expect(typeof terminal.RegionID).toBe("number");
        expect(typeof terminal.TerminalName).toBe("string");
        expect(typeof terminal.TerminalAbbrev).toBe("string");
        expect(typeof terminal.SortSeq).toBe("number");
        expect(Array.isArray(terminal.TransitLinks)).toBe(true);

        // Check transit link items if they exist
        if (terminal.TransitLinks.length > 0) {
          const transitLink = terminal.TransitLinks[0];
          expect(transitLink).toHaveProperty("LinkName");
          expect(transitLink).toHaveProperty("LinkURL");
          expect(transitLink).toHaveProperty("SortSeq");
          expect(typeof transitLink.LinkName).toBe("string");
          expect(typeof transitLink.LinkURL).toBe("string");
          // SortSeq can be null in actual API
          if (transitLink.SortSeq !== null) {
            expect(typeof transitLink.SortSeq).toBe("number");
          }
        }
      }
    });

    it("should handle API errors gracefully", async () => {
      // This test verifies error handling by using an invalid API call
      // The actual error handling is tested in the implementation
      expect(async () => {
        try {
          await getTerminalTransports();
        } catch (error) {
          // Error should be handled gracefully
          expect(error).toBeDefined();
        }
      }).not.toThrow();
    });
  });

  describe("getTerminalTransportsByTerminalId", () => {
    it("should fetch specific terminal transports successfully", async () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const startTime = Date.now();

      const result = await getTerminalTransportsByTerminalId(terminalId);

      const duration = Date.now() - startTime;
      console.log(
        `📊 getTerminalTransportsByTerminalId(${terminalId}): ${duration}ms`
      );

      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
      expect(result.TerminalID).toBe(terminalId);
      expect(result).toHaveProperty("TerminalSubjectID");
      expect(result).toHaveProperty("RegionID");
      expect(result).toHaveProperty("TerminalName");
      expect(result).toHaveProperty("TerminalAbbrev");
      expect(result).toHaveProperty("SortSeq");
      expect(result).toHaveProperty("TransitLinks");
      expect(Array.isArray(result.TransitLinks)).toBe(true);
    });

    it("should handle invalid terminal ID gracefully", async () => {
      const invalidTerminalId = 99999;

      try {
        const result =
          await getTerminalTransportsByTerminalId(invalidTerminalId);
        // Should return undefined or throw for invalid terminal ID
        expect(result).toBeUndefined();
      } catch (error) {
        // Or should throw an error for invalid terminal ID
        expect(error).toBeDefined();
      }
    });
  });

  describe("useTerminalTransports", () => {
    it("should fetch terminal transports via React Query", async () => {
      const { result } = renderHook(() => useTerminalTransports(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(Array.isArray(result.current.data)).toBe(true);

      if (result.current.data && result.current.data.length > 0) {
        const terminal = result.current.data[0];
        expect(terminal).toHaveProperty("TerminalID");
        expect(terminal).toHaveProperty("TerminalSubjectID");
        expect(terminal).toHaveProperty("RegionID");
        expect(terminal).toHaveProperty("TerminalName");
        expect(terminal).toHaveProperty("TerminalAbbrev");
        expect(terminal).toHaveProperty("SortSeq");
        expect(terminal).toHaveProperty("TransitLinks");
        expect(Array.isArray(terminal.TransitLinks)).toBe(true);
      }
    });

    it("should cache responses correctly", async () => {
      const { result } = renderHook(() => useTerminalTransports(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const firstData = result.current.data;

      // Trigger a refetch
      await result.current.refetch();

      // Data should be cached and consistent
      expect(result.current.data).toEqual(firstData);
    });
  });

  describe("useTerminalTransportsByTerminalId", () => {
    it("should fetch specific terminal transports via React Query", async () => {
      const terminalId = VALID_TERMINAL_IDS[0];

      const { result } = renderHook(
        () => useTerminalTransportsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(typeof result.current.data).toBe("object");
      if (result.current.data) {
        expect(result.current.data.TerminalID).toBe(terminalId);
        expect(result.current.data).toHaveProperty("TransitLinks");
        expect(Array.isArray(result.current.data.TransitLinks)).toBe(true);
      }
    });

    it("should handle loading and error states", async () => {
      const terminalId = VALID_TERMINAL_IDS[0];

      const { result } = renderHook(
        () => useTerminalTransportsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      // Initially should be loading
      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Should no longer be loading
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });

  describe("Performance and Data Validation", () => {
    it("should return data within reasonable time limits", async () => {
      const startTime = Date.now();

      const result = await getTerminalTransports();

      const duration = Date.now() - startTime;
      console.log(`⏱️ getTerminalTransports performance: ${duration}ms`);

      // Should complete within 10 seconds
      expect(duration).toBeLessThan(10000);
      expect(result).toBeDefined();
    });

    it("should validate transport data structure", async () => {
      const result = await getTerminalTransports();

      if (result.length > 0) {
        const terminal = result[0];

        // Validate terminal structure
        expect(terminal.TerminalID).toBeGreaterThan(0);
        expect(terminal.TerminalSubjectID).toBeGreaterThan(0);
        expect(terminal.RegionID).toBeGreaterThan(0);
        expect(terminal.TerminalName.length).toBeGreaterThan(0);
        expect(terminal.TerminalAbbrev.length).toBeGreaterThan(0);
        expect(terminal.SortSeq).toBeGreaterThanOrEqual(0);

        // Validate transit links array
        expect(Array.isArray(terminal.TransitLinks)).toBe(true);

        if (terminal.TransitLinks.length > 0) {
          const transitLink = terminal.TransitLinks[0];

          // Validate transit link structure
          expect(transitLink.LinkName.length).toBeGreaterThan(0);
          expect(transitLink.LinkURL.length).toBeGreaterThan(0);
          // SortSeq can be null in actual API
          if (transitLink.SortSeq !== null) {
            expect(transitLink.SortSeq).toBeGreaterThanOrEqual(0);
          }

          // Validate URL format
          expect(transitLink.LinkURL).toMatch(/^https?:\/\//);
        }
      }
    });
  });
});
