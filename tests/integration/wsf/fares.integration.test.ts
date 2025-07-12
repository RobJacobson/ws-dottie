// WSF Fares API Integration Tests
// Tests the actual WSF Fares API endpoints with real data

import { beforeAll, describe, expect, it } from "vitest";

import {
  getFareLineItems,
  getFaresCacheFlushDate,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
} from "@/api/wsf/fares";

describe("WSF Fares API Integration", () => {
  describe("Cache Flush Date", () => {
    it("should fetch cache flush date from real WSF API", async () => {
      const data = await getFaresCacheFlushDate();
      expect(data).toBeDefined();
      expect(data).toBeInstanceOf(Date);
    });
  });

  describe("Valid Date Range", () => {
    it("should fetch valid date range from real WSF API", async () => {
      const data = await getFaresValidDateRange();
      expect(data).toBeDefined();
      expect(data).toHaveProperty("DateFrom");
      expect(data).toHaveProperty("DateThru");
      expect(data.DateFrom).toBeInstanceOf(Date);
      expect(data.DateThru).toBeInstanceOf(Date);
    });
  });

  describe("Terminals", () => {
    it("should fetch terminals for a valid trip date", async () => {
      // Use a date within the valid range (we'll get this from validDateRange)
      const validDateRange = await getFaresValidDateRange();
      const testDate = new Date(validDateRange.DateFrom);

      const data = await getFaresTerminals(testDate);
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Log the actual structure to see what properties we have
      console.log("First terminal object:", JSON.stringify(data[0], null, 2));
      console.log("First terminal keys:", Object.keys(data[0]));

      // Validate first terminal - use the actual property names from API
      const firstTerminal = data[0];
      expect(firstTerminal).toHaveProperty("TerminalID");
      expect(firstTerminal).toHaveProperty("Description");
      expect(typeof firstTerminal.TerminalID).toBe("number");
      expect(typeof firstTerminal.Description).toBe("string");
    });
  });

  describe("Terminal Mates", () => {
    it("should fetch terminal mates for a valid terminal", async () => {
      // Get valid date range and terminals first
      const validDateRange = await getFaresValidDateRange();
      const testDate = new Date(validDateRange.DateFrom);
      const terminals = await getFaresTerminals(testDate);
      const testTerminalID = terminals[0].TerminalID;

      const data = await getFaresTerminalMates(testDate, testTerminalID);
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // Terminal mates might be empty for some terminals, so we just check the structure
      if (data.length > 0) {
        // Log the actual structure to see what properties we have
        console.log(
          "First terminal mate object:",
          JSON.stringify(data[0], null, 2)
        );
        console.log("First terminal mate keys:", Object.keys(data[0]));

        const firstMate = data[0];
        expect(firstMate).toHaveProperty("TerminalID");
        expect(firstMate).toHaveProperty("Description");
        expect(typeof firstMate.TerminalID).toBe("number");
        expect(typeof firstMate.Description).toBe("string");
      }
    });
  });

  describe("Fare Line Items", () => {
    it("should fetch fare line items for a valid route", async () => {
      // Get valid date range, terminals, and terminal mates
      const validDateRange = await getFaresValidDateRange();
      const testDate = new Date(validDateRange.DateFrom);
      const terminals = await getFaresTerminals(testDate);
      const departingTerminalID = terminals[0].TerminalID;

      const terminalMates = await getFaresTerminalMates(
        testDate,
        departingTerminalID
      );
      const arrivingTerminalID =
        terminalMates.length > 0
          ? terminalMates[0].TerminalID
          : terminals[1].TerminalID;

      const data = await getFareLineItems(
        testDate,
        departingTerminalID,
        arrivingTerminalID,
        false
      );
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first fare line item
      const firstFare = data[0];
      expect(firstFare).toHaveProperty("FareLineItemID");
      expect(firstFare).toHaveProperty("FareLineItem");
      expect(firstFare).toHaveProperty("Category");
      expect(firstFare).toHaveProperty("DirectionIndependent");
      expect(firstFare).toHaveProperty("Amount");
      expect(typeof firstFare.FareLineItemID).toBe("number");
      expect(typeof firstFare.FareLineItem).toBe("string");
      expect(typeof firstFare.Category).toBe("string");
      expect(typeof firstFare.DirectionIndependent).toBe("boolean");
      expect(typeof firstFare.Amount).toBe("number");
    });
  });
});
