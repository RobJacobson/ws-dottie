import { beforeAll, describe, expect, it } from "vitest";

import {
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsVerbose,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotals,
} from "@/api/wsf-fares";

import {
  delay,
  INVALID_TERMINAL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  VALID_TERMINAL_PAIR_1,
  VALID_TERMINAL_PAIR_2,
  validateApiError,
  validateFareLineItem,
  validateFareLineItemBasic,
  validateFareLineItemsVerboseResponse,
  validateFareLineItemVerbose,
  validateFareTotal,
} from "../utils";

describe("Fares Fare Line Items E2E Tests", () => {
  // Use a valid trip date for testing - will be set dynamically
  let testTripDate: Date;
  let testDepartingTerminalID: number;
  let testArrivingTerminalID: number;

  beforeAll(async () => {
    // Get a valid date from the API
    const validDateRange = await getFaresValidDateRange();
    testTripDate = new Date(validDateRange.DateFrom);

    // Use known valid terminal pair
    testDepartingTerminalID = VALID_TERMINAL_PAIR_1.departing;
    testArrivingTerminalID = VALID_TERMINAL_PAIR_1.arriving;
  });

  describe("getFareLineItemsBasic", () => {
    it("should fetch basic fare line items for valid route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false // one-way
        )
      );

      // Performance tracking
      trackPerformance("getFareLineItemsBasic", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first fare line item
      if (data.length > 0) {
        validateFareLineItemBasic(data[0]);
        console.log("First basic fare line item:", data[0]);
        console.log("First basic fare line item keys:", Object.keys(data[0]));
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );

      // Track performance
      trackPerformance("getFareLineItemsBasic (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle round trip parameter", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          true // round trip
        )
      );

      trackPerformance("getFareLineItemsBasic (round trip)", duration);

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateFareLineItemBasic(data[0]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle different trip dates", async () => {
      // Use a different valid date from the range
      const validDateRange = await getFaresValidDateRange();
      const futureDate = new Date(validDateRange.DateThru);
      const { data, duration } = await measureApiCall(() =>
        getFareLineItemsBasic(
          futureDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );

      trackPerformance("getFareLineItemsBasic (future date)", duration);

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateFareLineItemBasic(data[0]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getFareLineItems", () => {
    it("should fetch all fare line items for valid route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFareLineItems(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false // one-way
        )
      );

      // Performance tracking
      trackPerformance("getFareLineItems", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first fare line item
      if (data.length > 0) {
        validateFareLineItem(data[0]);
        console.log("First fare line item:", data[0]);
        console.log("First fare line item keys:", Object.keys(data[0]));
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getFareLineItems(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );

      // Track performance
      trackPerformance("getFareLineItems (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle round trip parameter", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFareLineItems(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          true // round trip
        )
      );

      trackPerformance("getFareLineItems (round trip)", duration);

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateFareLineItem(data[0]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getFareLineItemsVerbose", () => {
    it("should fetch verbose fare line items successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFareLineItemsVerbose(testTripDate)
      );

      // Performance tracking
      trackPerformance("getFareLineItemsVerbose", duration);

      // Validate response
      expect(data).toBeDefined();
      console.log("getFareLineItemsVerbose response type:", typeof data);
      console.log("getFareLineItemsVerbose response keys:", Object.keys(data));
      console.log(
        "getFareLineItemsVerbose response:",
        JSON.stringify(data, null, 2)
      );
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Debug: Log the actual response structure
      console.log("Response type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      console.log("Response keys:", Object.keys(data));
      console.log(
        "Response structure:",
        `${JSON.stringify(data).substring(0, 500)}...`
      );

      // Validate the complex response structure
      validateFareLineItemsVerboseResponse(data);

      // Log first terminal combo if available
      if (data.TerminalComboVerbose.length > 0) {
        console.log("First terminal combo:", data.TerminalComboVerbose[0]);
        console.log(
          "First terminal combo keys:",
          Object.keys(data.TerminalComboVerbose[0])
        );
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getFareLineItemsVerbose(testTripDate)
      );

      // Track performance
      trackPerformance("getFareLineItemsVerbose (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle different trip dates", async () => {
      // Use a different valid date from the range
      const validDateRange = await getFaresValidDateRange();
      const futureDate = new Date(validDateRange.DateThru);
      const { data, duration } = await measureApiCall(() =>
        getFareLineItemsVerbose(futureDate)
      );

      trackPerformance("getFareLineItemsVerbose (future date)", duration);

      expect(data).toBeDefined();
      expect(typeof data).toBe("object");

      // Validate the complex response structure
      validateFareLineItemsVerboseResponse(data);

      if (data.TerminalComboVerbose.length > 0) {
        console.log(
          "First terminal combo (future date):",
          data.TerminalComboVerbose[0]
        );
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getFareTotals", () => {
    it("should calculate fare totals for valid request successfully", async () => {
      // First get fare line items to find valid IDs
      const { data: fareLineItems } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );
      await delay(RATE_LIMIT_DELAY);

      if (!fareLineItems || fareLineItems.length === 0) {
        console.warn("No fare line items available for testing fare totals");
        return;
      }

      // Use first two fare line items for testing
      const fareLineItemIDs = [
        fareLineItems[0].FareLineItemID,
        fareLineItems[Math.min(1, fareLineItems.length - 1)].FareLineItemID,
      ];
      const quantities = [2, 1]; // 2 of first item, 1 of second item

      const { data, duration } = await measureApiCall(() =>
        getFareTotals(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false,
          fareLineItemIDs,
          quantities
        )
      );

      // Performance tracking
      trackPerformance("getFareTotals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // Validate first fare total if available
      if (data.length > 0) {
        validateFareTotal(data[0]);
        console.log("First fare total:", data[0]);
        console.log("First fare total keys:", Object.keys(data[0]));
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      // Get fare line items first
      const { data: fareLineItems } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );
      await delay(RATE_LIMIT_DELAY);

      if (!fareLineItems || fareLineItems.length === 0) {
        console.warn("No fare line items available for performance testing");
        return;
      }

      const fareLineItemIDs = [fareLineItems[0].FareLineItemID];
      const quantities = [1];

      const { duration } = await measureApiCall(() =>
        getFareTotals(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false,
          fareLineItemIDs,
          quantities
        )
      );

      // Track performance
      trackPerformance("getFareTotals (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle round trip calculations", async () => {
      // Get fare line items first
      const { data: fareLineItems } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          true // round trip
        )
      );
      await delay(RATE_LIMIT_DELAY);

      if (!fareLineItems || fareLineItems.length === 0) {
        console.warn("No fare line items available for round trip testing");
        return;
      }

      const fareLineItemIDs = [fareLineItems[0].FareLineItemID];
      const quantities = [1];

      const { data, duration } = await measureApiCall(() =>
        getFareTotals(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          true,
          fareLineItemIDs,
          quantities
        )
      );

      trackPerformance("getFareTotals (round trip)", duration);

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateFareTotal(data[0]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent fare line item data across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );

      // Both calls should return arrays
      if (firstCall && secondCall) {
        expect(Array.isArray(firstCall)).toBe(true);
        expect(Array.isArray(secondCall)).toBe(true);

        // Should have same number of fare line items
        expect(firstCall.length).toBe(secondCall.length);

        // First fare line item should be the same
        if (firstCall.length > 0 && secondCall.length > 0) {
          expect(firstCall[0].FareLineItemID).toBe(
            secondCall[0].FareLineItemID
          );
          expect(firstCall[0].FareLineItem).toBe(secondCall[0].FareLineItem);
        }
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid fare line item IDs", async () => {
      const { data } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );

      if (data && data.length > 0) {
        // All fare line items should have valid IDs
        data.forEach((item) => {
          expect(item.FareLineItemID).toBeGreaterThan(0);
          expect(typeof item.FareLineItemID).toBe("number");
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid fare amounts", async () => {
      const { data } = await measureApiCall(() =>
        getFareLineItemsBasic(
          testTripDate,
          testDepartingTerminalID,
          testArrivingTerminalID,
          false
        )
      );

      if (data && data.length > 0) {
        // All fare amounts should be non-negative
        data.forEach((item) => {
          expect(item.Amount).toBeGreaterThanOrEqual(0);
          expect(typeof item.Amount).toBe("number");
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle invalid terminal combinations gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getFareLineItemsBasic(
            testTripDate,
            INVALID_TERMINAL_ID,
            INVALID_TERMINAL_ID,
            false
          )
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(10000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdApiError for invalid terminal combination
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid fare line item IDs gracefully", async () => {
      const invalidFareLineItemIDs = [99999, 99998];
      const quantities = [1, 1];

      try {
        const { data, duration } = await measureApiCall(() =>
          getFareTotals(
            testTripDate,
            testDepartingTerminalID,
            testArrivingTerminalID,
            false,
            invalidFareLineItemIDs,
            quantities
          )
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(10000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdApiError for invalid fare line item IDs
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle mismatched fare line item IDs and quantities", async () => {
      const fareLineItemIDs = [1, 2];
      const quantities = [1]; // Mismatched lengths

      try {
        const { data, duration } = await measureApiCall(() =>
          getFareTotals(
            testTripDate,
            testDepartingTerminalID,
            testArrivingTerminalID,
            false,
            fareLineItemIDs,
            quantities
          )
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(10000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdApiError for mismatched arrays
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
