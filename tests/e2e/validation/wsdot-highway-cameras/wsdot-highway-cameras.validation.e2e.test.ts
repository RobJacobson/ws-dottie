import { describe, expect, it } from "vitest";

import { getHighwayCameras } from "@/api/wsdot-highway-cameras";

import { validateAndReturn } from "../../utils-zod";
import { validators } from "./validator";

describe("WSDOT Highway Cameras API - Zod Validation", () => {
  it("should validate highway cameras data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Highway Cameras API validation...");
    const cameras = await getHighwayCameras();

    // Use utility for validation
    const validatedData = validateAndReturn(
      validators.camerasArray,
      cameras,
      "highway cameras array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);
    console.log(
      `✅ Successfully validated ${validatedData.length} highway cameras`
    );
  });

  it("should validate individual highway camera data", async () => {
    const cameras = await getHighwayCameras();
    if (cameras.length > 0) {
      const firstCamera = cameras[0];

      // Use utility for individual validation
      const validatedCamera = validateAndReturn(
        validators.camera,
        firstCamera,
        "individual highway camera"
      );

      expect(validatedCamera.CameraID).toBeDefined();
      expect(typeof validatedCamera.CameraID).toBe("number");
      expect(validatedCamera.Title).toBeDefined();
      expect(typeof validatedCamera.Title).toBe("string");
      expect(validatedCamera.ImageURL).toBeDefined();
      expect(typeof validatedCamera.ImageURL).toBe("string");
      expect(typeof validatedCamera.IsActive).toBe("boolean");
      expect(typeof validatedCamera.Region).toBe("string");
      expect(typeof validatedCamera.ImageWidth).toBe("number");
      expect(typeof validatedCamera.ImageHeight).toBe("number");
      expect(typeof validatedCamera.DisplayLatitude).toBe("number");
      expect(typeof validatedCamera.DisplayLongitude).toBe("number");
      expect(typeof validatedCamera.SortOrder).toBe("number");
    }
  });

  it("should validate camera location data correctly", async () => {
    const cameras = await getHighwayCameras();
    if (cameras.length > 0) {
      const firstCamera = cameras[0];

      // Use utility for validation
      const validatedCamera = validateAndReturn(
        validators.camera,
        firstCamera,
        "camera location data"
      );

      expect(typeof validatedCamera.CameraLocation.RoadName).toBe("string");
      expect(typeof validatedCamera.CameraLocation.Latitude).toBe("number");
      expect(typeof validatedCamera.CameraLocation.Longitude).toBe("number");
      expect(typeof validatedCamera.CameraLocation.MilePost).toBe("number");
      if (validatedCamera.CameraLocation.Description !== null) {
        expect(typeof validatedCamera.CameraLocation.Description).toBe(
          "string"
        );
      }
      if (validatedCamera.CameraLocation.Direction !== null) {
        expect(typeof validatedCamera.CameraLocation.Direction).toBe("string");
      }
    }
  });

  it("should handle nullable fields correctly", async () => {
    const cameras = await getHighwayCameras();
    for (const camera of cameras) {
      // Use utility for validation
      const validatedCamera = validateAndReturn(
        validators.camera,
        camera,
        "nullable fields validation"
      );

      if (validatedCamera.CameraOwner !== null) {
        expect(typeof validatedCamera.CameraOwner).toBe("string");
      }
      if (validatedCamera.Description !== null) {
        expect(typeof validatedCamera.Description).toBe("string");
      }
      if (validatedCamera.OwnerURL !== null) {
        expect(typeof validatedCamera.OwnerURL).toBe("string");
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

    // Use utility for validation with error details
    const result = validators.camerasArray.validateSafe(malformedData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(Array.isArray(result.error.issues)).toBe(true);
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const cameras = await getHighwayCameras();

    // Single-line validation using utility
    const validatedCameras = validateAndReturn(
      validators.camerasArray,
      cameras,
      "highway cameras"
    );

    expect(validatedCameras.length).toBeGreaterThan(0);
    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });
});
