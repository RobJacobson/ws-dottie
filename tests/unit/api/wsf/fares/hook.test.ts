import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  useFareLineItems,
  useFareLineItemsBasic,
  useFareLineItemsBasicWithParams,
  useFareLineItemsVerbose,
  useFareLineItemsWithParams,
  useFaresCacheFlushDate,
  useFaresTerminalMates,
  useFaresTerminalMatesWithParams,
  useFaresTerminals,
  useFaresValidDateRange,
  useFareTotals,
  useTerminalCombo,
  useTerminalComboVerbose,
  useTerminalComboWithParams,
} from "@/api/wsf/fares/hook";

// Mock the API functions
vi.mock("@/api/wsf/fares/api", () => ({
  getFaresCacheFlushDate: vi.fn(),
  getFaresValidDateRange: vi.fn(),
  getFaresTerminals: vi.fn(),
  getFaresTerminalMates: vi.fn(),
  getTerminalCombo: vi.fn(),
  getTerminalComboVerbose: vi.fn(),
  getFareLineItemsBasic: vi.fn(),
  getFareLineItems: vi.fn(),
  getFareLineItemsVerbose: vi.fn(),
  getFareTotals: vi.fn(),
  getFareLineItemsWithParams: vi.fn(),
  getFareLineItemsBasicWithParams: vi.fn(),
  getTerminalMatesWithParams: vi.fn(),
  getTerminalComboWithParams: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createInfrequentUpdateOptions: vi.fn(() => ({
    staleTime: 604800000,
    gcTime: 1209600000,
    refetchInterval: false,
  })),
}));

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

describe("WSF Fares Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useFaresCacheFlushDate", () => {
    it("should be a function", () => {
      expect(typeof useFaresCacheFlushDate).toBe("function");
    });

    it("should fetch cache flush date successfully", async () => {
      const { getFaresCacheFlushDate } = await import("@/api/wsf/fares/api");
      const mockGetFaresCacheFlushDate = vi.mocked(getFaresCacheFlushDate);

      const mockDate = new Date("2025-01-10T12:30:00.000Z");
      mockGetFaresCacheFlushDate.mockResolvedValue(mockDate);

      const { result } = renderHook(() => useFaresCacheFlushDate(), {
        wrapper: createWrapper(),
      });

      // Initially loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      // Wait for data to load
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockDate);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockGetFaresCacheFlushDate).toHaveBeenCalledTimes(1);
    });

    it("should handle error states", async () => {
      const { getFaresCacheFlushDate } = await import("@/api/wsf/fares/api");
      const mockGetFaresCacheFlushDate = vi.mocked(getFaresCacheFlushDate);

      const mockError = new Error("Network error");
      mockGetFaresCacheFlushDate.mockRejectedValue(mockError);

      const { result } = renderHook(() => useFaresCacheFlushDate(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it("should use infrequent update options", async () => {
      const { createInfrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateInfrequentUpdateOptions = vi.mocked(
        createInfrequentUpdateOptions
      );
      const { getFaresCacheFlushDate } = await import("@/api/wsf/fares/api");
      vi.mocked(getFaresCacheFlushDate).mockResolvedValue(new Date());

      const { result } = renderHook(() => useFaresCacheFlushDate(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateInfrequentUpdateOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useFaresValidDateRange", () => {
    it("should be a function", () => {
      expect(typeof useFaresValidDateRange).toBe("function");
    });

    it("should fetch valid date range successfully", async () => {
      const { getFaresValidDateRange } = await import("@/api/wsf/fares/api");
      const mockGetFaresValidDateRange = vi.mocked(getFaresValidDateRange);

      const mockDateRange = {
        DateFrom: new Date("2025-01-10T12:30:00.000Z"),
        DateThru: new Date("2025-01-11T12:30:00.000Z"),
      };
      mockGetFaresValidDateRange.mockResolvedValue(mockDateRange);

      const { result } = renderHook(() => useFaresValidDateRange(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockDateRange);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("useFaresTerminals", () => {
    it("should be a function", () => {
      expect(typeof useFaresTerminals).toBe("function");
    });

    it("should accept a tripDate parameter", () => {
      expect(useFaresTerminals).toHaveLength(1);
    });

    it("should fetch terminals successfully", async () => {
      const { getFaresTerminals } = await import("@/api/wsf/fares/api");
      const mockGetFaresTerminals = vi.mocked(getFaresTerminals);

      const tripDate = new Date("2025-01-10");
      const mockTerminals = [
        {
          TerminalID: 1,
          Description: "Anacortes",
        },
        {
          TerminalID: 2,
          Description: "Friday Harbor",
        },
      ];
      mockGetFaresTerminals.mockResolvedValue(mockTerminals);

      const { result } = renderHook(() => useFaresTerminals(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminals);
      expect(mockGetFaresTerminals).toHaveBeenCalledWith(tripDate);
    });

    it("should be disabled when tripDate is not provided", () => {
      const { result } = renderHook(() => useFaresTerminals(null as any), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("useFaresTerminalMates", () => {
    it("should be a function", () => {
      expect(typeof useFaresTerminalMates).toBe("function");
    });

    it("should accept tripDate and terminalID parameters", () => {
      expect(useFaresTerminalMates).toHaveLength(2);
    });

    it("should fetch terminal mates successfully", async () => {
      const { getFaresTerminalMates } = await import("@/api/wsf/fares/api");
      const mockGetFaresTerminalMates = vi.mocked(getFaresTerminalMates);

      const tripDate = new Date("2025-01-10");
      const terminalID = 1;
      const mockTerminalMates = [
        {
          TerminalID: 2,
          Description: "Friday Harbor",
        },
      ];
      mockGetFaresTerminalMates.mockResolvedValue(mockTerminalMates);

      const { result } = renderHook(
        () => useFaresTerminalMates(tripDate, terminalID),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalMates);
      expect(mockGetFaresTerminalMates).toHaveBeenCalledWith(
        tripDate,
        terminalID
      );
    });

    it("should be disabled when parameters are missing", () => {
      const { result } = renderHook(
        () => useFaresTerminalMates(null as any, null as any),
        {
          wrapper: createWrapper(),
        }
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("useFaresTerminalMatesWithParams", () => {
    it("should be a function", () => {
      expect(typeof useFaresTerminalMatesWithParams).toBe("function");
    });

    it("should fetch terminal mates with params successfully", async () => {
      const { getTerminalMatesWithParams } = await import(
        "@/api/wsf/fares/api"
      );
      const mockGetTerminalMatesWithParams = vi.mocked(
        getTerminalMatesWithParams
      );

      const params = {
        tripDate: new Date("2025-01-10"),
        terminalID: 1,
      };
      const mockTerminalMates = [
        {
          TerminalID: 2,
          Description: "Friday Harbor",
        },
      ];
      mockGetTerminalMatesWithParams.mockResolvedValue(mockTerminalMates);

      const { result } = renderHook(
        () => useFaresTerminalMatesWithParams(params),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalMates);
      expect(mockGetTerminalMatesWithParams).toHaveBeenCalledWith(params);
    });
  });

  describe("useTerminalCombo", () => {
    it("should be a function", () => {
      expect(typeof useTerminalCombo).toBe("function");
    });

    it("should accept tripDate, departingTerminalID, and arrivingTerminalID parameters", () => {
      expect(useTerminalCombo).toHaveLength(3);
    });

    it("should fetch terminal combo successfully", async () => {
      const { getTerminalCombo } = await import("@/api/wsf/fares/api");
      const mockGetTerminalCombo = vi.mocked(getTerminalCombo);

      const tripDate = new Date("2025-01-10");
      const departingTerminalID = 1;
      const arrivingTerminalID = 2;
      const mockTerminalCombo = [
        {
          DepartingDescription: "Anacortes",
          ArrivingDescription: "Friday Harbor",
          CollectionDescription: "Standard fare collection",
        },
      ];
      mockGetTerminalCombo.mockResolvedValue(mockTerminalCombo);

      const { result } = renderHook(
        () =>
          useTerminalCombo(tripDate, departingTerminalID, arrivingTerminalID),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalCombo);
      expect(mockGetTerminalCombo).toHaveBeenCalledWith(
        tripDate,
        departingTerminalID,
        arrivingTerminalID
      );
    });
  });

  describe("useTerminalComboWithParams", () => {
    it("should be a function", () => {
      expect(typeof useTerminalComboWithParams).toBe("function");
    });

    it("should fetch terminal combo with params successfully", async () => {
      const { getTerminalComboWithParams } = await import(
        "@/api/wsf/fares/api"
      );
      const mockGetTerminalComboWithParams = vi.mocked(
        getTerminalComboWithParams
      );

      const params = {
        tripDate: new Date("2025-01-10"),
        departingTerminalID: 1,
        arrivingTerminalID: 2,
      };
      const mockTerminalCombo = [
        {
          DepartingDescription: "Anacortes",
          ArrivingDescription: "Friday Harbor",
          CollectionDescription: "Standard fare collection",
        },
      ];
      mockGetTerminalComboWithParams.mockResolvedValue(mockTerminalCombo);

      const { result } = renderHook(() => useTerminalComboWithParams(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalCombo);
      expect(mockGetTerminalComboWithParams).toHaveBeenCalledWith(params);
    });
  });

  describe("useTerminalComboVerbose", () => {
    it("should be a function", () => {
      expect(typeof useTerminalComboVerbose).toBe("function");
    });

    it("should accept a tripDate parameter", () => {
      expect(useTerminalComboVerbose).toHaveLength(1);
    });

    it("should fetch terminal combo verbose successfully", async () => {
      const { getTerminalComboVerbose } = await import("@/api/wsf/fares/api");
      const mockGetTerminalComboVerbose = vi.mocked(getTerminalComboVerbose);

      const tripDate = new Date("2025-01-10");
      const mockTerminalComboVerbose = [
        {
          DepartingTerminalID: 1,
          DepartingDescription: "Anacortes",
          ArrivingTerminalID: 2,
          ArrivingDescription: "Friday Harbor",
          CollectionDescription: "Standard fare collection",
        },
      ];
      mockGetTerminalComboVerbose.mockResolvedValue(mockTerminalComboVerbose);

      const { result } = renderHook(() => useTerminalComboVerbose(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalComboVerbose);
      expect(mockGetTerminalComboVerbose).toHaveBeenCalledWith(tripDate);
    });
  });

  describe("useFareLineItemsBasic", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItemsBasic).toBe("function");
    });

    it("should accept tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters", () => {
      expect(useFareLineItemsBasic).toHaveLength(4);
    });

    it("should fetch basic fare line items successfully", async () => {
      const { getFareLineItemsBasic } = await import("@/api/wsf/fares/api");
      const mockGetFareLineItemsBasic = vi.mocked(getFareLineItemsBasic);

      const tripDate = new Date("2025-01-10");
      const departingTerminalID = 1;
      const arrivingTerminalID = 2;
      const roundTrip = false;
      const mockFareLineItems = [
        {
          FareLineItemID: 1,
          FareLineItem: "Adult Passenger",
          Category: "Passenger",
          DirectionIndependent: true,
          Amount: 15.5,
        },
      ];
      mockGetFareLineItemsBasic.mockResolvedValue(mockFareLineItems);

      const { result } = renderHook(
        () =>
          useFareLineItemsBasic(
            tripDate,
            departingTerminalID,
            arrivingTerminalID,
            roundTrip
          ),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFareLineItems);
      expect(mockGetFareLineItemsBasic).toHaveBeenCalledWith(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip
      );
    });
  });

  describe("useFareLineItems", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItems).toBe("function");
    });

    it("should accept tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters", () => {
      expect(useFareLineItems).toHaveLength(4);
    });

    it("should fetch fare line items successfully", async () => {
      const { getFareLineItems } = await import("@/api/wsf/fares/api");
      const mockGetFareLineItems = vi.mocked(getFareLineItems);

      const tripDate = new Date("2025-01-10");
      const departingTerminalID = 1;
      const arrivingTerminalID = 2;
      const roundTrip = false;
      const mockFareLineItems = [
        {
          FareLineItemID: 1,
          FareLineItem: "Adult Passenger",
          Category: "Passenger",
          DirectionIndependent: true,
          Amount: 15.5,
        },
        {
          FareLineItemID: 2,
          FareLineItem: "Vehicle Under 14'",
          Category: "Vehicle",
          DirectionIndependent: false,
          Amount: 45.75,
        },
      ];
      mockGetFareLineItems.mockResolvedValue(mockFareLineItems);

      const { result } = renderHook(
        () =>
          useFareLineItems(
            tripDate,
            departingTerminalID,
            arrivingTerminalID,
            roundTrip
          ),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFareLineItems);
      expect(mockGetFareLineItems).toHaveBeenCalledWith(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip
      );
    });
  });

  describe("useFareLineItemsWithParams", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItemsWithParams).toBe("function");
    });

    it("should fetch fare line items with params successfully", async () => {
      const { getFareLineItemsWithParams } = await import(
        "@/api/wsf/fares/api"
      );
      const mockGetFareLineItemsWithParams = vi.mocked(
        getFareLineItemsWithParams
      );

      const params = {
        tripDate: new Date("2025-01-10"),
        departingTerminalID: 1,
        arrivingTerminalID: 2,
        roundTrip: false,
      };
      const mockFareLineItems = [
        {
          FareLineItemID: 1,
          FareLineItem: "Adult Passenger",
          Category: "Passenger",
          DirectionIndependent: true,
          Amount: 15.5,
        },
      ];
      mockGetFareLineItemsWithParams.mockResolvedValue(mockFareLineItems);

      const { result } = renderHook(() => useFareLineItemsWithParams(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFareLineItems);
      expect(mockGetFareLineItemsWithParams).toHaveBeenCalledWith(params);
    });
  });

  describe("useFareLineItemsBasicWithParams", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItemsBasicWithParams).toBe("function");
    });

    it("should fetch basic fare line items with params successfully", async () => {
      const { getFareLineItemsBasicWithParams } = await import(
        "@/api/wsf/fares/api"
      );
      const mockGetFareLineItemsBasicWithParams = vi.mocked(
        getFareLineItemsBasicWithParams
      );

      const params = {
        tripDate: new Date("2025-01-10"),
        departingTerminalID: 1,
        arrivingTerminalID: 2,
        roundTrip: true,
      };
      const mockFareLineItems = [
        {
          FareLineItemID: 1,
          FareLineItem: "Adult Passenger",
          Category: "Passenger",
          DirectionIndependent: true,
          Amount: 15.5,
        },
      ];
      mockGetFareLineItemsBasicWithParams.mockResolvedValue(mockFareLineItems);

      const { result } = renderHook(
        () => useFareLineItemsBasicWithParams(params),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFareLineItems);
      expect(mockGetFareLineItemsBasicWithParams).toHaveBeenCalledWith(params);
    });
  });

  describe("useFareLineItemsVerbose", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItemsVerbose).toBe("function");
    });

    it("should accept a tripDate parameter", () => {
      expect(useFareLineItemsVerbose).toHaveLength(1);
    });

    it("should fetch verbose fare line items successfully", async () => {
      const { getFareLineItemsVerbose } = await import("@/api/wsf/fares/api");
      const mockGetFareLineItemsVerbose = vi.mocked(getFareLineItemsVerbose);

      const tripDate = new Date("2025-01-10");
      const mockFareLineItemsVerbose = [
        {
          DepartingTerminalID: 1,
          DepartingDescription: "Anacortes",
          ArrivingTerminalID: 2,
          ArrivingDescription: "Friday Harbor",
          FareLineItemID: 1,
          FareLineItem: "Adult Passenger",
          Category: "Passenger",
          DirectionIndependent: true,
          Amount: 15.5,
          RoundTrip: false,
        },
      ];
      mockGetFareLineItemsVerbose.mockResolvedValue(mockFareLineItemsVerbose);

      const { result } = renderHook(() => useFareLineItemsVerbose(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFareLineItemsVerbose);
      expect(mockGetFareLineItemsVerbose).toHaveBeenCalledWith(tripDate);
    });
  });

  describe("useFareTotals", () => {
    it("should be a function", () => {
      expect(typeof useFareTotals).toBe("function");
    });

    it("should accept a request parameter", () => {
      expect(useFareTotals).toHaveLength(1);
    });

    it("should fetch fare totals successfully", async () => {
      const { getFareTotals } = await import("@/api/wsf/fares/api");
      const mockGetFareTotals = vi.mocked(getFareTotals);

      const request = {
        tripDate: new Date("2025-01-10"),
        departingTerminalID: 1,
        arrivingTerminalID: 2,
        roundTrip: false,
        fareLineItemIDs: [1, 2],
        quantities: [2, 1],
      };
      const mockFareTotals = [
        {
          TotalType: 0,
          Description: "Departure Total",
          BriefDescription: "Depart",
          Amount: 76.75,
        },
      ];
      mockGetFareTotals.mockResolvedValue(mockFareTotals);

      const { result } = renderHook(() => useFareTotals(request), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockFareTotals);
      expect(mockGetFareTotals).toHaveBeenCalledWith(request);
    });

    it("should be disabled when request is invalid", () => {
      const invalidRequest = {
        tripDate: new Date("2025-01-10"),
        departingTerminalID: 1,
        arrivingTerminalID: 2,
        roundTrip: false,
        fareLineItemIDs: [1, 2],
        quantities: [1], // Mismatched lengths
      };

      const { result } = renderHook(() => useFareTotals(invalidRequest), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });
});
