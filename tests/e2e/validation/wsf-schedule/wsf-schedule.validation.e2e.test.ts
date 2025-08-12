import { describe, expect, it } from "vitest";

import {
  getActiveSeasons,
  getAlerts,
  getAllSailings,
  getAlternativeFormats,
  getCacheFlushDateSchedule,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRoutes,
  getSailings,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
  getTerminals,
  getTerminalsAndMates,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  getValidDateRange,
} from "@/api/wsf-schedule";

import { validationHelpers, validators } from "./validator";

describe("WSF Schedule API - Zod Validation", () => {
  it("should validate scheduled routes data structure using Zod", async () => {
    console.log("🚀 Testing WSF Schedule API - Scheduled Routes validation...");

    // Fetch real data from the API
    const scheduledRoutes = await getScheduledRoutes();

    // Validate the entire array structure
    const validatedData =
      validators.scheduledRoutesArray.validateSafe(scheduledRoutes);

    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.issues);
      throw new Error(
        `Scheduled routes validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`
      );
    }

    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);

    console.log(
      `✅ Successfully validated ${validatedData.data.length} scheduled routes`
    );
  });

  it("should validate individual scheduled route data", async () => {
    const scheduledRoutes = await getScheduledRoutes();

    if (scheduledRoutes.length > 0) {
      const firstRoute = scheduledRoutes[0];

      // Validate individual item
      const validatedRoute =
        validators.scheduledRouteData.validateSafe(firstRoute);

      if (!validatedRoute.success) {
        console.error(
          "Individual validation failed:",
          validatedRoute.error.issues
        );
        throw new Error(
          `Individual scheduled route validation failed: ${JSON.stringify(validatedRoute.error.issues, null, 2)}`
        );
      }

      expect(validatedRoute.data.ScheduleID).toBeGreaterThan(0);
      expect(validatedRoute.data.SchedRouteID).toBeGreaterThan(0);
      expect(typeof validatedRoute.data.RouteAbbrev).toBe("string");
      expect(typeof validatedRoute.data.Description).toBe("string");
      expect(validatedRoute.data.RegionID).toBeGreaterThan(0);
      expect(Array.isArray(validatedRoute.data.ServiceDisruptions)).toBe(true);
      expect(Array.isArray(validatedRoute.data.ContingencyAdj)).toBe(true);
    }
  });

  it("should validate scheduled routes by season", async () => {
    console.log(
      "🚀 Testing WSF Schedule API - Scheduled Routes by Season validation..."
    );

    const activeSeasons = await getActiveSeasons();
    if (activeSeasons.length > 0) {
      const firstSeason = activeSeasons[0];
      const scheduledRoutes = await getScheduledRoutesBySeason({
        scheduleId: firstSeason.ScheduleID,
      });

      const validatedData =
        validators.scheduledRoutesArray.validateSafe(scheduledRoutes);

      if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error.issues);
        throw new Error(
          `Scheduled routes by season validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`
        );
      }

      expect(validatedData.data).toBeDefined();
      expect(Array.isArray(validatedData.data)).toBe(true);

      console.log(
        `✅ Successfully validated ${validatedData.data.length} scheduled routes for season ${firstSeason.ScheduleName}`
      );
    }
  });

  it("should validate routes data structure using Zod", async () => {
    console.log("🚀 Testing WSF Schedule API - Routes validation...");

    // Get valid date range first
    const validDateRange = await getValidDateRange();
    const routes = await getRoutes({ tripDate: validDateRange.DateFrom });

    // Use helper function for validation
    const validatedData = validationHelpers.expectValidRoutesArray(
      routes,
      "routes array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);

    console.log(`✅ Successfully validated ${validatedData.length} routes`);
  });

  it("should validate individual route data", async () => {
    const validDateRange = await getValidDateRange();
    const routes = await getRoutes({ tripDate: validDateRange.DateFrom });

    if (routes.length > 0) {
      const firstRoute = routes[0];

      const validatedRoute = validators.routeData.validateSafe(firstRoute);

      if (!validatedRoute.success) {
        console.error(
          "Individual route validation failed:",
          validatedRoute.error.issues
        );
        throw new Error(
          `Individual route validation failed: ${JSON.stringify(validatedRoute.error.issues, null, 2)}`
        );
      }

      expect(validatedRoute.data.RouteID).toBeGreaterThan(0);
      expect(typeof validatedRoute.data.RouteAbbrev).toBe("string");
      expect(typeof validatedRoute.data.Description).toBe("string");
      expect(validatedRoute.data.RegionID).toBeGreaterThan(0);
    }
  });

  it("should validate route details data", async () => {
    console.log("🚀 Testing WSF Schedule API - Route Details validation...");

    const validDateRange = await getValidDateRange();
    const routeDetails = await getRouteDetails({
      tripDate: validDateRange.DateFrom,
    });

    const validatedData = validators.routesArray.validateSafe(routeDetails);

    if (!validatedData.success) {
      console.error(
        "Route details validation failed:",
        validatedData.error.issues
      );
      throw new Error(
        `Route details validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`
      );
    }

    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);

    console.log(
      `✅ Successfully validated ${validatedData.data.length} route details`
    );
  });

  it("should validate individual route details data", async () => {
    const validDateRange = await getValidDateRange();
    const routes = await getRoutes({ tripDate: validDateRange.DateFrom });

    if (routes.length > 0) {
      const firstRoute = routes[0];
      const routeDetails = await getRouteDetailsByRoute({
        tripDate: validDateRange.DateFrom,
        routeId: firstRoute.RouteID,
      });

      const validatedDetails =
        validators.routeDetailsData.validateSafe(routeDetails);

      if (!validatedDetails.success) {
        console.error(
          "Individual route details validation failed:",
          validatedDetails.error.issues
        );
        throw new Error(
          `Individual route details validation failed: ${JSON.stringify(validatedDetails.error.issues, null, 2)}`
        );
      }

      expect(validatedDetails.data.RouteID).toBe(firstRoute.RouteID);
      expect(typeof validatedDetails.data.RouteAbbrev).toBe("string");
      expect(typeof validatedDetails.data.Description).toBe("string");
      if (validatedDetails.data.CrossingTime !== null) {
        expect(validatedDetails.data.CrossingTime).toBeGreaterThan(0);
      }
      expect(typeof validatedDetails.data.ReservationFlag).toBe("boolean");
      expect(typeof validatedDetails.data.PassengerOnlyFlag).toBe("boolean");
      expect(typeof validatedDetails.data.InternationalFlag).toBe("boolean");
      expect(validatedDetails.data.VesselWatchID).toBeGreaterThan(0);
      expect(typeof validatedDetails.data.GeneralRouteNotes).toBe("string");
      expect(typeof validatedDetails.data.SeasonalRouteNotes).toBe("string");
      if (validatedDetails.data.AdaNotes !== null) {
        expect(typeof validatedDetails.data.AdaNotes).toBe("string");
      }
      expect(Array.isArray(validatedDetails.data.Alerts)).toBe(true);
    }
  });

  it("should validate sailings data structure using Zod", async () => {
    console.log("🚀 Testing WSF Schedule API - Sailings validation...");

    const scheduledRoutes = await getScheduledRoutes();
    if (scheduledRoutes.length > 0) {
      const firstScheduledRoute = scheduledRoutes[0];
      const sailings = await getSailings({
        schedRouteId: firstScheduledRoute.SchedRouteID,
      });

      const validatedData = validationHelpers.expectValidSailingsArray(
        sailings,
        "sailings array"
      );

      expect(validatedData).toBeDefined();
      expect(Array.isArray(validatedData)).toBe(true);

      console.log(
        `✅ Successfully validated ${validatedData.length} sailings for scheduled route ${firstScheduledRoute.RouteAbbrev}`
      );
    }
  });

  it("should validate individual sailing data", async () => {
    const scheduledRoutes = await getScheduledRoutes();
    if (scheduledRoutes.length > 0) {
      const firstScheduledRoute = scheduledRoutes[0];
      const sailings = await getSailings({
        schedRouteId: firstScheduledRoute.SchedRouteID,
      });

      if (sailings.length > 0) {
        const firstSailing = sailings[0];

        const validatedSailing =
          validators.sailingData.validateSafe(firstSailing);

        if (!validatedSailing.success) {
          console.error(
            "Individual sailing validation failed:",
            validatedSailing.error.issues
          );
          throw new Error(
            `Individual sailing validation failed: ${JSON.stringify(validatedSailing.error.issues, null, 2)}`
          );
        }

        expect(validatedSailing.data.ScheduleID).toBeGreaterThan(0);
        expect(validatedSailing.data.SchedRouteID).toBeGreaterThan(0);
        expect(validatedSailing.data.RouteID).toBeGreaterThan(0);
        expect(validatedSailing.data.SailingID).toBeGreaterThan(0);
        expect(typeof validatedSailing.data.SailingDescription).toBe("string");
        expect(typeof validatedSailing.data.SailingNotes).toBe("string");
        expect(validatedSailing.data.DisplayColNum).toBeGreaterThanOrEqual(0);
        expect(validatedSailing.data.SailingDir).toBeGreaterThanOrEqual(0);
        expect(typeof validatedSailing.data.DayOpDescription).toBe("string");
        expect(typeof validatedSailing.data.DayOpUseForHoliday).toBe("boolean");
        expect(Array.isArray(validatedSailing.data.ActiveDateRanges)).toBe(
          true
        );
        expect(Array.isArray(validatedSailing.data.Journs)).toBe(true);
      }
    }
  });

  it("should validate all sailings data structure", async () => {
    console.log("🚀 Testing WSF Schedule API - All Sailings validation...");

    const scheduledRoutes = await getScheduledRoutes();
    if (scheduledRoutes.length > 0) {
      const firstScheduledRoute = scheduledRoutes[0];
      const allSailings = await getAllSailings({
        schedRouteId: firstScheduledRoute.SchedRouteID,
      });

      const validatedData = validationHelpers.expectValidSailingsArray(
        allSailings,
        "all sailings array"
      );

      expect(validatedData).toBeDefined();
      expect(Array.isArray(validatedData)).toBe(true);

      console.log(
        `✅ Successfully validated ${validatedData.length} all sailings for scheduled route ${firstScheduledRoute.RouteAbbrev}`
      );
    }
  });

  it("should validate journey data within sailings", async () => {
    const scheduledRoutes = await getScheduledRoutes();
    if (scheduledRoutes.length > 0) {
      const firstScheduledRoute = scheduledRoutes[0];
      const sailings = await getSailings({
        schedRouteId: firstScheduledRoute.SchedRouteID,
      });

      if (sailings.length > 0 && sailings[0].Journs.length > 0) {
        const firstJourney = sailings[0].Journs[0];

        const validatedJourney =
          validators.journeyData.validateSafe(firstJourney);

        if (!validatedJourney.success) {
          console.error(
            "Journey validation failed:",
            validatedJourney.error.issues
          );
          throw new Error(
            `Journey validation failed: ${JSON.stringify(validatedJourney.error.issues, null, 2)}`
          );
        }

        expect(validatedJourney.data.JourneyID).toBeGreaterThan(0);
        expect(typeof validatedJourney.data.ReservationInd).toBe("boolean");
        expect(typeof validatedJourney.data.InternationalInd).toBe("boolean");
        expect(typeof validatedJourney.data.InterislandInd).toBe("boolean");
        expect(validatedJourney.data.VesselID).toBeGreaterThan(0);
        expect(typeof validatedJourney.data.VesselName).toBe("string");
        expect(typeof validatedJourney.data.VesselHandicapAccessible).toBe(
          "boolean"
        );
        expect(validatedJourney.data.VesselPositionNum).toBeGreaterThan(0);
        expect(Array.isArray(validatedJourney.data.TerminalTimes)).toBe(true);
      }
    }
  });

  it("should validate terminal times within journeys", async () => {
    const scheduledRoutes = await getScheduledRoutes();
    if (scheduledRoutes.length > 0) {
      const firstScheduledRoute = scheduledRoutes[0];
      const sailings = await getSailings({
        schedRouteId: firstScheduledRoute.SchedRouteID,
      });

      if (
        sailings.length > 0 &&
        sailings[0].Journs.length > 0 &&
        sailings[0].Journs[0].TerminalTimes.length > 0
      ) {
        const firstTerminalTime = sailings[0].Journs[0].TerminalTimes[0];

        const validatedTerminalTime =
          validators.terminalTimeData.validateSafe(firstTerminalTime);

        if (!validatedTerminalTime.success) {
          console.error(
            "Terminal time validation failed:",
            validatedTerminalTime.error.issues
          );
          throw new Error(
            `Terminal time validation failed: ${JSON.stringify(validatedTerminalTime.error.issues, null, 2)}`
          );
        }

        expect(validatedTerminalTime.data.JourneyTerminalID).toBeGreaterThan(0);
        expect(validatedTerminalTime.data.TerminalID).toBeGreaterThan(0);
        expect(typeof validatedTerminalTime.data.TerminalDescription).toBe(
          "string"
        );
        expect(typeof validatedTerminalTime.data.TerminalBriefDescription).toBe(
          "string"
        );
        if (validatedTerminalTime.data.Time !== null) {
          expect(validatedTerminalTime.data.Time).toBeInstanceOf(Date);
        }
        expect(typeof validatedTerminalTime.data.IsNA).toBe("boolean");
        expect(Array.isArray(validatedTerminalTime.data.Annotations)).toBe(
          true
        );
      }
    }
  });

  it("should validate terminals data structure", async () => {
    console.log("🚀 Testing WSF Schedule API - Terminals validation...");

    const validDateRange = await getValidDateRange();
    const terminals = await getTerminals({ tripDate: validDateRange.DateFrom });

    const validatedData = validationHelpers.expectValidScheduleTerminalsArray(
      terminals,
      "terminals array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);

    console.log(`✅ Successfully validated ${validatedData.length} terminals`);
  });

  it("should validate individual terminal data", async () => {
    const validDateRange = await getValidDateRange();
    const terminals = await getTerminals({ tripDate: validDateRange.DateFrom });

    if (terminals.length > 0) {
      const firstTerminal = terminals[0];

      const validatedTerminal =
        validators.scheduleTerminalData.validateSafe(firstTerminal);

      if (!validatedTerminal.success) {
        console.error(
          "Individual terminal validation failed:",
          validatedTerminal.error.issues
        );
        throw new Error(
          `Individual terminal validation failed: ${JSON.stringify(validatedTerminal.error.issues, null, 2)}`
        );
      }

      expect(validatedTerminal.data.TerminalID).toBeGreaterThan(0);
      expect(typeof validatedTerminal.data.Description).toBe("string");
    }
  });

  it("should validate terminals and mates data structure", async () => {
    console.log(
      "🚀 Testing WSF Schedule API - Terminals and Mates validation..."
    );

    const validDateRange = await getValidDateRange();
    const terminalCombos = await getTerminalsAndMates({
      tripDate: validDateRange.DateFrom,
    });

    const validatedData =
      validationHelpers.expectValidScheduleTerminalCombosArray(
        terminalCombos,
        "terminals and mates array"
      );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);

    console.log(
      `✅ Successfully validated ${validatedData.length} terminal combinations`
    );
  });

  it("should validate individual terminal combo data", async () => {
    const validDateRange = await getValidDateRange();
    const terminalCombos = await getTerminalsAndMates({
      tripDate: validDateRange.DateFrom,
    });

    if (terminalCombos.length > 0) {
      const firstCombo = terminalCombos[0];

      const validatedCombo =
        validators.scheduleTerminalComboData.validateSafe(firstCombo);

      if (!validatedCombo.success) {
        console.error(
          "Individual terminal combo validation failed:",
          validatedCombo.error.issues
        );
        throw new Error(
          `Individual terminal combo validation failed: ${JSON.stringify(validatedCombo.error.issues, null, 2)}`
        );
      }

      expect(validatedCombo.data.DepartingTerminalID).toBeGreaterThan(0);
      expect(typeof validatedCombo.data.DepartingDescription).toBe("string");
      expect(validatedCombo.data.ArrivingTerminalID).toBeGreaterThan(0);
      expect(typeof validatedCombo.data.ArrivingDescription).toBe("string");
    }
  });

  it("should validate alerts data structure using Zod", async () => {
    console.log("🚀 Testing WSF Schedule API - Alerts validation...");

    const alerts = await getAlerts();

    const validatedData = validationHelpers.expectValidAlertsArray(
      alerts,
      "alerts array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);

    console.log(`✅ Successfully validated ${validatedData.length} alerts`);
  });

  it("should validate individual alert data", async () => {
    const alerts = await getAlerts();

    if (alerts.length > 0) {
      const firstAlert = alerts[0];

      const validatedAlert = validators.alertData.validateSafe(firstAlert);

      if (!validatedAlert.success) {
        console.error(
          "Individual alert validation failed:",
          validatedAlert.error.issues
        );
        throw new Error(
          `Individual alert validation failed: ${JSON.stringify(validatedAlert.error.issues, null, 2)}`
        );
      }

      expect(validatedAlert.data.BulletinID).toBeGreaterThan(0);
      expect(typeof validatedAlert.data.BulletinFlag).toBe("boolean");
      expect(typeof validatedAlert.data.BulletinText).toBe("string");
      expect(typeof validatedAlert.data.CommunicationFlag).toBe("boolean");
      expect(typeof validatedAlert.data.RouteAlertFlag).toBe("boolean");
      expect(typeof validatedAlert.data.RouteAlertText).toBe("string");
      expect(typeof validatedAlert.data.HomepageAlertText).toBe("string");
      expect(validatedAlert.data.PublishDate).toBeInstanceOf(Date);
      expect(typeof validatedAlert.data.AllRoutesFlag).toBe("boolean");
      expect(validatedAlert.data.SortSeq).toBeGreaterThan(0);
      expect(validatedAlert.data.AlertTypeID).toBeGreaterThan(0);
      expect(typeof validatedAlert.data.AlertType).toBe("string");
      expect(typeof validatedAlert.data.AlertFullTitle).toBe("string");
      expect(Array.isArray(validatedAlert.data.AffectedRouteIDs)).toBe(true);
    }
  });

  it("should validate time adjustments data structure using Zod", async () => {
    console.log("🚀 Testing WSF Schedule API - Time Adjustments validation...");

    const timeAdjustments = await getTimeAdjustments();

    const validatedData = validationHelpers.expectValidTimeAdjustmentsArray(
      timeAdjustments,
      "time adjustments array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);

    console.log(
      `✅ Successfully validated ${validatedData.length} time adjustments`
    );
  });

  it("should validate individual time adjustment data", async () => {
    const timeAdjustments = await getTimeAdjustments();

    if (timeAdjustments.length > 0) {
      const firstAdjustment = timeAdjustments[0];

      const validatedAdjustment =
        validators.timeAdjustmentData.validateSafe(firstAdjustment);

      if (!validatedAdjustment.success) {
        console.error(
          "Individual time adjustment validation failed:",
          validatedAdjustment.error.issues
        );
        throw new Error(
          `Individual time adjustment validation failed: ${JSON.stringify(validatedAdjustment.error.issues, null, 2)}`
        );
      }

      expect(validatedAdjustment.data.ScheduleID).toBeGreaterThan(0);
      expect(validatedAdjustment.data.SchedRouteID).toBeGreaterThan(0);
      expect(validatedAdjustment.data.RouteID).toBeGreaterThan(0);
      expect(typeof validatedAdjustment.data.RouteDescription).toBe("string");
      expect(validatedAdjustment.data.RouteSortSeq).toBeGreaterThan(0);
      expect(validatedAdjustment.data.SailingID).toBeGreaterThan(0);
      expect(typeof validatedAdjustment.data.SailingDescription).toBe("string");
      expect(validatedAdjustment.data.SailingDir).toBeGreaterThan(0);
      expect(validatedAdjustment.data.JourneyID).toBeGreaterThan(0);
      expect(validatedAdjustment.data.VesselID).toBeGreaterThan(0);
      expect(typeof validatedAdjustment.data.VesselName).toBe("string");
      expect(typeof validatedAdjustment.data.VesselHandicapAccessible).toBe(
        "boolean"
      );
      expect(validatedAdjustment.data.VesselPositionNum).toBeGreaterThan(0);
      expect(validatedAdjustment.data.TerminalID).toBeGreaterThan(0);
      expect(typeof validatedAdjustment.data.TerminalDescription).toBe(
        "string"
      );
      expect(typeof validatedAdjustment.data.TerminalBriefDescription).toBe(
        "string"
      );
      expect(validatedAdjustment.data.JourneyTerminalID).toBeGreaterThan(0);
      expect(validatedAdjustment.data.DepArrIndicator).toBeGreaterThan(0);
      expect(validatedAdjustment.data.AdjDateFrom).toBeInstanceOf(Date);
      expect(validatedAdjustment.data.AdjDateThru).toBeInstanceOf(Date);
      expect(validatedAdjustment.data.AdjType).toBeGreaterThan(0);
      expect(typeof validatedAdjustment.data.TidalAdj).toBe("boolean");
      expect(Array.isArray(validatedAdjustment.data.Annotations)).toBe(true);
    }
  });

  it("should validate time adjustments by route", async () => {
    console.log(
      "🚀 Testing WSF Schedule API - Time Adjustments by Route validation..."
    );

    const validDateRange = await getValidDateRange();
    const routes = await getRoutes({ tripDate: validDateRange.DateFrom });

    if (routes.length > 0) {
      const firstRoute = routes[0];
      const timeAdjustments = await getTimeAdjustmentsByRoute({
        routeId: firstRoute.RouteID,
      });

      const validatedData = validationHelpers.expectValidTimeAdjustmentsArray(
        timeAdjustments,
        "time adjustments by route array"
      );

      expect(validatedData).toBeDefined();
      expect(Array.isArray(validatedData)).toBe(true);

      console.log(
        `✅ Successfully validated ${validatedData.length} time adjustments for route ${firstRoute.RouteAbbrev}`
      );
    }
  });

  it("should validate time adjustments by scheduled route", async () => {
    console.log(
      "🚀 Testing WSF Schedule API - Time Adjustments by Scheduled Route validation..."
    );

    const scheduledRoutes = await getScheduledRoutes();
    if (scheduledRoutes.length > 0) {
      const firstScheduledRoute = scheduledRoutes[0];
      const timeAdjustments = await getTimeAdjustmentsBySchedRoute({
        schedRouteId: firstScheduledRoute.SchedRouteID,
      });

      const validatedData = validationHelpers.expectValidTimeAdjustmentsArray(
        timeAdjustments,
        "time adjustments by scheduled route array"
      );

      expect(validatedData).toBeDefined();
      expect(Array.isArray(validatedData)).toBe(true);

      console.log(
        `✅ Successfully validated ${validatedData.length} time adjustments for scheduled route ${firstScheduledRoute.RouteAbbrev}`
      );
    }
  });

  it("should validate active seasons data structure using Zod", async () => {
    console.log("🚀 Testing WSF Schedule API - Active Seasons validation...");

    const activeSeasons = await getActiveSeasons();

    const validatedData = validationHelpers.expectValidActiveSeasonsArray(
      activeSeasons,
      "active seasons array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);

    console.log(
      `✅ Successfully validated ${validatedData.length} active seasons`
    );
  });

  it("should validate individual active season data", async () => {
    const activeSeasons = await getActiveSeasons();

    if (activeSeasons.length > 0) {
      const firstSeason = activeSeasons[0];

      const validatedSeason =
        validators.activeSeasonData.validateSafe(firstSeason);

      if (!validatedSeason.success) {
        console.error(
          "Individual active season validation failed:",
          validatedSeason.error.issues
        );
        throw new Error(
          `Individual active season validation failed: ${JSON.stringify(validatedSeason.error.issues, null, 2)}`
        );
      }

      expect(validatedSeason.data.ScheduleID).toBeGreaterThan(0);
      expect(typeof validatedSeason.data.ScheduleName).toBe("string");
      expect(validatedSeason.data.ScheduleSeason).toBeGreaterThan(0);
      expect(typeof validatedSeason.data.SchedulePDFUrl).toBe("string");
      expect(validatedSeason.data.ScheduleStart).toBeInstanceOf(Date);
      expect(validatedSeason.data.ScheduleEnd).toBeInstanceOf(Date);
    }
  });

  it("should validate alternative formats data structure using Zod", async () => {
    console.log(
      "🚀 Testing WSF Schedule API - Alternative Formats validation..."
    );

    const alternativeFormats = await getAlternativeFormats({
      subjectName: "schedule",
    });

    const validatedData = validationHelpers.expectValidAlternativeFormatsArray(
      alternativeFormats,
      "alternative formats array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);

    console.log(
      `✅ Successfully validated ${validatedData.length} alternative formats`
    );
  });

  it("should validate individual alternative format data", async () => {
    const alternativeFormats = await getAlternativeFormats({
      subjectName: "schedule",
    });

    if (alternativeFormats.length > 0) {
      const firstFormat = alternativeFormats[0];

      const validatedFormat =
        validators.alternativeFormatData.validateSafe(firstFormat);

      if (!validatedFormat.success) {
        console.error(
          "Individual alternative format validation failed:",
          validatedFormat.error.issues
        );
        throw new Error(
          `Individual alternative format validation failed: ${JSON.stringify(validatedFormat.error.issues, null, 2)}`
        );
      }

      expect(validatedFormat.data.AltID).toBeGreaterThan(0);
      expect(validatedFormat.data.SubjectID).toBeGreaterThan(0);
      expect(typeof validatedFormat.data.SubjectName).toBe("string");
      expect(typeof validatedFormat.data.AltTitle).toBe("string");
      expect(typeof validatedFormat.data.AltUrl).toBe("string");
      expect(typeof validatedFormat.data.AltDesc).toBe("string");
      expect(typeof validatedFormat.data.FileType).toBe("string");
      expect(typeof validatedFormat.data.Status).toBe("string");
      expect(validatedFormat.data.SortSeq).toBeGreaterThan(0);
      expect(typeof validatedFormat.data.ModifiedBy).toBe("string");
    }
  });

  it("should validate valid date range data", async () => {
    console.log("🚀 Testing WSF Schedule API - Valid Date Range validation...");

    const validDateRange = await getValidDateRange();

    const validatedData =
      validators.validDateRangeData.validateSafe(validDateRange);

    if (!validatedData.success) {
      console.error(
        "Valid date range validation failed:",
        validatedData.error.issues
      );
      throw new Error(
        `Valid date range validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`
      );
    }

    expect(validatedData.data.DateFrom).toBeInstanceOf(Date);
    expect(validatedData.data.DateThru).toBeInstanceOf(Date);
    expect(validatedData.data.DateFrom.getTime()).toBeLessThanOrEqual(
      validatedData.data.DateThru.getTime()
    );

    console.log("✅ Successfully validated valid date range");
  });

  it("should validate schedule cache flush date data", async () => {
    console.log("🚀 Testing WSF Schedule API - Cache Flush Date validation...");

    const cacheFlushDate = await getCacheFlushDateSchedule();

    const validatedData =
      validators.scheduleCacheFlushDateData.validateSafe(cacheFlushDate);

    if (!validatedData.success) {
      console.error(
        "Cache flush date validation failed:",
        validatedData.error.issues
      );
      throw new Error(
        `Cache flush date validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`
      );
    }

    expect(validatedData.data).toBeInstanceOf(Date);

    console.log("✅ Successfully validated cache flush date");
  });

  it("should provide detailed error information when validation fails", () => {
    // Test with malformed data
    const malformedData = [
      {
        ScheduleID: "not a number",
        SchedRouteID: "not a number",
        RouteID: "not a number",
        RouteAbbrev: 123, // should be string
        Description: 456, // should be string
        SeasonalRouteNotes: 789, // should be string
        RegionID: "not a number",
        ContingencyOnly: "not a boolean",
        ServiceDisruptions: "not an array",
        ContingencyAdj: "not an array",
      },
    ];

    const result = validators.scheduledRoutesArray.validateSafe(malformedData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(result.error.issues.length).toBeGreaterThan(0);

      console.log("Validation Error Details:", {
        context: "malformed scheduled routes",
        errors: result.error.issues,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    console.log("🚀 Demonstrating single-line validation power...");

    // Single line validates entire structure including nested objects
    const scheduledRoutes = await getScheduledRoutes();
    const validatedScheduledRoutes =
      validationHelpers.expectValidScheduledRoutesArray(
        scheduledRoutes,
        "scheduled routes array"
      );

    const alerts = await getAlerts();
    const validatedAlerts = validationHelpers.expectValidAlertsArray(
      alerts,
      "alerts array"
    );

    const timeAdjustments = await getTimeAdjustments();
    const validatedTimeAdjustments =
      validationHelpers.expectValidTimeAdjustmentsArray(
        timeAdjustments,
        "time adjustments array"
      );

    // Data is now guaranteed to match TypeScript type
    expect(validatedScheduledRoutes).toBeInstanceOf(Array);
    expect(validatedAlerts).toBeInstanceOf(Array);
    expect(validatedTimeAdjustments).toBeInstanceOf(Array);

    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ WSF Schedule API validation tests completed");
});
