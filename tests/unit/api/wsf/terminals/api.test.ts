import { describe, expect, it, vi } from "vitest";

import {
  getCacheFlushDateTerminals,
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
  getTerminalSailingSpace,
  getTerminalSailingSpaceByRoute,
  getTerminalSailingSpaceByTerminalAndRoute,
  getTerminalSailingSpaceByTerminalId,
  getTerminalVerbose,
  getTerminalVerboseByTerminalId,
  getTerminalWaitTimes,
  getTerminalWaitTimesByRoute,
  getTerminalWaitTimesByRouteAndTerminal,
  getTerminalWaitTimesByTerminal,
} from "@/api/wsf/terminals/api";

// Mock the fetch functions
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsfArray: vi.fn(),
  fetchWsf: vi.fn(),
}));

// Mock the URL builder
vi.mock("@/shared/fetching/dateUtils", () => ({
  buildWsfUrl: vi.fn((template: string, params: Record<string, any>) => {
    let url = template;
    for (const [key, value] of Object.entries(params)) {
      const placeholder = `{${key}}`;
      if (url.includes(placeholder)) {
        url = url.replace(placeholder, String(value));
      }
    }
    return url;
  }),
}));

describe("WSF Terminals API", () => {
  describe("getTerminalBasics", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalBasics).toBe("function");
      expect(getTerminalBasics).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getTerminalBasics();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalBasics();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalbasics"
      );
    });

    it("should return terminal basics data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockTerminalData);

      const result = await getTerminalBasics();

      expect(result).toEqual(mockTerminalData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
    });
  });

  describe("getTerminalBasicsByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalBasicsByTerminalId).toBe("function");
      expect(getTerminalBasicsByTerminalId).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalBasicsByTerminalId(7);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalBasicsByTerminalId(7);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalbasics/7"
      );
    });

    it("should handle different terminal IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalBasicsByTerminalId(8);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalbasics/8"
      );
    });
  });

  describe("getTerminalSailingSpace", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalSailingSpace).toBe("function");
      expect(getTerminalSailingSpace).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getTerminalSailingSpace();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalSailingSpace();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalsailingspace"
      );
    });

    it("should return terminal sailing space data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          spaceAvailable: 150,
          lastUpdated: new Date("2024-01-01T12:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockSpaceData);

      const result = await getTerminalSailingSpace();

      expect(result).toEqual(mockSpaceData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].spaceAvailable).toBe(150);
    });
  });

  describe("getTerminalSailingSpaceByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalSailingSpaceByTerminalId).toBe("function");
      expect(getTerminalSailingSpaceByTerminalId).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalSailingSpaceByTerminalId(7);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalsailingspace/7"
      );
    });
  });

  describe("getTerminalSailingSpaceByRoute", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalSailingSpaceByRoute).toBe("function");
      expect(getTerminalSailingSpaceByRoute).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalSailingSpaceByRoute(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalsailingspace/route/1"
      );
    });
  });

  describe("getTerminalSailingSpaceByTerminalAndRoute", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalSailingSpaceByTerminalAndRoute).toBe("function");
      expect(getTerminalSailingSpaceByTerminalAndRoute).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalSailingSpaceByTerminalAndRoute({
        terminalId: 7,
        routeId: 1,
      });

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalsailingspace/terminal/7/route/1"
      );
    });
  });

  describe("getTerminalVerbose", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalVerbose).toBe("function");
      expect(getTerminalVerbose).toHaveLength(0);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalVerbose();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalverbose"
      );
    });

    it("should return terminal verbose data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          facilities: "Restrooms, Food Service, Gift Shop",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockTerminalData);

      const result = await getTerminalVerbose();

      expect(result).toEqual(mockTerminalData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].facilities).toBe("Restrooms, Food Service, Gift Shop");
    });
  });

  describe("getTerminalVerboseByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalVerboseByTerminalId).toBe("function");
      expect(getTerminalVerboseByTerminalId).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalVerboseByTerminalId(7);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalverbose/7"
      );
    });
  });

  describe("getTerminalWaitTimes", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimes).toBe("function");
      expect(getTerminalWaitTimes).toHaveLength(0);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimes();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes"
      );
    });

    it("should return terminal wait times data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeMinutes: 45,
          lastUpdated: new Date("2024-01-01T12:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockWaitTimeData);

      const result = await getTerminalWaitTimes();

      expect(result).toEqual(mockWaitTimeData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].waitTimeMinutes).toBe(45);
    });
  });

  describe("getTerminalWaitTimesByRoute", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByRoute).toBe("function");
      expect(getTerminalWaitTimesByRoute).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimesByRoute(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes/1"
      );
    });
  });

  describe("getTerminalWaitTimesByTerminal", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByTerminal).toBe("function");
      expect(getTerminalWaitTimesByTerminal).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimesByTerminal(7);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes/7"
      );
    });
  });

  describe("getTerminalWaitTimesByRouteAndTerminal", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByRouteAndTerminal).toBe("function");
      expect(getTerminalWaitTimesByRouteAndTerminal).toHaveLength(1);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimesByRouteAndTerminal({
        routeId: 1,
        terminalId: 7,
      });

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes/1/7"
      );
    });
  });

  describe("getCacheFlushDateTerminals", () => {
    it("should have the correct function signature", () => {
      expect(typeof getCacheFlushDateTerminals).toBe("function");
      expect(getCacheFlushDateTerminals).toHaveLength(0);
    });

    it("should call fetchWsf with correct parameters", async () => {
      const { fetchWsf } = await import("@/shared/fetching/fetch");
      const mockFetchWsf = vi.mocked(fetchWsf);

      mockFetchWsf.mockResolvedValue({} as any);

      await getCacheFlushDateTerminals();

      expect(mockFetchWsf).toHaveBeenCalledWith("terminals", "/cacheflushdate");
    });

    it("should return cache flush date data", async () => {
      const { fetchWsf } = await import("@/shared/fetching/fetch");
      const mockFetchWsf = vi.mocked(fetchWsf);

      const mockCacheFlushData = {
        lastUpdated: new Date("2024-01-01T12:00:00Z"),
        source: "terminals",
      };

      mockFetchWsf.mockResolvedValue(mockCacheFlushData);

      const result = await getCacheFlushDateTerminals();

      expect(result).toEqual(mockCacheFlushData);
      expect(result.lastUpdated).toBeInstanceOf(Date);
      expect(result.source).toBe("terminals");
    });
  });
});
