import { describe, expect, it, vi } from "vitest";

import {
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
} from "@/api/wsf/terminals/terminalBasics/api";

// Mock the fetch function
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsfArray: vi.fn(),
}));

describe("Terminal Basics API", () => {
  describe("getTerminalBasics", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalBasics).toBe("function");
      expect(getTerminalBasics).toHaveLength(0);
    });

    it("should return a Promise", () => {
      const { fetchWsfArray } = require("@/shared/fetching/fetch");
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
  });

  describe("getTerminalBasicsByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalBasicsByTerminalId).toBe("function");
      expect(getTerminalBasicsByTerminalId).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalBasicsByTerminalId(1);
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
});
