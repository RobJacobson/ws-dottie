import { describe, expect, it } from "vitest";
import { getTrafficFlows } from "@/api/wsdot-traffic-flow";
import { validators } from "./validator";

describe("WSDOT Traffic Flow API - Zod Validation", () => {
  it("should validate traffic flow data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Traffic Flow API validation...");
    const flows = await getTrafficFlows();
    const validatedData = validators.trafficFlowsArray.validateSafe(flows);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.issues);
      throw new Error(`Traffic flow validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} traffic flows`);
  });

  it("should validate individual traffic flow data", async () => {
    const flows = await getTrafficFlows();
    if (flows.length > 0) {
      const firstFlow = flows[0];
      const validatedFlow = validators.trafficFlow.validateSafe(firstFlow);
      if (!validatedFlow.success) {
        console.error("Individual validation failed:", validatedFlow.error.issues);
        throw new Error(`Individual flow validation failed: ${JSON.stringify(validatedFlow.error.issues, null, 2)}`);
      }
      expect(validatedFlow.data.FlowDataID).toBeDefined();
      expect(typeof validatedFlow.data.FlowDataID).toBe("number");
      expect(typeof validatedFlow.data.FlowReadingValue).toBe("number");
      expect(validatedFlow.data.Time).toBeInstanceOf(Date);
      expect(typeof validatedFlow.data.Region).toBe("string");
      expect(typeof validatedFlow.data.StationName).toBe("string");
    }
  });

  it("should validate flow station location data correctly", async () => {
    const flows = await getTrafficFlows();
    if (flows.length > 0) {
      const firstFlow = flows[0];
      const validatedFlow = validators.trafficFlow.validateSafe(firstFlow);
      if (validatedFlow.success) {
        expect(typeof validatedFlow.data.FlowStationLocation.Description).toBe("string");
        expect(typeof validatedFlow.data.FlowStationLocation.Direction).toBe("string");
        expect(typeof validatedFlow.data.FlowStationLocation.Latitude).toBe("number");
        expect(typeof validatedFlow.data.FlowStationLocation.Longitude).toBe("number");
        expect(typeof validatedFlow.data.FlowStationLocation.MilePost).toBe("number");
        expect(typeof validatedFlow.data.FlowStationLocation.RoadName).toBe("string");
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        FlowDataID: "not a number",
        FlowReadingValue: "not a number",
        FlowStationLocation: "not an object",
        Region: 123,
        StationName: 456,
        Time: "not a date",
      },
    ];
    const result = validators.trafficFlowsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(result.error.issues.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed traffic flows",
        errors: result.error.issues,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const flows = await getTrafficFlows();
    const validatedData = validators.trafficFlowsArray.validateSafe(flows);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstFlow = validatedData.data[0];
    expect(firstFlow.FlowDataID).toBeDefined();
    expect(typeof firstFlow.FlowReadingValue).toBe("number");
    expect(firstFlow.Time).toBeInstanceOf(Date);
    expect(typeof firstFlow.Region).toBe("string");
    expect(typeof firstFlow.StationName).toBe("string");
    expect(typeof firstFlow.FlowStationLocation.Description).toBe("string");
    expect(typeof firstFlow.FlowStationLocation.Direction).toBe("string");
    expect(typeof firstFlow.FlowStationLocation.Latitude).toBe("number");
    expect(typeof firstFlow.FlowStationLocation.Longitude).toBe("number");
    expect(typeof firstFlow.FlowStationLocation.MilePost).toBe("number");
    expect(typeof firstFlow.FlowStationLocation.RoadName).toBe("string");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Traffic Flow API validation tests completed");
}); 