import { describe, expect, it } from "vitest";

import {
  getCacheFlushDateVessels,
  getVesselAccommodations,
  getVesselAccommodationsById,
  getVesselBasics,
  getVesselBasicsById,
  getVesselHistory,
  getVesselHistoryByVesselAndDateRange,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselStats,
  getVesselStatsById,
  getVesselVerbose,
  getVesselVerboseById,
} from "@/api/wsf-vessels";

import { validators } from "./validator";

describe("WSF Vessels API - Zod Validation", () => {
  it("should validate vessel basics data structure using Zod", async () => {
    const vesselBasics = await getVesselBasics();

    // Validate the entire array structure
    const validatedBasics =
      validators.vesselBasicArray.validateSafe(vesselBasics);
    expect(validatedBasics.success).toBe(true);

    if (validatedBasics.success && validatedBasics.data.length > 0) {
      const firstVessel = validatedBasics.data[0];

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
      const validatedVessel = validators.vesselBasic.validateSafe(firstVessel);
      expect(validatedVessel.success).toBe(true);

      if (validatedVessel.success) {
        expect(validatedVessel.data.VesselID).toBeGreaterThan(0);
        expect(validatedVessel.data.VesselName).toBeTruthy();
        expect(validatedVessel.data.Class.ClassID).toBeGreaterThan(0);
      }
    }
  });

  it("should validate vessel basic by ID", async () => {
    const vesselBasics = await getVesselBasics();

    if (vesselBasics.length > 0) {
      const firstVesselId = vesselBasics[0].VesselID;
      const vesselBasic = await getVesselBasicsById({
        vesselId: firstVesselId,
      });

      const validatedVessel = validators.vesselBasic.validateSafe(vesselBasic);
      expect(validatedVessel.success).toBe(true);

      if (validatedVessel.success) {
        expect(validatedVessel.data.VesselID).toBe(firstVesselId);
        expect(validatedVessel.data.VesselName).toBeTruthy();
      }
    }
  });

  it("should validate vessel locations data structure using Zod", async () => {
    const vesselLocations = await getVesselLocations();

    // Validate the entire array structure
    const validatedLocations =
      validators.vesselLocationArray.validateSafe(vesselLocations);
    expect(validatedLocations.success).toBe(true);

    if (validatedLocations.success && validatedLocations.data.length > 0) {
      const firstLocation = validatedLocations.data[0];

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
      const validatedLocation =
        validators.vesselLocation.validateSafe(firstLocation);
      expect(validatedLocation.success).toBe(true);

      if (validatedLocation.success) {
        expect(validatedLocation.data.VesselID).toBeGreaterThan(0);
        expect(validatedLocation.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedLocation.data.Longitude).toBeGreaterThanOrEqual(-180);
        expect(validatedLocation.data.ScheduledDeparture).toBeInstanceOf(Date);
        expect(validatedLocation.data.TimeStamp).toBeInstanceOf(Date);
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

      const validatedLocation =
        validators.vesselLocation.validateSafe(vesselLocation);
      expect(validatedLocation.success).toBe(true);

      if (validatedLocation.success) {
        expect(validatedLocation.data.VesselID).toBe(firstVesselId);
        expect(validatedLocation.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedLocation.data.Longitude).toBeGreaterThanOrEqual(-180);
      }
    }
  });

  it("should validate vessel accommodations data structure using Zod", async () => {
    const vesselAccommodations = await getVesselAccommodations();

    // Validate the entire array structure
    const validatedAccommodations =
      validators.vesselAccommodationArray.validateSafe(vesselAccommodations);

    expect(validatedAccommodations.success).toBe(true);

    if (
      validatedAccommodations.success &&
      validatedAccommodations.data.length > 0
    ) {
      const firstAccommodation = validatedAccommodations.data[0];

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
      const validatedAccommodation =
        validators.vesselAccommodation.validateSafe(firstAccommodation);
      expect(validatedAccommodation.success).toBe(true);

      if (validatedAccommodation.success) {
        expect(validatedAccommodation.data.VesselID).toBeGreaterThan(0);
        expect(validatedAccommodation.data.VesselName).toBeTruthy();
        expect(typeof validatedAccommodation.data.ADAAccessible).toBe(
          "boolean"
        );
      }
    }
  });

  it("should validate vessel accommodation by vessel ID", async () => {
    const vesselAccommodations = await getVesselAccommodations();

    if (vesselAccommodations.length > 0) {
      const firstVesselId = vesselAccommodations[0].VesselID;
      const vesselAccommodation = await getVesselAccommodationsById({
        vesselId: firstVesselId,
      });

      const validatedAccommodation =
        validators.vesselAccommodation.validateSafe(vesselAccommodation);
      expect(validatedAccommodation.success).toBe(true);

      if (validatedAccommodation.success) {
        expect(validatedAccommodation.data.VesselID).toBe(firstVesselId);
        expect(validatedAccommodation.data.VesselName).toBeTruthy();
      }
    }
  });

  it("should validate vessel stats data structure using Zod", async () => {
    const vesselStats = await getVesselStats();

    // Validate the entire array structure
    const validatedStats =
      validators.vesselStatsArray.validateSafe(vesselStats);

    expect(validatedStats.success).toBe(true);

    if (validatedStats.success && validatedStats.data.length > 0) {
      const firstStat = validatedStats.data[0];

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
      const validatedStat = validators.vesselStats.validateSafe(firstStat);
      expect(validatedStat.success).toBe(true);

      if (validatedStat.success) {
        expect(validatedStat.data.VesselID).toBeGreaterThan(0);
        expect(validatedStat.data.SpeedInKnots).toBeGreaterThan(0);
        expect(validatedStat.data.YearBuilt).toBeGreaterThan(1900);

        // Test nullable fields
        if (validatedStat.data.VesselHistory !== null) {
          expect(typeof validatedStat.data.VesselHistory).toBe("string");
        }
        if (validatedStat.data.VesselDrawingImg !== null) {
          expect(typeof validatedStat.data.VesselDrawingImg).toBe("string");
        }
        if (validatedStat.data.MaxPassengerCountForInternational !== null) {
          expect(
            validatedStat.data.MaxPassengerCountForInternational
          ).toBeGreaterThan(0);
        }
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

  it("should validate vessel history data structure using Zod", async () => {
    const vesselHistory = await getVesselHistory();

    // Validate the entire array structure
    const validatedHistory =
      validators.vesselHistoryArray.validateSafe(vesselHistory);

    expect(validatedHistory.success).toBe(true);

    if (validatedHistory.success && validatedHistory.data.length > 0) {
      const firstHistory = validatedHistory.data[0];

      // Test individual vessel history properties
      expect(firstHistory.VesselId).toBeGreaterThan(0);
      expect(firstHistory.Vessel).toBeTruthy();
      if (firstHistory.Departing !== null) {
        expect(firstHistory.Departing).toBeTruthy();
      }
      if (firstHistory.Arriving !== null) {
        expect(firstHistory.Arriving).toBeTruthy();
      }

      // Test nullable date fields
      if (firstHistory.ScheduledDepart !== null) {
        expect(firstHistory.ScheduledDepart).toBeInstanceOf(Date);
      }
      if (firstHistory.ActualDepart !== null) {
        expect(firstHistory.ActualDepart).toBeInstanceOf(Date);
      }
      if (firstHistory.EstArrival !== null) {
        expect(firstHistory.EstArrival).toBeInstanceOf(Date);
      }
      if (firstHistory.Date !== null) {
        expect(firstHistory.Date).toBeInstanceOf(Date);
      }
    }
  });

  it("should validate individual vessel history data", async () => {
    const vesselHistory = await getVesselHistory();

    if (vesselHistory.length > 0) {
      const firstHistory = vesselHistory[0];
      const validatedHistory =
        validators.vesselHistory.validateSafe(firstHistory);
      expect(validatedHistory.success).toBe(true);

      if (validatedHistory.success) {
        expect(validatedHistory.data.VesselId).toBeGreaterThan(0);
        expect(validatedHistory.data.Vessel).toBeTruthy();
        if (validatedHistory.data.Departing !== null) {
          expect(validatedHistory.data.Departing).toBeTruthy();
        }
        if (validatedHistory.data.Arriving !== null) {
          expect(validatedHistory.data.Arriving).toBeTruthy();
        }
      }
    }
  });

  it("should validate vessel history by vessel and date range", async () => {
    const vesselHistory = await getVesselHistory();

    if (vesselHistory.length > 0) {
      const firstHistory = vesselHistory[0];
      const vesselName = firstHistory.Vessel;
      const dateStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      const dateEnd = new Date();

      const vesselHistoryByRange = await getVesselHistoryByVesselAndDateRange({
        vesselName,
        dateStart,
        dateEnd,
      });

      const validatedHistory =
        validators.vesselHistoryArray.validateSafe(vesselHistoryByRange);
      expect(validatedHistory.success).toBe(true);

      if (validatedHistory.success && validatedHistory.data.length > 0) {
        expect(validatedHistory.data[0].Vessel).toBe(vesselName);
      }
    }
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
        expect(validatedLocation.data.ArrivingTerminalID).toBeGreaterThan(0);
        expect(validatedLocation.data.DepartingTerminalName).toBeTruthy();
        expect(validatedLocation.data.ArrivingTerminalName).toBeTruthy();
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

  it("should validate vessel history date fields", async () => {
    const vesselHistory = await getVesselHistory();

    if (vesselHistory.length > 0) {
      const firstHistory = vesselHistory[0];
      const validatedHistory =
        validators.vesselHistory.validateSafe(firstHistory);

      if (validatedHistory.success) {
        // Test nullable date fields
        if (validatedHistory.data.ScheduledDepart !== null) {
          expect(validatedHistory.data.ScheduledDepart).toBeInstanceOf(Date);
        }
        if (validatedHistory.data.ActualDepart !== null) {
          expect(validatedHistory.data.ActualDepart).toBeInstanceOf(Date);
        }
        if (validatedHistory.data.EstArrival !== null) {
          expect(validatedHistory.data.EstArrival).toBeInstanceOf(Date);
        }
        if (validatedHistory.data.Date !== null) {
          expect(validatedHistory.data.Date).toBeInstanceOf(Date);
        }
      }
    }
  });
});
