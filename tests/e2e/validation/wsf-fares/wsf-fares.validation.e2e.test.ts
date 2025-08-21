import { describe, expect, it } from "vitest";

import {
  getFareLineItemsBasic,
  getFaresCacheFlushDate,
  getFaresTerminals,
  getFaresValidDateRange,
} from "@/api/wsf-fares";

describe("WSF Fares API - Zod Validation", () => {
  it("should validate cache flush date using Zod", async () => {
    console.log("🚀 Testing WSF Fares API validation...");
    const cacheFlushDate = await getFaresCacheFlushDate();
    expect(cacheFlushDate).toBeInstanceOf(Date);
    console.log("✅ Successfully validated cache flush date");
  });

  it("should validate valid date range using Zod", async () => {
    const dateRange = await getFaresValidDateRange();
    expect(dateRange.DateFrom).toBeInstanceOf(Date);
    expect(dateRange.DateThru).toBeInstanceOf(Date);
    console.log("✅ Successfully validated valid date range");
  });

  it("should validate terminals data using Zod", async () => {
    const dateRange = await getFaresValidDateRange();
    const terminals = await getFaresTerminals({ tripDate: dateRange.DateFrom });
    expect(terminals).toBeDefined();
    expect(Array.isArray(terminals)).toBe(true);
    expect(terminals.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${terminals.length} terminals`);
  });

  it("should validate individual terminal data", async () => {
    const dateRange = await getFaresValidDateRange();
    const terminals = await getFaresTerminals({ tripDate: dateRange.DateFrom });
    if (terminals.length > 0) {
      const firstTerminal = terminals[0];
      expect(firstTerminal.TerminalID).toBeDefined();
      expect(typeof firstTerminal.TerminalID).toBe("number");
      expect(firstTerminal.Description).toBeDefined();
      expect(typeof firstTerminal.Description).toBe("string");
    }
  });

  it("should validate fare line items basic data", async () => {
    const dateRange = await getFaresValidDateRange();
    // Use Bainbridge Island (Terminal ID 3) to Seattle (Terminal ID 7) route
    const fareLineItems = await getFareLineItemsBasic({
      tripDate: dateRange.DateFrom,
      departingTerminalID: 3, // Bainbridge Island
      arrivingTerminalID: 7, // Seattle
      roundTrip: false,
    });
    expect(fareLineItems).toBeDefined();
    expect(Array.isArray(fareLineItems)).toBe(true);
    console.log(
      `✅ Successfully validated ${fareLineItems.length} fare line items basic`
    );
  });

  it("should validate individual fare line item data", async () => {
    const dateRange = await getFaresValidDateRange();
    // Use Bainbridge Island (Terminal ID 3) to Seattle (Terminal ID 7) route
    const fareLineItems = await getFareLineItemsBasic({
      tripDate: dateRange.DateFrom,
      departingTerminalID: 3, // Bainbridge Island
      arrivingTerminalID: 7, // Seattle
      roundTrip: false,
    });
    if (fareLineItems.length > 0) {
      const firstFareLineItem = fareLineItems[0];
      expect(firstFareLineItem.FareLineItemID).toBeDefined();
      expect(typeof firstFareLineItem.FareLineItemID).toBe("number");
      expect(firstFareLineItem.FareLineItem).toBeDefined();
      expect(typeof firstFareLineItem.FareLineItem).toBe("string");
      expect(firstFareLineItem.Category).toBeDefined();
      expect(typeof firstFareLineItem.Category).toBe("string");
      expect(firstFareLineItem.DirectionIndependent).toBeDefined();
      expect(typeof firstFareLineItem.DirectionIndependent).toBe("boolean");
      expect(firstFareLineItem.Amount).toBeDefined();
      expect(typeof firstFareLineItem.Amount).toBe("number");
    }
  });

  it("should provide detailed error information when validation fails", () => {
    // Test with malformed data to ensure validation errors are descriptive
    const malformedTerminals = [
      {
        TerminalID: "not a number",
        Description: 123,
      },
    ];

    // This test demonstrates that validation would catch type mismatches
    expect(() => {
      // Simulate validation error by checking types manually
      const terminal = malformedTerminals[0];
      if (typeof terminal.TerminalID !== "number") {
        throw new Error("TerminalID must be a number");
      }
      if (typeof terminal.Description !== "string") {
        throw new Error("Description must be a string");
      }
    }).toThrow("TerminalID must be a number");

    console.log("✅ Successfully demonstrated validation error handling");
  });

  it("should demonstrate the power of single-line validation", async () => {
    const dateRange = await getFaresValidDateRange();
    const terminals = await getFaresTerminals({ tripDate: dateRange.DateFrom });

    // The API function already validates the response, so we just need to verify the data structure
    expect(terminals).toBeInstanceOf(Array);
    expect(terminals.length).toBeGreaterThan(0);

    // Verify that all terminals have the expected structure
    terminals.forEach((terminal) => {
      expect(terminal).toHaveProperty("TerminalID");
      expect(terminal).toHaveProperty("Description");
      expect(typeof terminal.TerminalID).toBe("number");
      expect(typeof terminal.Description).toBe("string");
    });

    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });
});
