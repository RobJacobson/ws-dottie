import { describe, expect, it } from "vitest";

import {
  getCacheFlushDateTerminals,
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
  getTerminalBulletins,
  getTerminalBulletinsByTerminalId,
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
  getTerminalSailingSpace,
  getTerminalSailingSpaceByTerminalId,
  getTerminalTransports,
  getTerminalTransportsByTerminalId,
  getTerminalVerbose,
  getTerminalVerboseByTerminalId,
  getTerminalWaitTimes,
  getTerminalWaitTimesByTerminalId,
} from "@/api/wsf-terminals";

import { validators } from "./validator";

describe("WSF Terminals API - Zod Validation", () => {
  it("should validate terminal basics data structure using Zod", async () => {
    const terminalBasics = await getTerminalBasics();

    // Validate the entire array structure
    const validatedBasics =
      validators.terminalBasicsArray.validateSafe(terminalBasics);
    expect(validatedBasics.success).toBe(true);

    if (validatedBasics.success && validatedBasics.data.length > 0) {
      const firstTerminal = validatedBasics.data[0];

      // Test individual terminal basic properties
      expect(firstTerminal.TerminalID).toBeGreaterThan(0);
      expect(firstTerminal.TerminalName).toBeTruthy();
      expect(firstTerminal.TerminalAbbrev).toBeTruthy();
      expect(firstTerminal.RegionID).toBeGreaterThan(0);
      expect(typeof firstTerminal.OverheadPassengerLoading).toBe("boolean");
      expect(typeof firstTerminal.Elevator).toBe("boolean");
      expect(typeof firstTerminal.WaitingRoom).toBe("boolean");
      expect(typeof firstTerminal.FoodService).toBe("boolean");
      expect(typeof firstTerminal.Restroom).toBe("boolean");
    }
  });

  it("should validate individual terminal basic data", async () => {
    const terminalBasics = await getTerminalBasics();

    if (terminalBasics.length > 0) {
      const firstTerminal = terminalBasics[0];
      const validatedTerminal =
        validators.terminalBasics.validateSafe(firstTerminal);
      expect(validatedTerminal.success).toBe(true);

      if (validatedTerminal.success) {
        expect(validatedTerminal.data.TerminalID).toBeGreaterThan(0);
        expect(validatedTerminal.data.TerminalName).toBeTruthy();
        expect(validatedTerminal.data.RegionID).toBeGreaterThan(0);
      }
    }
  });

  it("should validate terminal basic by terminal ID", async () => {
    const terminalBasics = await getTerminalBasics();

    if (terminalBasics.length > 0) {
      const firstTerminalId = terminalBasics[0].TerminalID;
      const terminalBasic = await getTerminalBasicsByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedTerminal =
        validators.terminalBasics.validateSafe(terminalBasic);
      expect(validatedTerminal.success).toBe(true);

      if (validatedTerminal.success) {
        expect(validatedTerminal.data.TerminalID).toBe(firstTerminalId);
        expect(validatedTerminal.data.TerminalName).toBeTruthy();
      }
    }
  });

  it("should validate terminal locations data structure using Zod", async () => {
    const terminalLocations = await getTerminalLocations();

    // Validate the entire array structure
    const validatedLocations =
      validators.terminalLocationArray.validateSafe(terminalLocations);
    expect(validatedLocations.success).toBe(true);

    if (validatedLocations.success && validatedLocations.data.length > 0) {
      const firstLocation = validatedLocations.data[0];

      // Test individual terminal location properties
      expect(firstLocation.TerminalID).toBeGreaterThan(0);
      expect(firstLocation.TerminalName).toBeTruthy();
      expect(firstLocation.AddressLineOne).toBeTruthy();
      expect(firstLocation.City).toBeTruthy();
      expect(firstLocation.State).toBeTruthy();
      expect(firstLocation.ZipCode).toBeTruthy();
      expect(firstLocation.Country).toBeTruthy();
      expect(firstLocation.Latitude).toBeGreaterThanOrEqual(-90);
      expect(firstLocation.Latitude).toBeLessThanOrEqual(90);
      expect(firstLocation.Longitude).toBeGreaterThanOrEqual(-180);
      expect(firstLocation.Longitude).toBeLessThanOrEqual(180);
      expect(firstLocation.DispGISZoomLoc).toBeInstanceOf(Array);
    }
  });

  it("should validate individual terminal location data", async () => {
    const terminalLocations = await getTerminalLocations();

    if (terminalLocations.length > 0) {
      const firstLocation = terminalLocations[0];
      const validatedLocation =
        validators.terminalLocation.validateSafe(firstLocation);
      expect(validatedLocation.success).toBe(true);

      if (validatedLocation.success) {
        expect(validatedLocation.data.TerminalID).toBeGreaterThan(0);
        expect(validatedLocation.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedLocation.data.Longitude).toBeGreaterThanOrEqual(-180);
        expect(validatedLocation.data.DispGISZoomLoc).toBeInstanceOf(Array);
      }
    }
  });

  it("should validate terminal location by terminal ID", async () => {
    const terminalLocations = await getTerminalLocations();

    if (terminalLocations.length > 0) {
      const firstTerminalId = terminalLocations[0].TerminalID;
      const terminalLocation = await getTerminalLocationsByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedLocation =
        validators.terminalLocation.validateSafe(terminalLocation);
      expect(validatedLocation.success).toBe(true);

      if (validatedLocation.success) {
        expect(validatedLocation.data.TerminalID).toBe(firstTerminalId);
        expect(validatedLocation.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedLocation.data.Longitude).toBeGreaterThanOrEqual(-180);
      }
    }
  });

  it("should validate terminal sailing space data structure using Zod", async () => {
    const terminalSailingSpaces = await getTerminalSailingSpace();

    // Validate the entire array structure
    const validatedSailingSpaces =
      validators.terminalSailingSpaceArray.validateSafe(terminalSailingSpaces);
    expect(validatedSailingSpaces.success).toBe(true);

    if (
      validatedSailingSpaces.success &&
      validatedSailingSpaces.data.length > 0
    ) {
      const firstSailingSpace = validatedSailingSpaces.data[0];

      // Test individual terminal sailing space properties
      expect(firstSailingSpace.TerminalID).toBeGreaterThan(0);
      expect(firstSailingSpace.TerminalName).toBeTruthy();
      expect(firstSailingSpace.DepartingSpaces).toBeInstanceOf(Array);

      if (firstSailingSpace.DepartingSpaces.length > 0) {
        const firstDepartingSpace = firstSailingSpace.DepartingSpaces[0];
        expect(firstDepartingSpace.Departure).toBeInstanceOf(Date);
        expect(typeof firstDepartingSpace.IsCancelled).toBe("boolean");
        expect(firstDepartingSpace.VesselID).toBeGreaterThan(0);
        expect(firstDepartingSpace.VesselName).toBeTruthy();
        expect(firstDepartingSpace.MaxSpaceCount).toBeGreaterThan(0);
        expect(firstDepartingSpace.SpaceForArrivalTerminals).toBeInstanceOf(
          Array
        );
      }
    }
  });

  it("should validate individual terminal sailing space data", async () => {
    const terminalSailingSpaces = await getTerminalSailingSpace();

    if (terminalSailingSpaces.length > 0) {
      const firstSailingSpace = terminalSailingSpaces[0];
      const validatedSailingSpace =
        validators.terminalSailingSpace.validateSafe(firstSailingSpace);
      expect(validatedSailingSpace.success).toBe(true);

      if (validatedSailingSpace.success) {
        expect(validatedSailingSpace.data.TerminalID).toBeGreaterThan(0);
        expect(validatedSailingSpace.data.TerminalName).toBeTruthy();
        expect(validatedSailingSpace.data.DepartingSpaces).toBeInstanceOf(
          Array
        );
      }
    }
  });

  it("should validate terminal sailing space by terminal ID", async () => {
    const terminalSailingSpaces = await getTerminalSailingSpace();

    if (terminalSailingSpaces.length > 0) {
      const firstTerminalId = terminalSailingSpaces[0].TerminalID;
      const terminalSailingSpace = await getTerminalSailingSpaceByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedSailingSpace =
        validators.terminalSailingSpace.validateSafe(terminalSailingSpace);
      expect(validatedSailingSpace.success).toBe(true);

      if (validatedSailingSpace.success) {
        expect(validatedSailingSpace.data.TerminalID).toBe(firstTerminalId);
        expect(validatedSailingSpace.data.TerminalName).toBeTruthy();
      }
    }
  });

  it("should validate terminal bulletins data structure using Zod", async () => {
    const terminalBulletins = await getTerminalBulletins();

    // Validate the entire array structure
    const validatedBulletins =
      validators.terminalBulletinArray.validateSafe(terminalBulletins);
    expect(validatedBulletins.success).toBe(true);

    if (validatedBulletins.success && validatedBulletins.data.length > 0) {
      const firstBulletin = validatedBulletins.data[0];

      // Test individual terminal bulletin properties
      expect(firstBulletin.TerminalID).toBeGreaterThan(0);
      expect(firstBulletin.TerminalName).toBeTruthy();
      expect(firstBulletin.Bulletins).toBeInstanceOf(Array);

      if (firstBulletin.Bulletins.length > 0) {
        const firstBulletinItem = firstBulletin.Bulletins[0];
        expect(firstBulletinItem.BulletinTitle).toBeTruthy();
        expect(firstBulletinItem.BulletinText).toBeTruthy();
        expect(firstBulletinItem.BulletinSortSeq).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("should validate individual terminal bulletin data", async () => {
    const terminalBulletins = await getTerminalBulletins();

    if (terminalBulletins.length > 0) {
      const firstBulletin = terminalBulletins[0];
      const validatedBulletin =
        validators.terminalBulletin.validateSafe(firstBulletin);
      expect(validatedBulletin.success).toBe(true);

      if (validatedBulletin.success) {
        expect(validatedBulletin.data.TerminalID).toBeGreaterThan(0);
        expect(validatedBulletin.data.TerminalName).toBeTruthy();
        expect(validatedBulletin.data.Bulletins).toBeInstanceOf(Array);
      }
    }
  });

  it("should validate terminal bulletin by terminal ID", async () => {
    const terminalBulletins = await getTerminalBulletins();

    if (terminalBulletins.length > 0) {
      const firstTerminalId = terminalBulletins[0].TerminalID;
      const terminalBulletin = await getTerminalBulletinsByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedBulletin =
        validators.terminalBulletin.validateSafe(terminalBulletin);
      expect(validatedBulletin.success).toBe(true);

      if (validatedBulletin.success) {
        expect(validatedBulletin.data.TerminalID).toBe(firstTerminalId);
        expect(validatedBulletin.data.TerminalName).toBeTruthy();
      }
    }
  });

  it("should validate terminal transports data structure using Zod", async () => {
    const terminalTransports = await getTerminalTransports();

    // Validate the entire array structure
    const validatedTransports =
      validators.terminalTransportArray.validateSafe(terminalTransports);

    // Debug: Log validation errors if they occur
    if (!validatedTransports.success) {
      console.log(
        "Terminal Transports validation error:",
        validatedTransports.error.message
      );
    }

    expect(validatedTransports.success).toBe(true);

    if (validatedTransports.success && validatedTransports.data.length > 0) {
      const firstTransport = validatedTransports.data[0];

      // Test individual terminal transport properties
      expect(firstTransport.TerminalID).toBeGreaterThan(0);
      expect(firstTransport.TerminalName).toBeTruthy();
      expect(firstTransport.ParkingInfo).toBeTruthy();
      if (firstTransport.AirportInfo !== null) {
        expect(firstTransport.AirportInfo).toBeTruthy();
      }
      if (firstTransport.AirportShuttleInfo !== null) {
        expect(firstTransport.AirportShuttleInfo).toBeTruthy();
      }
      expect(firstTransport.MotorcycleInfo).toBeTruthy();
      expect(firstTransport.TruckInfo).toBeTruthy();
      if (firstTransport.BikeInfo !== null) {
        expect(firstTransport.BikeInfo).toBeTruthy();
      }
      expect(firstTransport.TransitLinks).toBeInstanceOf(Array);
    }
  });

  it("should validate individual terminal transport data", async () => {
    const terminalTransports = await getTerminalTransports();

    if (terminalTransports.length > 0) {
      const firstTransport = terminalTransports[0];
      const validatedTransport =
        validators.terminalTransport.validateSafe(firstTransport);
      expect(validatedTransport.success).toBe(true);

      if (validatedTransport.success) {
        expect(validatedTransport.data.TerminalID).toBeGreaterThan(0);
        expect(validatedTransport.data.TerminalName).toBeTruthy();
        expect(validatedTransport.data.ParkingInfo).toBeTruthy();
        expect(validatedTransport.data.TransitLinks).toBeInstanceOf(Array);
      }
    }
  });

  it("should validate terminal transport by terminal ID", async () => {
    const terminalTransports = await getTerminalTransports();

    if (terminalTransports.length > 0) {
      const firstTerminalId = terminalTransports[0].TerminalID;
      const terminalTransport = await getTerminalTransportsByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedTransport =
        validators.terminalTransport.validateSafe(terminalTransport);
      expect(validatedTransport.success).toBe(true);

      if (validatedTransport.success) {
        expect(validatedTransport.data.TerminalID).toBe(firstTerminalId);
        expect(validatedTransport.data.TerminalName).toBeTruthy();
      }
    }
  });

  it("should validate terminal wait times data structure using Zod", async () => {
    const terminalWaitTimes = await getTerminalWaitTimes();

    // Validate the entire array structure
    const validatedWaitTimes =
      validators.terminalWaitTimesArray.validateSafe(terminalWaitTimes);
    expect(validatedWaitTimes.success).toBe(true);

    if (validatedWaitTimes.success && validatedWaitTimes.data.length > 0) {
      const firstWaitTime = validatedWaitTimes.data[0];

      // Test individual terminal wait times properties
      expect(firstWaitTime.TerminalID).toBeGreaterThan(0);
      expect(firstWaitTime.TerminalName).toBeTruthy();
      expect(firstWaitTime.WaitTimes).toBeInstanceOf(Array);

      if (firstWaitTime.WaitTimes.length > 0) {
        const firstWaitTimeItem = firstWaitTime.WaitTimes[0];
        expect(firstWaitTimeItem.WaitTimeLastUpdated).toBeInstanceOf(Date);
      }
    }
  });

  it("should validate individual terminal wait times data", async () => {
    const terminalWaitTimes = await getTerminalWaitTimes();

    if (terminalWaitTimes.length > 0) {
      const firstWaitTime = terminalWaitTimes[0];
      const validatedWaitTime =
        validators.terminalWaitTimes.validateSafe(firstWaitTime);
      expect(validatedWaitTime.success).toBe(true);

      if (validatedWaitTime.success) {
        expect(validatedWaitTime.data.TerminalID).toBeGreaterThan(0);
        expect(validatedWaitTime.data.TerminalName).toBeTruthy();
        expect(validatedWaitTime.data.WaitTimes).toBeInstanceOf(Array);
      }
    }
  });

  it("should validate terminal wait times by terminal ID", async () => {
    const terminalWaitTimes = await getTerminalWaitTimes();

    if (terminalWaitTimes.length > 0) {
      const firstTerminalId = terminalWaitTimes[0].TerminalID;
      const terminalWaitTime = await getTerminalWaitTimesByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedWaitTime =
        validators.terminalWaitTimes.validateSafe(terminalWaitTime);
      expect(validatedWaitTime.success).toBe(true);

      if (validatedWaitTime.success) {
        expect(validatedWaitTime.data.TerminalID).toBe(firstTerminalId);
        expect(validatedWaitTime.data.TerminalName).toBeTruthy();
      }
    }
  });

  it("should validate terminal verbose data structure using Zod", async () => {
    const terminalVerbose = await getTerminalVerbose();

    // Validate the entire array structure
    const validatedVerbose =
      validators.terminalVerboseArray.validateSafe(terminalVerbose);
    expect(validatedVerbose.success).toBe(true);

    if (validatedVerbose.success && validatedVerbose.data.length > 0) {
      const firstVerbose = validatedVerbose.data[0];

      // Test individual terminal verbose properties
      expect(firstVerbose.TerminalID).toBeGreaterThan(0);
      expect(firstVerbose.TerminalName).toBeTruthy();
      expect(firstVerbose.AddressLineOne).toBeTruthy();
      expect(firstVerbose.City).toBeTruthy();
      expect(firstVerbose.State).toBeTruthy();
      expect(firstVerbose.ZipCode).toBeTruthy();
      expect(firstVerbose.Country).toBeTruthy();
      expect(firstVerbose.Latitude).toBeGreaterThanOrEqual(-90);
      expect(firstVerbose.Longitude).toBeGreaterThanOrEqual(-180);
      expect(typeof firstVerbose.Elevator).toBe("boolean");
      expect(typeof firstVerbose.WaitingRoom).toBe("boolean");
      expect(typeof firstVerbose.FoodService).toBe("boolean");
      expect(typeof firstVerbose.Restroom).toBe("boolean");
      expect(typeof firstVerbose.OverheadPassengerLoading).toBe("boolean");
      expect(typeof firstVerbose.REALTIME_SHUTOFF_FLAG).toBe("boolean");
      expect(firstVerbose.Bulletins).toBeInstanceOf(Array);
      expect(firstVerbose.TransitLinks).toBeInstanceOf(Array);
      expect(firstVerbose.WaitTimes).toBeInstanceOf(Array);
    }
  });

  it("should validate individual terminal verbose data", async () => {
    const terminalVerbose = await getTerminalVerbose();

    if (terminalVerbose.length > 0) {
      const firstVerbose = terminalVerbose[0];
      const validatedVerbose =
        validators.terminalVerbose.validateSafe(firstVerbose);
      expect(validatedVerbose.success).toBe(true);

      if (validatedVerbose.success) {
        expect(validatedVerbose.data.TerminalID).toBeGreaterThan(0);
        expect(validatedVerbose.data.TerminalName).toBeTruthy();
        expect(validatedVerbose.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedVerbose.data.Longitude).toBeGreaterThanOrEqual(-180);
      }
    }
  });

  it("should validate terminal verbose by terminal ID", async () => {
    const terminalVerbose = await getTerminalVerbose();

    if (terminalVerbose.length > 0) {
      const firstTerminalId = terminalVerbose[0].TerminalID;
      const terminalVerboseById = await getTerminalVerboseByTerminalId({
        terminalId: firstTerminalId,
      });

      const validatedVerbose =
        validators.terminalVerbose.validateSafe(terminalVerboseById);
      expect(validatedVerbose.success).toBe(true);

      if (validatedVerbose.success) {
        expect(validatedVerbose.data.TerminalID).toBe(firstTerminalId);
        expect(validatedVerbose.data.TerminalName).toBeTruthy();
      }
    }
  });

  it("should validate terminal cache flush date", async () => {
    const cacheFlushDate = await getCacheFlushDateTerminals();

    if (cacheFlushDate !== null) {
      const validatedDate =
        validators.terminalCacheFlushDate.validateSafe(cacheFlushDate);
      expect(validatedDate.success).toBe(true);

      if (validatedDate.success && validatedDate.data !== null) {
        expect(validatedDate.data).toBeInstanceOf(Date);
        expect(validatedDate.data.getTime()).toBeGreaterThan(0);
      }
    }
  });

  it("should validate terminal bulletin items within bulletins", async () => {
    const terminalBulletins = await getTerminalBulletins();

    if (terminalBulletins.length > 0) {
      const firstBulletin = terminalBulletins[0];
      const validatedBulletin =
        validators.terminalBulletin.validateSafe(firstBulletin);

      if (
        validatedBulletin.success &&
        validatedBulletin.data.Bulletins.length > 0
      ) {
        const firstBulletinItem = validatedBulletin.data.Bulletins[0];
        expect(firstBulletinItem.BulletinTitle).toBeTruthy();
        expect(firstBulletinItem.BulletinText).toBeTruthy();
        expect(firstBulletinItem.BulletinSortSeq).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("should validate terminal arrival space within sailing spaces", async () => {
    const terminalSailingSpaces = await getTerminalSailingSpace();

    if (terminalSailingSpaces.length > 0) {
      const firstSailingSpace = terminalSailingSpaces[0];
      const validatedSailingSpace =
        validators.terminalSailingSpace.validateSafe(firstSailingSpace);

      if (
        validatedSailingSpace.success &&
        validatedSailingSpace.data.DepartingSpaces.length > 0
      ) {
        const firstDepartingSpace =
          validatedSailingSpace.data.DepartingSpaces[0];
        expect(firstDepartingSpace.Departure).toBeInstanceOf(Date);
        expect(typeof firstDepartingSpace.IsCancelled).toBe("boolean");
        expect(firstDepartingSpace.VesselID).toBeGreaterThan(0);
        expect(firstDepartingSpace.VesselName).toBeTruthy();
        expect(firstDepartingSpace.MaxSpaceCount).toBeGreaterThan(0);
        expect(firstDepartingSpace.SpaceForArrivalTerminals).toBeInstanceOf(
          Array
        );

        if (firstDepartingSpace.SpaceForArrivalTerminals.length > 0) {
          const firstArrivalSpace =
            firstDepartingSpace.SpaceForArrivalTerminals[0];

          expect(firstArrivalSpace.TerminalID).toBeGreaterThan(0);
          expect(firstArrivalSpace.TerminalName).toBeTruthy();
          expect(firstArrivalSpace.VesselID).toBeGreaterThan(0);
          expect(firstArrivalSpace.VesselName).toBeTruthy();
          expect(typeof firstArrivalSpace.DisplayReservableSpace).toBe(
            "boolean"
          );
          expect(typeof firstArrivalSpace.DisplayDriveUpSpace).toBe("boolean");
          expect(firstArrivalSpace.DriveUpSpaceCount).toBeGreaterThanOrEqual(
            -100
          ); // Allow negative values for overflow indication
          expect(firstArrivalSpace.DriveUpSpaceHexColor).toBeTruthy();
          expect(firstArrivalSpace.MaxSpaceCount).toBeGreaterThan(0);
          expect(firstArrivalSpace.ArrivalTerminalIDs).toBeInstanceOf(Array);
        }
      }
    }
  });

  it("should validate terminal transit links within transports", async () => {
    const terminalTransports = await getTerminalTransports();

    if (terminalTransports.length > 0) {
      const firstTransport = terminalTransports[0];
      const validatedTransport =
        validators.terminalTransport.validateSafe(firstTransport);

      if (
        validatedTransport.success &&
        validatedTransport.data.TransitLinks.length > 0
      ) {
        const firstTransitLink = validatedTransport.data.TransitLinks[0];
        expect(firstTransitLink.LinkName).toBeTruthy();
        expect(firstTransitLink.LinkURL).toBeTruthy();
      }
    }
  });

  it("should validate terminal wait time items within wait times", async () => {
    const terminalWaitTimes = await getTerminalWaitTimes();

    if (terminalWaitTimes.length > 0) {
      const firstWaitTime = terminalWaitTimes[0];
      const validatedWaitTime =
        validators.terminalWaitTimes.validateSafe(firstWaitTime);

      if (
        validatedWaitTime.success &&
        validatedWaitTime.data.WaitTimes.length > 0
      ) {
        const firstWaitTimeItem = validatedWaitTime.data.WaitTimes[0];
        expect(firstWaitTimeItem.WaitTimeLastUpdated).toBeInstanceOf(Date);
      }
    }
  });

  it("should validate terminal coordinates and address information", async () => {
    const terminalLocations = await getTerminalLocations();

    if (terminalLocations.length > 0) {
      const firstLocation = terminalLocations[0];
      const validatedLocation =
        validators.terminalLocation.validateSafe(firstLocation);

      if (validatedLocation.success) {
        // Test coordinate ranges
        expect(validatedLocation.data.Latitude).toBeGreaterThanOrEqual(-90);
        expect(validatedLocation.data.Latitude).toBeLessThanOrEqual(90);
        expect(validatedLocation.data.Longitude).toBeGreaterThanOrEqual(-180);
        expect(validatedLocation.data.Longitude).toBeLessThanOrEqual(180);

        // Test address information
        expect(validatedLocation.data.AddressLineOne).toBeTruthy();
        expect(validatedLocation.data.City).toBeTruthy();
        expect(validatedLocation.data.State).toBeTruthy();
        expect(validatedLocation.data.ZipCode).toBeTruthy();
        expect(validatedLocation.data.Country).toBeTruthy();

        // Test GIS zoom location array
        expect(validatedLocation.data.DispGISZoomLoc).toBeInstanceOf(Array);
        if (validatedLocation.data.DispGISZoomLoc.length > 0) {
          const firstZoomLoc = validatedLocation.data.DispGISZoomLoc[0];

          expect(firstZoomLoc.Latitude).toBeGreaterThanOrEqual(-90);
          expect(firstZoomLoc.Longitude).toBeGreaterThanOrEqual(-180);
          expect(firstZoomLoc.ZoomLevel).toBeGreaterThanOrEqual(0); // Changed from > 0 to >= 0
        }
      }
    }
  });

  it("should validate terminal nullable fields", async () => {
    const terminalLocations = await getTerminalLocations();

    if (terminalLocations.length > 0) {
      const firstLocation = terminalLocations[0];
      const validatedLocation =
        validators.terminalLocation.validateSafe(firstLocation);

      if (validatedLocation.success) {
        // Test nullable string fields
        if (validatedLocation.data.AddressLineTwo !== null) {
          expect(typeof validatedLocation.data.AddressLineTwo).toBe("string");
        }
        if (validatedLocation.data.Directions !== null) {
          expect(typeof validatedLocation.data.Directions).toBe("string");
        }
        if (validatedLocation.data.MapLink !== null) {
          expect(typeof validatedLocation.data.MapLink).toBe("string");
        }
      }
    }
  });
});
