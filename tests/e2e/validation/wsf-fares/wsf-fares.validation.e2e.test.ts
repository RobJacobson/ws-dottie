import { describe, expect, it } from "vitest";

import {
  getFareLineItemsBasic,
  getFaresCacheFlushDate,
  getFaresTerminals,
  getFaresValidDateRange,
} from "@/api/wsf-fares";

import { validators } from "./validator";

describe("WSF Fares API - Zod Validation", () => {
  it("should validate cache flush date using Zod", async () => {
    console.log("🚀 Testing WSF Fares API validation...");
    const cacheFlushDate = await getFaresCacheFlushDate();
    const validatedData =
      validators.faresCacheFlushDate.validateSafe(cacheFlushDate);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(
        `Cache flush date validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`
      );
    }
    expect(validatedData.data).toBeInstanceOf(Date);
    console.log("✅ Successfully validated cache flush date");
  });

  it("should validate valid date range using Zod", async () => {
    const dateRange = await getFaresValidDateRange();
    const validatedData =
      validators.faresValidDateRange.validateSafe(dateRange);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(
        `Valid date range validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`
      );
    }
    expect(validatedData.data.DateFrom).toBeInstanceOf(Date);
    expect(validatedData.data.DateThru).toBeInstanceOf(Date);
    console.log("✅ Successfully validated valid date range");
  });

  it("should validate terminals data using Zod", async () => {
    const dateRange = await getFaresValidDateRange();
    const terminals = await getFaresTerminals({ tripDate: dateRange.DateFrom });
    const validatedData =
      validators.faresTerminalsArray.validateSafe(terminals);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(
        `Terminals validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`
      );
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(
      `✅ Successfully validated ${validatedData.data.length} terminals`
    );
  });

  it("should validate individual terminal data", async () => {
    const dateRange = await getFaresValidDateRange();
    const terminals = await getFaresTerminals({ tripDate: dateRange.DateFrom });
    if (terminals.length > 0) {
      const firstTerminal = terminals[0];
      const validatedTerminal =
        validators.faresTerminal.validateSafe(firstTerminal);
      if (!validatedTerminal.success) {
        console.error(
          "Individual validation failed:",
          validatedTerminal.error.errors
        );
        throw new Error(
          `Individual terminal validation failed: ${JSON.stringify(validatedTerminal.error.errors, null, 2)}`
        );
      }
      expect(validatedTerminal.data.TerminalID).toBeDefined();
      expect(typeof validatedTerminal.data.TerminalID).toBe("number");
      expect(validatedTerminal.data.Description).toBeDefined();
      expect(typeof validatedTerminal.data.Description).toBe("string");
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
    const validatedData =
      validators.fareLineItemsBasicArray.validateSafe(fareLineItems);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(
        `Fare line items basic validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`
      );
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    console.log(
      `✅ Successfully validated ${validatedData.data.length} fare line items basic`
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
      const validatedFareLineItem =
        validators.fareLineItemBasic.validateSafe(firstFareLineItem);
      if (!validatedFareLineItem.success) {
        console.error(
          "Individual validation failed:",
          validatedFareLineItem.error.errors
        );
        throw new Error(
          `Individual fare line item validation failed: ${JSON.stringify(validatedFareLineItem.error.errors, null, 2)}`
        );
      }
      expect(validatedFareLineItem.data.FareLineItemID).toBeDefined();
      expect(typeof validatedFareLineItem.data.FareLineItemID).toBe("number");
      expect(validatedFareLineItem.data.FareLineItem).toBeDefined();
      expect(typeof validatedFareLineItem.data.FareLineItem).toBe("string");
      expect(validatedFareLineItem.data.Category).toBeDefined();
      expect(typeof validatedFareLineItem.data.Category).toBe("string");
      expect(typeof validatedFareLineItem.data.DirectionIndependent).toBe(
        "boolean"
      );
      expect(typeof validatedFareLineItem.data.Amount).toBe("number");
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        TerminalID: "not a number",
        Description: 123,
      },
    ];
    const result = validators.faresTerminalsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed WSF fares",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const dateRange = await getFaresValidDateRange();
    const terminals = await getFaresTerminals({ tripDate: dateRange.DateFrom });
    const validatedData =
      validators.faresTerminalsArray.validateSafe(terminals);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstTerminal = validatedData.data[0];
    expect(firstTerminal.TerminalID).toBeDefined();
    expect(firstTerminal.Description).toBeDefined();
    expect(typeof firstTerminal.TerminalID).toBe("number");
    expect(typeof firstTerminal.Description).toBe("string");
    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ WSF Fares API validation tests completed");
});
