import { describe, expect, it, vi } from "vitest";

import {
  getTerminalWaitTimes,
  getTerminalWaitTimesByRoute,
  getTerminalWaitTimesByRouteAndTerminal,
  getTerminalWaitTimesByTerminal,
} from "@/api/wsf/terminals/terminalWaitTimes/api";

// Mock the fetch function
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsfArray: vi.fn(),
}));

describe("TerminalWaitTimes API", () => {
  describe("getTerminalWaitTimes", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimes).toBe("function");
      expect(getTerminalWaitTimes).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getTerminalWaitTimes();
      expect(result).toBeInstanceOf(Promise);
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
          waitTimeMinutes: 30,
          lastUpdated: new Date("2024-04-01T10:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockWaitTimeData);

      const result = await getTerminalWaitTimes();

      expect(result).toEqual(mockWaitTimeData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[0].waitTimeMinutes).toBe(30);
    });
  });

  describe("getTerminalWaitTimesByRoute", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByRoute).toBe("function");
      expect(getTerminalWaitTimesByRoute).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalWaitTimesByRoute(1);
      expect(result).toBeInstanceOf(Promise);
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

    it("should handle different route IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimesByRoute(2);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes/2"
      );
    });

    it("should return terminal wait times data for specific route", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeMinutes: 30,
          lastUpdated: new Date("2024-04-01T10:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockWaitTimeData);

      const result = await getTerminalWaitTimesByRoute(1);

      expect(result).toEqual(mockWaitTimeData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[0].waitTimeMinutes).toBe(30);
    });
  });

  describe("getTerminalWaitTimesByTerminal", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByTerminal).toBe("function");
      expect(getTerminalWaitTimesByTerminal).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalWaitTimesByTerminal(7);
      expect(result).toBeInstanceOf(Promise);
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

    it("should handle different terminal IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimesByTerminal(8);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes/8"
      );
    });

    it("should return terminal wait times data for specific terminal", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeMinutes: 30,
          lastUpdated: new Date("2024-04-01T10:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockWaitTimeData);

      const result = await getTerminalWaitTimesByTerminal(7);

      expect(result).toEqual(mockWaitTimeData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[0].waitTimeMinutes).toBe(30);
    });
  });

  describe("getTerminalWaitTimesByRouteAndTerminal", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByRouteAndTerminal).toBe("function");
      expect(getTerminalWaitTimesByRouteAndTerminal).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalWaitTimesByRouteAndTerminal({
        routeId: 1,
        terminalId: 7,
      });
      expect(result).toBeInstanceOf(Promise);
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

    it("should handle different route and terminal combinations", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalWaitTimesByRouteAndTerminal({
        routeId: 2,
        terminalId: 8,
      });

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminalwaittimes/2/8"
      );
    });

    it("should return terminal wait times data for specific route and terminal", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeMinutes: 30,
          lastUpdated: new Date("2024-04-01T10:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockWaitTimeData);

      const result = await getTerminalWaitTimesByRouteAndTerminal({
        routeId: 1,
        terminalId: 7,
      });

      expect(result).toEqual(mockWaitTimeData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[0].waitTimeMinutes).toBe(30);
    });
  });
});
