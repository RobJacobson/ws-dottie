import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsBasicWithParams,
  getFareLineItemsVerbose,
  getFareLineItemsWithParams,
  getFaresCacheFlushDate,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotals,
  getTerminalCombo,
  getTerminalComboVerbose,
  getTerminalComboWithParams,
  getTerminalMatesWithParams,
} from "@/api/wsf/fares/api";

// Mock the shared fetching utilities
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsf: vi.fn(),
  fetchWsfArray: vi.fn(),
}));

// Mock the date utilities
vi.mock("@/shared/fetching/dateUtils", () => ({
  parseWsfDate: vi.fn((dateString: string) => new Date(dateString)),
}));

describe("WSF Fares API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Cache and Date Functions", () => {
    describe("getFaresCacheFlushDate", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresCacheFlushDate).toBe("function");
        expect(getFaresCacheFlushDate).toHaveLength(0);
      });

      it("should fetch cache flush date successfully", async () => {
        const { fetchWsf } = await import("@/shared/fetching/fetch");
        const { parseWsfDate } = await import("@/shared/fetching/dateUtils");
        const mockFetchWsf = vi.mocked(fetchWsf);
        const mockParseWsfDate = vi.mocked(parseWsfDate);

        const mockDateString = "/Date(1752203400000-0700)/";
        const mockDate = new Date("2025-01-10T12:30:00.000Z");

        mockFetchWsf.mockResolvedValue(mockDateString);
        mockParseWsfDate.mockReturnValue(mockDate);

        const result = await getFaresCacheFlushDate();

        expect(result).toEqual(mockDate);
        expect(mockFetchWsf).toHaveBeenCalledWith("fares", "/cacheflushdate");
        expect(mockParseWsfDate).toHaveBeenCalledWith(mockDateString);
      });

      it("should handle errors", async () => {
        const { fetchWsf } = await import("@/shared/fetching/fetch");
        const mockFetchWsf = vi.mocked(fetchWsf);

        const mockError = new Error("Network error");
        mockFetchWsf.mockRejectedValue(mockError);

        await expect(getFaresCacheFlushDate()).rejects.toThrow("Network error");
      });
    });

    describe("getFaresValidDateRange", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresValidDateRange).toBe("function");
        expect(getFaresValidDateRange).toHaveLength(0);
      });

      it("should fetch valid date range successfully", async () => {
        const { fetchWsf } = await import("@/shared/fetching/fetch");
        const { parseWsfDate } = await import("@/shared/fetching/dateUtils");
        const mockFetchWsf = vi.mocked(fetchWsf);
        const mockParseWsfDate = vi.mocked(parseWsfDate);

        const mockResponse = {
          DateFrom: "/Date(1752203400000-0700)/",
          DateThru: "/Date(1752289800000-0700)/",
        };
        const mockDateFrom = new Date("2025-01-10T12:30:00.000Z");
        const mockDateThru = new Date("2025-01-11T12:30:00.000Z");

        mockFetchWsf.mockResolvedValue(mockResponse);
        mockParseWsfDate
          .mockReturnValueOnce(mockDateFrom)
          .mockReturnValueOnce(mockDateThru);

        const result = await getFaresValidDateRange();

        expect(result).toEqual({
          DateFrom: mockDateFrom,
          DateThru: mockDateThru,
        });
        expect(mockFetchWsf).toHaveBeenCalledWith("fares", "/validdaterange");
        expect(mockParseWsfDate).toHaveBeenCalledWith(mockResponse.DateFrom);
        expect(mockParseWsfDate).toHaveBeenCalledWith(mockResponse.DateThru);
      });
    });
  });

  describe("Terminal Functions", () => {
    describe("getFaresTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresTerminals).toBe("function");
        expect(getFaresTerminals).toHaveLength(1);
      });

      it("should fetch terminals for a trip date successfully", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

        mockFetchWsfArray.mockResolvedValue(mockTerminals);

        const result = await getFaresTerminals(tripDate);

        expect(result).toEqual(mockTerminals);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/terminals/2025-01-10"
        );
      });

      it("should format date correctly", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const tripDate = new Date("2025-12-25T15:30:45.123Z");
        mockFetchWsfArray.mockResolvedValue([]);

        await getFaresTerminals(tripDate);

        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/terminals/2025-12-25"
        );
      });
    });

    describe("getFaresTerminalMates", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresTerminalMates).toBe("function");
        expect(getFaresTerminalMates).toHaveLength(2);
      });

      it("should fetch terminal mates successfully", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const tripDate = new Date("2025-01-10");
        const terminalID = 1;
        const mockTerminalMates = [
          {
            TerminalID: 2,
            Description: "Friday Harbor",
          },
          {
            TerminalID: 3,
            Description: "Orcas Island",
          },
        ];

        mockFetchWsfArray.mockResolvedValue(mockTerminalMates);

        const result = await getFaresTerminalMates(tripDate, terminalID);

        expect(result).toEqual(mockTerminalMates);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/terminalmates/2025-01-10/1"
        );
      });
    });

    describe("getTerminalCombo", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalCombo).toBe("function");
        expect(getTerminalCombo).toHaveLength(3);
      });

      it("should fetch terminal combo successfully", async () => {
        const { fetchWsf } = await import("@/shared/fetching/fetch");
        const mockFetchWsf = vi.mocked(fetchWsf);

        const tripDate = new Date("2025-01-10");
        const departingTerminalID = 1;
        const arrivingTerminalID = 2;
        const mockTerminalCombo = {
          DepartingDescription: "Anacortes",
          ArrivingDescription: "Friday Harbor",
          CollectionDescription: "Standard fare collection",
        };

        mockFetchWsf.mockResolvedValue(mockTerminalCombo);

        const result = await getTerminalCombo(
          tripDate,
          departingTerminalID,
          arrivingTerminalID
        );

        expect(result).toEqual(mockTerminalCombo);
        expect(mockFetchWsf).toHaveBeenCalledWith(
          "fares",
          "/terminalcombo/2025-01-10/1/2"
        );
      });
    });

    describe("getTerminalComboVerbose", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalComboVerbose).toBe("function");
        expect(getTerminalComboVerbose).toHaveLength(1);
      });

      it("should fetch terminal combo verbose successfully", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

        mockFetchWsfArray.mockResolvedValue(mockTerminalComboVerbose);

        const result = await getTerminalComboVerbose(tripDate);

        expect(result).toEqual(mockTerminalComboVerbose);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/terminalcomboverbose/2025-01-10"
        );
      });
    });
  });

  describe("Fare Line Item Functions", () => {
    describe("getFareLineItemsBasic", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareLineItemsBasic).toBe("function");
        expect(getFareLineItemsBasic).toHaveLength(4);
      });

      it("should fetch basic fare line items successfully", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

        mockFetchWsfArray.mockResolvedValue(mockFareLineItems);

        const result = await getFareLineItemsBasic(
          tripDate,
          departingTerminalID,
          arrivingTerminalID,
          roundTrip
        );

        expect(result).toEqual(mockFareLineItems);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/farelineitemsbasic/2025-01-10/1/2/false"
        );
      });

      it("should handle round trip parameter correctly", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const tripDate = new Date("2025-01-10");
        const departingTerminalID = 1;
        const arrivingTerminalID = 2;
        const roundTrip = true;
        mockFetchWsfArray.mockResolvedValue([]);

        await getFareLineItemsBasic(
          tripDate,
          departingTerminalID,
          arrivingTerminalID,
          roundTrip
        );

        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/farelineitemsbasic/2025-01-10/1/2/true"
        );
      });
    });

    describe("getFareLineItems", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareLineItems).toBe("function");
        expect(getFareLineItems).toHaveLength(4);
      });

      it("should fetch all fare line items successfully", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

        mockFetchWsfArray.mockResolvedValue(mockFareLineItems);

        const result = await getFareLineItems(
          tripDate,
          departingTerminalID,
          arrivingTerminalID,
          roundTrip
        );

        expect(result).toEqual(mockFareLineItems);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/farelineitems/2025-01-10/1/2/false"
        );
      });
    });

    describe("getFareLineItemsVerbose", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareLineItemsVerbose).toBe("function");
        expect(getFareLineItemsVerbose).toHaveLength(1);
      });

      it("should fetch verbose fare line items successfully", async () => {
        const { fetchWsf } = await import("@/shared/fetching/fetch");
        const mockFetchWsf = vi.mocked(fetchWsf);

        const tripDate = new Date("2025-01-10");
        const mockFareLineItemsVerbose = {
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
        };

        mockFetchWsf.mockResolvedValue(mockFareLineItemsVerbose);

        const result = await getFareLineItemsVerbose(tripDate);

        expect(result).toEqual(mockFareLineItemsVerbose);
        expect(mockFetchWsf).toHaveBeenCalledWith(
          "fares",
          "/farelineitemsverbose/2025-01-10"
        );
      });
    });
  });

  describe("Fare Total Functions", () => {
    describe("getFareTotals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareTotals).toBe("function");
        expect(getFareTotals).toHaveLength(1);
      });

      it("should calculate fare totals successfully", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

        mockFetchWsfArray.mockResolvedValue(mockFareTotals);

        const result = await getFareTotals(request);

        expect(result).toEqual(mockFareTotals);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/faretotals/2025-01-10/1/2/false/1,2/2,1"
        );
      });

      it("should handle multiple fare line items and quantities", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const request = {
          tripDate: new Date("2025-01-10"),
          departingTerminalID: 1,
          arrivingTerminalID: 2,
          roundTrip: true,
          fareLineItemIDs: [1, 2, 3],
          quantities: [1, 2, 1],
        };
        mockFetchWsfArray.mockResolvedValue([]);

        await getFareTotals(request);

        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/faretotals/2025-01-10/1/2/true/1,2,3/1,2,1"
        );
      });
    });
  });

  describe("Convenience Functions", () => {
    describe("getFareLineItemsWithParams", () => {
      it("should call getFareLineItems with correct parameters", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const params = {
          tripDate: new Date("2025-01-10"),
          departingTerminalID: 1,
          arrivingTerminalID: 2,
          roundTrip: false,
        };
        const mockResult = [
          {
            FareLineItemID: 1,
            FareLineItem: "Test",
            Category: "Test",
            DirectionIndependent: true,
            Amount: 10,
          },
        ];
        mockFetchWsfArray.mockResolvedValue(mockResult);

        const result = await getFareLineItemsWithParams(params);

        expect(result).toEqual(mockResult);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/farelineitems/2025-01-10/1/2/false"
        );
      });
    });

    describe("getFareLineItemsBasicWithParams", () => {
      it("should call getFareLineItemsBasic with correct parameters", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const params = {
          tripDate: new Date("2025-01-10"),
          departingTerminalID: 1,
          arrivingTerminalID: 2,
          roundTrip: true,
        };
        const mockResult = [
          {
            FareLineItemID: 1,
            FareLineItem: "Test",
            Category: "Test",
            DirectionIndependent: true,
            Amount: 10,
          },
        ];
        mockFetchWsfArray.mockResolvedValue(mockResult);

        const result = await getFareLineItemsBasicWithParams(params);

        expect(result).toEqual(mockResult);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/farelineitemsbasic/2025-01-10/1/2/true"
        );
      });
    });

    describe("getTerminalMatesWithParams", () => {
      it("should call getFaresTerminalMates with correct parameters", async () => {
        const { fetchWsfArray } = await import("@/shared/fetching/fetch");
        const mockFetchWsfArray = vi.mocked(fetchWsfArray);

        const params = {
          tripDate: new Date("2025-01-10"),
          terminalID: 1,
        };
        const mockResult = [{ TerminalID: 2, Description: "Test Terminal" }];
        mockFetchWsfArray.mockResolvedValue(mockResult);

        const result = await getTerminalMatesWithParams(params);

        expect(result).toEqual(mockResult);
        expect(mockFetchWsfArray).toHaveBeenCalledWith(
          "fares",
          "/terminalmates/2025-01-10/1"
        );
      });
    });

    describe("getTerminalComboWithParams", () => {
      it("should call getTerminalCombo with correct parameters", async () => {
        const { fetchWsf } = await import("@/shared/fetching/fetch");
        const mockFetchWsf = vi.mocked(fetchWsf);

        const params = {
          tripDate: new Date("2025-01-10"),
          departingTerminalID: 1,
          arrivingTerminalID: 2,
        };
        const mockResult = {
          DepartingDescription: "Test",
          ArrivingDescription: "Test",
          CollectionDescription: "Test",
        };
        mockFetchWsf.mockResolvedValue(mockResult);

        const result = await getTerminalComboWithParams(params);

        expect(result).toEqual(mockResult);
        expect(mockFetchWsf).toHaveBeenCalledWith(
          "fares",
          "/terminalcombo/2025-01-10/1/2"
        );
      });
    });
  });
});
