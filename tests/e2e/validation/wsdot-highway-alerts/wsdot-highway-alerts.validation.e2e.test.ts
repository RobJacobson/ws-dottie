import { describe, expect, it } from "vitest";
import { getHighwayAlerts } from "@/api/wsdot-highway-alerts";
import { validators } from "./validator";

describe("WSDOT Highway Alerts API - Zod Validation", () => {
  it("should validate highway alerts data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Highway Alerts API validation...");
    const alerts = await getHighwayAlerts();
    const validatedData = validators.highwayAlertsArray.validateSafe(alerts);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Highway alerts validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} highway alerts`);
  });

  it("should validate individual highway alert data", async () => {
    const alerts = await getHighwayAlerts();
    if (alerts.length > 0) {
      const firstAlert = alerts[0];
      const validatedAlert = validators.highwayAlert.validateSafe(firstAlert);
      if (!validatedAlert.success) {
        console.error("Individual validation failed:", validatedAlert.error.errors);
        throw new Error(`Individual alert validation failed: ${JSON.stringify(validatedAlert.error.errors, null, 2)}`);
      }
      expect(validatedAlert.data.AlertID).toBeDefined();
      expect(typeof validatedAlert.data.AlertID).toBe("number");
      expect(validatedAlert.data.HeadlineDescription).toBeDefined();
      expect(typeof validatedAlert.data.HeadlineDescription).toBe("string");
      expect(validatedAlert.data.LastUpdatedTime).toBeInstanceOf(Date);
      expect(validatedAlert.data.StartTime).toBeInstanceOf(Date);
      if (validatedAlert.data.EndTime !== null) {
        expect(validatedAlert.data.EndTime).toBeInstanceOf(Date);
      }
      expect(typeof validatedAlert.data.EventCategory).toBe("string");
      expect(typeof validatedAlert.data.EventStatus).toBe("string");
      expect(typeof validatedAlert.data.Priority).toBe("string");
      expect(typeof validatedAlert.data.Region).toBe("string");
      expect(typeof validatedAlert.data.ExtendedDescription).toBe("string");
      expect(typeof validatedAlert.data.County === "string" || validatedAlert.data.County === null).toBe(true);
    }
  });

  it("should validate roadway location data correctly", async () => {
    const alerts = await getHighwayAlerts();
    if (alerts.length > 0) {
      const firstAlert = alerts[0];
      const validatedAlert = validators.highwayAlert.validateSafe(firstAlert);
      if (validatedAlert.success) {
        expect(typeof validatedAlert.data.StartRoadwayLocation.RoadName).toBe("string");
        expect(typeof validatedAlert.data.EndRoadwayLocation.RoadName).toBe("string");
        expect(typeof validatedAlert.data.StartRoadwayLocation.Latitude).toBe("number");
        expect(typeof validatedAlert.data.EndRoadwayLocation.Latitude).toBe("number");
      }
    }
  });

  it("should handle nullable fields correctly", async () => {
    const alerts = await getHighwayAlerts();
    for (const alert of alerts) {
      const validatedAlert = validators.highwayAlert.validateSafe(alert);
      if (!validatedAlert.success) {
        console.error("Nullable validation failed:", validatedAlert.error.errors);
        throw new Error(`Nullable field validation failed: ${JSON.stringify(validatedAlert.error.errors, null, 2)}`);
      }
      if (validatedAlert.data.County !== null) {
        expect(typeof validatedAlert.data.County).toBe("string");
      }
      if (validatedAlert.data.EndTime !== null) {
        expect(validatedAlert.data.EndTime).toBeInstanceOf(Date);
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        AlertID: "not a number",
        County: 123,
        EndRoadwayLocation: "not an object",
        EndTime: "not a date",
        EventCategory: 456,
        EventStatus: 789,
        ExtendedDescription: 101,
        HeadlineDescription: 112,
        LastUpdatedTime: "not a date",
        Priority: 131,
        Region: 415,
        StartRoadwayLocation: "not an object",
        StartTime: "not a date",
      },
    ];
    const result = validators.highwayAlertsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed highway alerts",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const alerts = await getHighwayAlerts();
    const validatedData = validators.highwayAlertsArray.validateSafe(alerts);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstAlert = validatedData.data[0];
    expect(firstAlert.AlertID).toBeDefined();
    expect(firstAlert.HeadlineDescription).toBeDefined();
    expect(firstAlert.LastUpdatedTime).toBeInstanceOf(Date);
    expect(firstAlert.StartTime).toBeInstanceOf(Date);
    expect(typeof firstAlert.EventCategory).toBe("string");
    expect(typeof firstAlert.EventStatus).toBe("string");
    expect(typeof firstAlert.Priority).toBe("string");
    expect(typeof firstAlert.Region).toBe("string");
    expect(typeof firstAlert.ExtendedDescription).toBe("string");
    expect(typeof firstAlert.County === "string" || firstAlert.County === null).toBe(true);
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Highway Alerts API validation tests completed");
}); 