import { describe, expect, it, vi } from "vitest";

import {
  getFareById,
  getFareCategories,
  getFareCategoryById,
  getFares,
  getFareTypeById,
  getFareTypes,
  getRouteFares,
  getRouteFaresByRouteId,
  getTerminalFares,
  getTerminalFaresByTerminalId,
} from "@/api/wsf/fares/api";

// Mock the fetch function
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsfArray: vi.fn(),
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

describe("WSF Fares API", () => {
  describe("getFares", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFares).toBe("function");
      expect(getFares).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getFares();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFares();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/fares");
    });

    it("should return fare data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockFareData = [
        {
          fareId: 1,
          fareName: "Vehicle and Driver",
          fareAmount: 15.5,
          fareCurrency: "USD",
          fareCategory: "Vehicle",
          fareType: "Standard",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockFareData);

      const result = await getFares();

      expect(result).toEqual(mockFareData);
      expect(result).toHaveLength(1);
      expect(result[0].fareId).toBe(1);
      expect(result[0].fareName).toBe("Vehicle and Driver");
      expect(result[0].fareAmount).toBe(15.5);
    });
  });

  describe("getFareById", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareById).toBe("function");
      expect(getFareById).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getFareById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFareById(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/fares/1");
    });

    it("should handle different fare IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFareById(2);

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/fares/2");
    });

    it("should return fare data for specific ID", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockFareData = [
        {
          fareId: 1,
          fareName: "Vehicle and Driver",
          fareAmount: 15.5,
          fareCurrency: "USD",
          fareCategory: "Vehicle",
          fareType: "Standard",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockFareData);

      const result = await getFareById(1);

      expect(result).toEqual(mockFareData);
      expect(result).toHaveLength(1);
      expect(result[0].fareId).toBe(1);
      expect(result[0].fareName).toBe("Vehicle and Driver");
    });
  });

  describe("getFareCategories", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareCategories).toBe("function");
      expect(getFareCategories).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getFareCategories();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFareCategories();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "fares",
        "/farecategories"
      );
    });

    it("should return fare category data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockCategoryData = [
        {
          categoryId: 1,
          categoryName: "Vehicle",
          categoryDescription: "Vehicle-related fares",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockCategoryData);

      const result = await getFareCategories();

      expect(result).toEqual(mockCategoryData);
      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe(1);
      expect(result[0].categoryName).toBe("Vehicle");
    });
  });

  describe("getFareCategoryById", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareCategoryById).toBe("function");
      expect(getFareCategoryById).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getFareCategoryById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFareCategoryById(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "fares",
        "/farecategories/1"
      );
    });

    it("should return fare category data for specific ID", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockCategoryData = [
        {
          categoryId: 1,
          categoryName: "Vehicle",
          categoryDescription: "Vehicle-related fares",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockCategoryData);

      const result = await getFareCategoryById(1);

      expect(result).toEqual(mockCategoryData);
      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe(1);
      expect(result[0].categoryName).toBe("Vehicle");
    });
  });

  describe("getFareTypes", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareTypes).toBe("function");
      expect(getFareTypes).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getFareTypes();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFareTypes();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/faretypes");
    });

    it("should return fare type data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockTypeData = [
        {
          typeId: 1,
          typeName: "Standard",
          typeDescription: "Standard fare type",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockTypeData);

      const result = await getFareTypes();

      expect(result).toEqual(mockTypeData);
      expect(result).toHaveLength(1);
      expect(result[0].typeId).toBe(1);
      expect(result[0].typeName).toBe("Standard");
    });
  });

  describe("getFareTypeById", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareTypeById).toBe("function");
      expect(getFareTypeById).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getFareTypeById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getFareTypeById(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/faretypes/1");
    });

    it("should return fare type data for specific ID", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockTypeData = [
        {
          typeId: 1,
          typeName: "Standard",
          typeDescription: "Standard fare type",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockTypeData);

      const result = await getFareTypeById(1);

      expect(result).toEqual(mockTypeData);
      expect(result).toHaveLength(1);
      expect(result[0].typeId).toBe(1);
      expect(result[0].typeName).toBe("Standard");
    });
  });

  describe("getRouteFares", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRouteFares).toBe("function");
      expect(getRouteFares).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getRouteFares();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRouteFares();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/routefares");
    });

    it("should return route fare data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockRouteFareData = [
        {
          routeId: 1,
          routeName: "Anacortes / Friday Harbor",
          fareId: 1,
          fareName: "Vehicle and Driver",
          fareAmount: 15.5,
          fareCurrency: "USD",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockRouteFareData);

      const result = await getRouteFares();

      expect(result).toEqual(mockRouteFareData);
      expect(result).toHaveLength(1);
      expect(result[0].routeId).toBe(1);
      expect(result[0].fareAmount).toBe(15.5);
    });
  });

  describe("getRouteFaresByRouteId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRouteFaresByRouteId).toBe("function");
      expect(getRouteFaresByRouteId).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getRouteFaresByRouteId(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRouteFaresByRouteId(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/routefares/1");
    });

    it("should return route fare data for specific route", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockRouteFareData = [
        {
          routeId: 1,
          routeName: "Anacortes / Friday Harbor",
          fareId: 1,
          fareName: "Vehicle and Driver",
          fareAmount: 15.5,
          fareCurrency: "USD",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockRouteFareData);

      const result = await getRouteFaresByRouteId(1);

      expect(result).toEqual(mockRouteFareData);
      expect(result).toHaveLength(1);
      expect(result[0].routeId).toBe(1);
      expect(result[0].fareAmount).toBe(15.5);
    });
  });

  describe("getTerminalFares", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalFares).toBe("function");
      expect(getTerminalFares).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getTerminalFares();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalFares();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("fares", "/terminalfares");
    });

    it("should return terminal fare data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockTerminalFareData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          fareId: 1,
          fareName: "Vehicle and Driver",
          fareAmount: 15.5,
          fareCurrency: "USD",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockTerminalFareData);

      const result = await getTerminalFares();

      expect(result).toEqual(mockTerminalFareData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].fareAmount).toBe(15.5);
    });
  });

  describe("getTerminalFaresByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalFaresByTerminalId).toBe("function");
      expect(getTerminalFaresByTerminalId).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalFaresByTerminalId(7);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalFaresByTerminalId(7);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "fares",
        "/terminalfares/7"
      );
    });

    it("should return terminal fare data for specific terminal", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockTerminalFareData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          fareId: 1,
          fareName: "Vehicle and Driver",
          fareAmount: 15.5,
          fareCurrency: "USD",
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockTerminalFareData);

      const result = await getTerminalFaresByTerminalId(7);

      expect(result).toEqual(mockTerminalFareData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].fareAmount).toBe(15.5);
    });
  });
});
