import { describe, expect, it } from "vitest";

import {
  getAllVesselHistories,
  getCacheFlushDateVessels,
  getMultipleVesselHistories,
  getVesselAccommodations,
  getVesselAccommodationsById,
  getVesselBasics,
  getVesselBasicsById,
  getVesselHistoryByVesselAndDateRange,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselStats,
  getVesselStatsById,
  getVesselVerbose,
  getVesselVerboseById,
} from "@/api/wsf-vessels";

import { validateAndReturn } from "../../utils-zod";
import { validators } from "./validator";

describe("WSF Vessels API - Zod Validation", () => {
  it("should validate vessel basics data structure using Zod", async () => {
    const vesselBasics = await getVesselBasics();

    // Validate the entire array structure using utility
    const validatedBasics = validateAndReturn(
      validators.vesselBasicArray,
      vesselBasics,
      "vessel basics array"
    );

    expect(validatedBasics).toBeDefined();
    expect(Array.isArray(validatedBasics)).toBe(true);
    expect(validatedBasics.length).toBeGreaterThan(0);

    if (validatedBasics.length > 0) {
      const firstVessel = validatedBasics[0];

      // Test individual vessel basic properties
      expect(firstVessel.VesselID).toBeGreaterThan(0);
      expect(firstVessel.VesselName).toBeTruthy();
      expect(firstVessel.VesselAbbrev).toBeTruthy();
      expect(firstVessel.Class.ClassID).toBeGreaterThan(0);
      expect(firstVessel.Class.ClassName).toBeTruthy();
      expect(typeof firstVessel.OwnedByWSF).toBe("boolean");
    }
  });

  it("should validate individual vessel basic data", async () => {
    const vesselBasics = await getVesselBasics();

    if (vesselBasics.length > 0) {
      const firstVessel = vesselBasics[0];

      // Use utility for individual validation
      const validatedVessel = validateAndReturn(
        validators.vesselBasic,
        firstVessel,
        "individual vessel basic"
      );

      expect(validatedVessel.VesselID).toBeGreaterThan(0);
      expect(validatedVessel.VesselName).toBeTruthy();
      expect(validatedVessel.Class.ClassID).toBeGreaterThan(0);
    }
  });

  it("should validate vessel basic by ID", async () => {
    const vesselBasics = await getVesselBasics();

    if (vesselBasics.length > 0) {
      const firstVesselId = vesselBasics[0].VesselID;
      const vesselBasic = await getVesselBasicsById({
        vesselId: firstVesselId,
      });

      // Use utility for validation
      const validatedVessel = validateAndReturn(
        validators.vesselBasic,
        vesselBasic,
        "vessel basic by ID"
      );

      expect(validatedVessel.VesselID).toBe(firstVesselId);
      expect(validatedVessel.VesselName).toBeTruthy();
    }
  });

  it("should validate vessel locations data structure using Zod", async () => {
    const vesselLocations = await getVesselLocations();

    // Validate the entire array structure using utility
    const validatedLocations = validateAndReturn(
      validators.vesselLocationArray,
      vesselLocations,
      "vessel locations array"
    );

    expect(validatedLocations).toBeDefined();
    expect(Array.isArray(validatedLocations)).toBe(true);
    expect(validatedLocations.length).toBeGreaterThan(0);

    if (validatedLocations.length > 0) {
      const firstLocation = validatedLocations[0];

      // Test individual vessel location properties
      expect(firstLocation.VesselID).toBeGreaterThan(0);
      expect(firstLocation.VesselName).toBeTruthy();
      expect(firstLocation.Latitude).toBeGreaterThanOrEqual(-90);
      expect(firstLocation.Latitude).toBeLessThanOrEqual(90);
      expect(firstLocation.Longitude).toBeGreaterThanOrEqual(-180);
      expect(firstLocation.Longitude).toBeLessThanOrEqual(180);
      expect(typeof firstLocation.InService).toBe("boolean");
      expect(typeof firstLocation.AtDock).toBe("boolean");
      expect(firstLocation.OpRouteAbbrev).toBeInstanceOf(Array);
    }
  });

  it("should validate individual vessel location data", async () => {
    const vesselLocations = await getVesselLocations();

    if (vesselLocations.length > 0) {
      const firstLocation = vesselLocations[0];

      // Use utility for individual validation
      const validatedLocation = validateAndReturn(
        validators.vesselLocation,
        firstLocation,
        "individual vessel location"
      );

      expect(validatedLocation.VesselID).toBeGreaterThan(0);
      expect(validatedLocation.Latitude).toBeGreaterThanOrEqual(-90);
      expect(validatedLocation.Longitude).toBeGreaterThanOrEqual(-180);
      if (validatedLocation.ScheduledDeparture !== null) {
        expect(validatedLocation.ScheduledDeparture).toBeInstanceOf(Date);
      }
    }
  });

  it("should validate vessel location by vessel ID", async () => {
    const vesselLocations = await getVesselLocations();

    if (vesselLocations.length > 0) {
      const firstVesselId = vesselLocations[0].VesselID;
      const vesselLocation = await getVesselLocationsByVesselId({
        vesselId: firstVesselId,
      });

      // Use utility for validation
      const validatedLocation = validateAndReturn(
        validators.vesselLocation,
        vesselLocation,
        "vessel location by ID"
      );

      expect(validatedLocation.VesselID).toBe(firstVesselId);
      expect(validatedLocation.Latitude).toBeGreaterThanOrEqual(-90);
      expect(validatedLocation.Longitude).toBeGreaterThanOrEqual(-180);
    }
  });

  it("should validate vessel accommodations data structure using Zod", async () => {
    const vesselAccommodations = await getVesselAccommodations();

    // Validate the entire array structure using utility
    const validatedAccommodations = validateAndReturn(
      validators.vesselAccommodationArray,
      vesselAccommodations,
      "vessel accommodations array"
    );

    expect(validatedAccommodations).toBeDefined();
    expect(Array.isArray(validatedAccommodations)).toBe(true);
    expect(validatedAccommodations.length).toBeGreaterThan(0);

    if (validatedAccommodations.length > 0) {
      const firstAccommodation = validatedAccommodations[0];

      // Test individual vessel accommodation properties
      expect(firstAccommodation.VesselID).toBeGreaterThan(0);
      expect(firstAccommodation.VesselName).toBeTruthy();
      expect(typeof firstAccommodation.CarDeckRestroom).toBe("boolean");
      expect(typeof firstAccommodation.Elevator).toBe("boolean");
      expect(typeof firstAccommodation.ADAAccessible).toBe("boolean");
      expect(typeof firstAccommodation.PublicWifi).toBe("boolean");
      expect(firstAccommodation.ADAInfo).toBeTruthy();
      expect(firstAccommodation.AdditionalInfo).toBeTruthy();
    }
  });

  it("should validate individual vessel accommodation data", async () => {
    const vesselAccommodations = await getVesselAccommodations();

    if (vesselAccommodations.length > 0) {
      const firstAccommodation = vesselAccommodations[0];

      // Use utility for individual validation
      const validatedAccommodation = validateAndReturn(
        validators.vesselAccommodation,
        firstAccommodation,
        "individual vessel accommodation"
      );

      expect(validatedAccommodation.VesselID).toBeGreaterThan(0);
      expect(validatedAccommodation.VesselName).toBeTruthy();
      expect(typeof validatedAccommodation.ADAAccessible).toBe("boolean");
    }
  });

  it("should validate vessel accommodation by vessel ID", async () => {
    const vesselAccommodations = await getVesselAccommodations();

    if (vesselAccommodations.length > 0) {
      const firstVesselId = vesselAccommodations[0].VesselID;
      const vesselAccommodation = await getVesselAccommodationsById({
        vesselId: firstVesselId,
      });

      // Use utility for validation
      const validatedAccommodation = validateAndReturn(
        validators.vesselAccommodation,
        vesselAccommodation,
        "vessel accommodation by ID"
      );

      expect(validatedAccommodation.VesselID).toBe(firstVesselId);
      expect(validatedAccommodation.VesselName).toBeTruthy();
    }
  });

  it("should validate vessel stats data structure using Zod", async () => {
    const vesselStats = await getVesselStats();

    // Validate the entire array structure using utility
    const validatedStats = validateAndReturn(
      validators.vesselStatsArray,
      vesselStats,
      "vessel stats array"
    );

    expect(validatedStats).toBeDefined();
    expect(Array.isArray(validatedStats)).toBe(true);
    expect(validatedStats.length).toBeGreaterThan(0);

    if (validatedStats.length > 0) {
      const firstStat = validatedStats[0];

      // Test individual vessel stats properties
      expect(firstStat.VesselID).toBeGreaterThan(0);
      expect(firstStat.VesselName).toBeTruthy();
      expect(firstStat.SpeedInKnots).toBeGreaterThan(0);
      expect(firstStat.EngineCount).toBeGreaterThan(0);
      expect(firstStat.Horsepower).toBeGreaterThan(0);
      expect(firstStat.MaxPassengerCount).toBeGreaterThan(0);
      expect(typeof firstStat.PassengerOnly).toBe("boolean");
      expect(typeof firstStat.FastFerry).toBe("boolean");
      expect(firstStat.PropulsionInfo).toBeTruthy();
      expect(firstStat.YearBuilt).toBeGreaterThan(1900);
      expect(typeof firstStat.SolasCertified).toBe("boolean");

      // Test nullable fields
      if (firstStat.VesselHistory !== null) {
        expect(typeof firstStat.VesselHistory).toBe("string");
      }
      if (firstStat.VesselDrawingImg !== null) {
        expect(typeof firstStat.VesselDrawingImg).toBe("string");
      }
      if (firstStat.MaxPassengerCountForInternational !== null) {
        expect(firstStat.MaxPassengerCountForInternational).toBeGreaterThan(0);
      }
    }
  });

  it("should validate individual vessel stats data", async () => {
    const vesselStats = await getVesselStats();

    if (vesselStats.length > 0) {
      const firstStat = vesselStats[0];

      // Use utility for individual validation
      const validatedStat = validateAndReturn(
        validators.vesselStats,
        firstStat,
        "individual vessel stats"
      );

      expect(validatedStat.VesselID).toBeGreaterThan(0);
      expect(validatedStat.SpeedInKnots).toBeGreaterThan(0);
      expect(validatedStat.YearBuilt).toBeGreaterThan(1900);

      // Test nullable fields
      if (validatedStat.VesselHistory !== null) {
        expect(typeof validatedStat.VesselHistory).toBe("string");
      }
      if (validatedStat.VesselDrawingImg !== null) {
        expect(typeof validatedStat.VesselDrawingImg).toBe("string");
      }
      if (validatedStat.MaxPassengerCountForInternational !== null) {
        expect(validatedStat.MaxPassengerCountForInternational).toBeGreaterThan(
          0
        );
      }
    }
  });

  it("should validate vessel stats by vessel ID", async () => {
    const vesselStats = await getVesselStats();

    if (vesselStats.length > 0) {
      const firstVesselId = vesselStats[0].VesselID;
      const vesselStat = await getVesselStatsById({ vesselId: firstVesselId });

      const validatedStat = validators.vesselStats.validateSafe(vesselStat);
      expect(validatedStat.success).toBe(true);

      if (validatedStat.success) {
        expect(validatedStat.data.VesselID).toBe(firstVesselId);
        expect(validatedStat.data.SpeedInKnots).toBeGreaterThan(0);
        expect(validatedStat.data.YearBuilt).toBeGreaterThan(1900);
      }
    }
  });

  it("should validate vessel history by vessel and date range", async () => {
    const dateStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const dateEnd = new Date();
    const testVessel = "Spokane";

    const vesselHistoryByRange = await getVesselHistoryByVesselAndDateRange({
      vesselName: testVessel,
      dateStart,
      dateEnd,
    });

    const validatedHistory =
      validators.vesselHistoryArray.validateSafe(vesselHistoryByRange);
    expect(validatedHistory.success).toBe(true);

    if (validatedHistory.success && validatedHistory.data.length > 0) {
      expect(validatedHistory.data[0].Vessel).toBe(testVessel);
    }
  });

  it("should validate multiple vessel histories data structure using Zod", async () => {
    const dateStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const dateEnd = new Date();
    const testVessels = ["Spokane", "Walla Walla", "Kaleetan"];

    const multipleVesselHistories = await getMultipleVesselHistories({
      vesselNames: testVessels,
      dateStart,
      dateEnd,
      batchSize: 3, // Small batch for testing
    });

    // Validate the entire array structure using utility
    const validatedHistories = validateAndReturn(
      validators.vesselHistoryArray,
      multipleVesselHistories,
      "multiple vessel histories array"
    );

    expect(validatedHistories).toBeDefined();
    expect(Array.isArray(validatedHistories)).toBe(true);
    expect(validatedHistories.length).toBeGreaterThan(0);

    // Verify that we have data from all requested vessels
    const vesselNamesInResults = [
      ...new Set(validatedHistories.map((h) => h.Vessel)),
    ];
    expect(vesselNamesInResults.length).toBeGreaterThan(0);

    // Check that all vessels in results are from our test list
    vesselNamesInResults.forEach((vesselName) => {
      expect(testVessels).toContain(vesselName);
    });

    // Validate individual history records
    if (validatedHistories.length > 0) {
      const firstHistory = validatedHistories[0];
      expect(firstHistory.VesselId).toBeGreaterThan(0);
      expect(firstHistory.Vessel).toBeTruthy();
      expect(testVessels).toContain(firstHistory.Vessel);
    }
  });

  it("should validate all vessel histories data structure using Zod", async () => {
    const dateStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const dateEnd = new Date();

    const allVesselHistories = await getAllVesselHistories({
      dateStart,
      dateEnd,
      batchSize: 6, // Default batch size
    });

    // Validate the entire array structure using utility
    const validatedHistories = validateAndReturn(
      validators.vesselHistoryArray,
      allVesselHistories,
      "all vessel histories array"
    );

    expect(validatedHistories).toBeDefined();
    expect(Array.isArray(validatedHistories)).toBe(true);
    expect(validatedHistories.length).toBeGreaterThan(0);

    // Verify that we have data from multiple vessels (indicating fleet-wide data)
    const vesselNamesInResults = [
      ...new Set(validatedHistories.map((h) => h.Vessel)),
    ];
    expect(vesselNamesInResults.length).toBeGreaterThan(1); // Should have multiple vessels

    // Check that vessel names are valid WSF vessel names
    const expectedVesselNames = [
      "Cathlamet",
      "Chelan",
      "Chetzemoka",
      "Chimacum",
      "Issaquah",
      "Kaleetan",
      "Kennewick",
      "Kitsap",
      "Kittitas",
      "Puyallup",
      "Salish",
      "Samish",
      "Sealth",
      "Spokane",
      "Suquamish",
      "Tacoma",
      "Tillikum",
      "Tokitae",
      "Walla Walla",
      "Wenatchee",
      "Yakima",
    ];

    vesselNamesInResults.forEach((vesselName) => {
      expect(expectedVesselNames).toContain(vesselName);
    });

    // Validate individual history records
    if (validatedHistories.length > 0) {
      const firstHistory = validatedHistories[0];
      expect(firstHistory.VesselId).toBeGreaterThan(0);
      expect(firstHistory.Vessel).toBeTruthy();
      expect(expectedVesselNames).toContain(firstHistory.Vessel);
    }
  });

  it("should validate multiple vessel histories with custom batch size", async () => {
    const dateStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const dateEnd = new Date();
    const testVessels = [
      "Spokane",
      "Walla Walla",
      "Kaleetan",
      "Cathlamet",
      "Chelan",
    ];

    const multipleVesselHistories = await getMultipleVesselHistories({
      vesselNames: testVessels,
      dateStart,
      dateEnd,
      batchSize: 2, // Custom small batch size
    });

    // Validate the entire array structure
    const validatedHistories = validateAndReturn(
      validators.vesselHistoryArray,
      multipleVesselHistories,
      "multiple vessel histories with custom batch size"
    );

    expect(validatedHistories).toBeDefined();
    expect(Array.isArray(validatedHistories)).toBe(true);
    expect(validatedHistories.length).toBeGreaterThan(0);

    // Verify that we have data from all requested vessels
    const vesselNamesInResults = [
      ...new Set(validatedHistories.map((h) => h.Vessel)),
    ];
    expect(vesselNamesInResults.length).toBeGreaterThan(0);

    // Check that all vessels in results are from our test list
    vesselNamesInResults.forEach((vesselName) => {
      expect(testVessels).toContain(vesselName);
    });
  });

  it("should validate all vessel histories with custom batch size", async () => {
    const dateStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const dateEnd = new Date();

    const allVesselHistories = await getAllVesselHistories({
      dateStart,
      dateEnd,
      batchSize: 4, // Custom batch size
    });

    // Validate the entire array structure
    const validatedHistories = validateAndReturn(
      validators.vesselHistoryArray,
      allVesselHistories,
      "all vessel histories with custom batch size"
    );

    expect(validatedHistories).toBeDefined();
    expect(Array.isArray(validatedHistories)).toBe(true);
    expect(validatedHistories.length).toBeGreaterThan(0);

    // Verify that we have data from multiple vessels
    const vesselNamesInResults = [
      ...new Set(validatedHistories.map((h) => h.Vessel)),
    ];
    expect(vesselNamesInResults.length).toBeGreaterThan(1);

    // Check that vessel names are valid WSF vessel names
    const expectedVesselNames = [
      "Cathlamet",
      "Chelan",
      "Chetzemoka",
      "Chimacum",
      "Issaquah",
      "Kaleetan",
      "Kennewick",
      "Kitsap",
      "Kittitas",
      "Puyallup",
      "Salish",
      "Samish",
      "Sealth",
      "Spokane",
      "Suquamish",
      "Tacoma",
      "Tillikum",
      "Tokitae",
      "Walla Walla",
      "Wenatchee",
      "Yakima",
    ];

    vesselNamesInResults.forEach((vesselName) => {
      expect(expectedVesselNames).toContain(vesselName);
    });
  });

  it("should validate vessel verbose data structure using Zod", async () => {
    const vesselVerbose = await getVesselVerbose();

    // Validate the entire array structure
    const validatedVerbose =
      validators.vesselVerboseArray.validateSafe(vesselVerbose);

    expect(validatedVerbose.success).toBe(true);

    if (validatedVerbose.success && validatedVerbose.data.length > 0) {
      const firstVerbose = validatedVerbose.data[0];

      // Test individual vessel verbose properties
      expect(firstVerbose.VesselID).toBeGreaterThan(0);
      expect(firstVerbose.VesselName).toBeTruthy();
      expect(firstVerbose.VesselAbbrev).toBeTruthy();
      expect(firstVerbose.YearBuilt).toBeGreaterThan(1900);
      expect(firstVerbose.Displacement).toBeGreaterThan(0);
      expect(firstVerbose.Length).toBeTruthy();
      expect(firstVerbose.Beam).toBeTruthy();
      expect(firstVerbose.Draft).toBeTruthy();
      expect(firstVerbose.SpeedInKnots).toBeGreaterThan(0);
      expect(firstVerbose.EngineCount).toBeGreaterThan(0);
      expect(firstVerbose.Horsepower).toBeGreaterThan(0);
      expect(firstVerbose.MaxPassengerCount).toBeGreaterThan(0);
      expect(firstVerbose.RegDeckSpace).toBeGreaterThan(0);
      expect(firstVerbose.TallDeckSpace).toBeGreaterThan(0);
      expect(firstVerbose.Tonnage).toBeGreaterThan(0);
      expect(firstVerbose.PropulsionInfo).toBeTruthy();
      expect(typeof firstVerbose.ADAAccessible).toBe("boolean");
      expect(typeof firstVerbose.Elevator).toBe("boolean");
      expect(typeof firstVerbose.CarDeckRestroom).toBe("boolean");
      expect(typeof firstVerbose.MainCabinGalley).toBe("boolean");
      expect(typeof firstVerbose.MainCabinRestroom).toBe("boolean");
      expect(typeof firstVerbose.PublicWifi).toBe("boolean");
      expect(firstVerbose.ADAInfo).toBeTruthy();
      expect(firstVerbose.VesselNameDesc).toBeTruthy();
      expect(firstVerbose.VesselHistory).toBeTruthy();
      expect(firstVerbose.CityBuilt).toBeTruthy();
    }
  });

  it("should validate individual vessel verbose data", async () => {
    const vesselVerbose = await getVesselVerbose();

    if (vesselVerbose.length > 0) {
      const firstVerbose = vesselVerbose[0];
      const validatedVerbose =
        validators.vesselVerbose.validateSafe(firstVerbose);
      expect(validatedVerbose.success).toBe(true);

      if (validatedVerbose.success) {
        expect(validatedVerbose.data.VesselID).toBeGreaterThan(0);
        expect(validatedVerbose.data.VesselName).toBeTruthy();
        expect(validatedVerbose.data.YearBuilt).toBeGreaterThan(1900);
        expect(validatedVerbose.data.SpeedInKnots).toBeGreaterThan(0);
      }
    }
  });

  it("should validate vessel verbose by vessel ID", async () => {
    const vesselVerbose = await getVesselVerbose();

    if (vesselVerbose.length > 0) {
      const firstVesselId = vesselVerbose[0].VesselID;
      const vesselVerboseById = await getVesselVerboseById({
        vesselId: firstVesselId,
      });

      const validatedVerbose =
        validators.vesselVerbose.validateSafe(vesselVerboseById);
      expect(validatedVerbose.success).toBe(true);

      if (validatedVerbose.success) {
        expect(validatedVerbose.data.VesselID).toBe(firstVesselId);
        expect(validatedVerbose.data.VesselName).toBeTruthy();
        expect(validatedVerbose.data.YearBuilt).toBeGreaterThan(1900);
      }
    }
  });

  it("should validate vessels cache flush date", async () => {
    const cacheFlushDate = await getCacheFlushDateVessels();

    if (cacheFlushDate !== null) {
      const validatedDate =
        validators.vesselsCacheFlushDate.validateSafe(cacheFlushDate);
      expect(validatedDate.success).toBe(true);

      if (validatedDate.success) {
        expect(validatedDate.data).toBeInstanceOf(Date);
        expect(validatedDate.data.getTime()).toBeGreaterThan(0);
      }
    }
  });

  it("should validate vessel class within vessel data", async () => {
    const vesselBasics = await getVesselBasics();

    if (vesselBasics.length > 0) {
      const firstVessel = vesselBasics[0];
      const validatedVessel = validators.vesselBasic.validateSafe(firstVessel);

      if (validatedVessel.success) {
        const vesselClass = validatedVessel.data.Class;
        expect(vesselClass.ClassID).toBeGreaterThan(0);
        expect(vesselClass.ClassName).toBeTruthy();
        expect(vesselClass.SortSeq).toBeGreaterThanOrEqual(0);
        expect(vesselClass.DrawingImg).toBeTruthy();
        expect(vesselClass.SilhouetteImg).toBeTruthy();
        expect(vesselClass.PublicDisplayName).toBeTruthy();
      }
    }
  });

  it("should validate vessel location coordinates and navigation data", async () => {
    const vesselLocations = await getVesselLocations();

    if (vesselLocations.length > 0) {
      const firstLocation = vesselLocations[0];
      const validatedLocation =
        validators.vesselLocation.validateSafe(firstLocation);

      if (validatedLocation.success) {
        // Test coordinate ranges
        expect(validatedLocation.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedLocation.data.Latitude).toBeLessThanOrEqual(90);
        expect(validatedLocation.data.Longitude).toBeGreaterThanOrEqual(-180);
        expect(validatedLocation.data.Longitude).toBeLessThanOrEqual(180);

        // Test navigation data
        expect(validatedLocation.data.Speed).toBeGreaterThanOrEqual(0);
        expect(validatedLocation.data.Heading).toBeGreaterThanOrEqual(0);
        expect(validatedLocation.data.Heading).toBeLessThanOrEqual(360);

        // Test terminal information
        expect(validatedLocation.data.DepartingTerminalID).toBeGreaterThan(0);
        if (validatedLocation.data.ArrivingTerminalID !== null) {
          expect(validatedLocation.data.ArrivingTerminalID).toBeGreaterThan(0);
        }
        expect(validatedLocation.data.DepartingTerminalName).toBeTruthy();
        expect(
          validatedLocation.data.ArrivingTerminalName == null ||
            typeof validatedLocation.data.ArrivingTerminalName === "string"
        ).toBeTruthy();
      }
    }
  });

  it("should validate vessel stats nullable fields", async () => {
    const vesselStats = await getVesselStats();

    if (vesselStats.length > 0) {
      const firstStat = vesselStats[0];
      const validatedStat = validators.vesselStats.validateSafe(firstStat);

      if (validatedStat.success) {
        // Test nullable string fields
        if (validatedStat.data.VesselHistory !== null) {
          expect(typeof validatedStat.data.VesselHistory).toBe("string");
        }
        if (validatedStat.data.VesselDrawingImg !== null) {
          expect(typeof validatedStat.data.VesselDrawingImg).toBe("string");
        }

        // Test nullable number fields
        if (validatedStat.data.MaxPassengerCountForInternational !== null) {
          expect(
            validatedStat.data.MaxPassengerCountForInternational
          ).toBeGreaterThan(0);
        }

        // Test optional fields
        if (validatedStat.data.YearRebuilt !== undefined) {
          expect(validatedStat.data.YearRebuilt).toBeGreaterThan(1900);
        }
      }
    }
  });
});
