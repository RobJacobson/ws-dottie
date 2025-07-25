import { describe, expect, it } from "vitest";
import { getHighwayCameras } from "@/api/wsdot-highway-cameras";
import { validators } from "./validator";

describe("WSDOT Highway Cameras API - Zod Validation", () => {
  it("should validate highway cameras data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Highway Cameras API validation...");
    const cameras = await getHighwayCameras();
    const validatedData = validators.camerasArray.validateSafe(cameras);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Highway cameras validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} highway cameras`);
  });

  it("should validate individual highway camera data", async () => {
    const cameras = await getHighwayCameras();
    if (cameras.length > 0) {
      const firstCamera = cameras[0];
      const validatedCamera = validators.camera.validateSafe(firstCamera);
      if (!validatedCamera.success) {
        console.error("Individual validation failed:", validatedCamera.error.errors);
        throw new Error(`Individual camera validation failed: ${JSON.stringify(validatedCamera.error.errors, null, 2)}`);
      }
      expect(validatedCamera.data.CameraID).toBeDefined();
      expect(typeof validatedCamera.data.CameraID).toBe("number");
      expect(validatedCamera.data.Title).toBeDefined();
      expect(typeof validatedCamera.data.Title).toBe("string");
      expect(validatedCamera.data.ImageURL).toBeDefined();
      expect(typeof validatedCamera.data.ImageURL).toBe("string");
      expect(typeof validatedCamera.data.IsActive).toBe("boolean");
      expect(typeof validatedCamera.data.Region).toBe("string");
      expect(typeof validatedCamera.data.ImageWidth).toBe("number");
      expect(typeof validatedCamera.data.ImageHeight).toBe("number");
      expect(typeof validatedCamera.data.DisplayLatitude).toBe("number");
      expect(typeof validatedCamera.data.DisplayLongitude).toBe("number");
      expect(typeof validatedCamera.data.SortOrder).toBe("number");
    }
  });

  it("should validate camera location data correctly", async () => {
    const cameras = await getHighwayCameras();
    if (cameras.length > 0) {
      const firstCamera = cameras[0];
      const validatedCamera = validators.camera.validateSafe(firstCamera);
      if (validatedCamera.success) {
        expect(typeof validatedCamera.data.CameraLocation.RoadName).toBe("string");
        expect(typeof validatedCamera.data.CameraLocation.Latitude).toBe("number");
        expect(typeof validatedCamera.data.CameraLocation.Longitude).toBe("number");
        expect(typeof validatedCamera.data.CameraLocation.MilePost).toBe("number");
        if (validatedCamera.data.CameraLocation.Description !== null) {
          expect(typeof validatedCamera.data.CameraLocation.Description).toBe("string");
        }
        if (validatedCamera.data.CameraLocation.Direction !== null) {
          expect(typeof validatedCamera.data.CameraLocation.Direction).toBe("string");
        }
      }
    }
  });

  it("should handle nullable fields correctly", async () => {
    const cameras = await getHighwayCameras();
    for (const camera of cameras) {
      const validatedCamera = validators.camera.validateSafe(camera);
      if (!validatedCamera.success) {
        console.error("Nullable validation failed:", validatedCamera.error.errors);
        throw new Error(`Nullable field validation failed: ${JSON.stringify(validatedCamera.error.errors, null, 2)}`);
      }
      if (validatedCamera.data.CameraOwner !== null) {
        expect(typeof validatedCamera.data.CameraOwner).toBe("string");
      }
      if (validatedCamera.data.Description !== null) {
        expect(typeof validatedCamera.data.Description).toBe("string");
      }
      if (validatedCamera.data.OwnerURL !== null) {
        expect(typeof validatedCamera.data.OwnerURL).toBe("string");
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        CameraID: "not a number",
        CameraLocation: "not an object",
        CameraOwner: 123,
        Description: 456,
        DisplayLatitude: "not a number",
        DisplayLongitude: "not a number",
        ImageHeight: "not a number",
        ImageURL: 789,
        ImageWidth: "not a number",
        IsActive: "not a boolean",
        OwnerURL: 101,
        Region: 112,
        SortOrder: "not a number",
        Title: 131,
      },
    ];
    const result = validators.camerasArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed highway cameras",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const cameras = await getHighwayCameras();
    const validatedData = validators.camerasArray.validateSafe(cameras);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstCamera = validatedData.data[0];
    expect(firstCamera.CameraID).toBeDefined();
    expect(firstCamera.Title).toBeDefined();
    expect(firstCamera.ImageURL).toBeDefined();
    expect(typeof firstCamera.IsActive).toBe("boolean");
    expect(typeof firstCamera.Region).toBe("string");
    expect(typeof firstCamera.ImageWidth).toBe("number");
    expect(typeof firstCamera.ImageHeight).toBe("number");
    expect(typeof firstCamera.DisplayLatitude).toBe("number");
    expect(typeof firstCamera.DisplayLongitude).toBe("number");
    expect(typeof firstCamera.SortOrder).toBe("number");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Highway Cameras API validation tests completed");
}); 