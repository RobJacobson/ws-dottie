import { expect } from "vitest";

import { WsdApiError } from "@/shared/fetching/errors";

// Rate limiting utility - be respectful to WSF API
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Performance monitoring
export const measureApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<{ data: T; duration: number }> => {
  const start = Date.now();
  const data = await apiCall();
  const duration = Date.now() - start;

  return { data, duration };
};

// Performance tracking
export const trackPerformance = (endpoint: string, duration: number) => {
  console.log(`📊 ${endpoint}: ${duration}ms`);

  if (duration > 2000) {
    console.warn(`⚠️  ${endpoint} exceeded 2-second benchmark: ${duration}ms`);
  }

  return duration;
};

// Data validation utilities
export const validateVesselLocation = (data: any) => {
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("Mmsi");
  expect(data).toHaveProperty("DepartingTerminalID");
  expect(data).toHaveProperty("DepartingTerminalName");
  expect(data).toHaveProperty("DepartingTerminalAbbrev");
  expect(data).toHaveProperty("ArrivingTerminalID");
  expect(data).toHaveProperty("ArrivingTerminalName");
  expect(data).toHaveProperty("ArrivingTerminalAbbrev");
  expect(data).toHaveProperty("Latitude");
  expect(data).toHaveProperty("Longitude");
  expect(data).toHaveProperty("Speed");
  expect(data).toHaveProperty("Heading");
  expect(data).toHaveProperty("InService");
  expect(data).toHaveProperty("AtDock");
  expect(data).toHaveProperty("LeftDock");
  expect(data).toHaveProperty("Eta");
  expect(data).toHaveProperty("EtaBasis");
  expect(data).toHaveProperty("ScheduledDeparture");
  expect(data).toHaveProperty("OpRouteAbbrev");
  expect(Array.isArray(data.OpRouteAbbrev)).toBe(true);
  expect(data).toHaveProperty("VesselPositionNum");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("ManagedBy");
  expect(data).toHaveProperty("TimeStamp");
  expect(data).toHaveProperty("VesselWatchShutID");
  expect(data).toHaveProperty("VesselWatchShutMsg");
  expect(data).toHaveProperty("VesselWatchShutFlag");
};

export const validateVesselVerbose = (data: any) => {
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("RegDeckSpace");
  expect(data).toHaveProperty("MaxPassengerCount");
  expect(data).toHaveProperty("YearBuilt");
};

export const validateVesselBasic = (data: any) => {
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("VesselAbbrev");
  expect(data).toHaveProperty("Class");
  expect(data.Class).toHaveProperty("ClassID");
  expect(data.Class).toHaveProperty("ClassName");
  expect(data.Class).toHaveProperty("PublicDisplayName");
  expect(data.Class).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("Status");
  expect(data).toHaveProperty("OwnedByWSF");
};

export const validateVesselAccommodation = (data: any) => {
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselSubjectID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("VesselAbbrev");
  expect(data).toHaveProperty("Class");
  expect(data).toHaveProperty("CarDeckRestroom");
  expect(data).toHaveProperty("CarDeckShelter");
  expect(data).toHaveProperty("Elevator");
  expect(data).toHaveProperty("ADAAccessible");
  expect(data).toHaveProperty("MainCabinGalley");
  expect(data).toHaveProperty("MainCabinRestroom");
  expect(data).toHaveProperty("PublicWifi");
  expect(data).toHaveProperty("ADAInfo");
  expect(data).toHaveProperty("AdditionalInfo");
};

export const validateVesselStats = (data: any) => {
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("StatID");
  expect(data).toHaveProperty("StatName");
  expect(data).toHaveProperty("StatValue");
  expect(data).toHaveProperty("StatUnit");
  expect(data).toHaveProperty("IsActive");
};

export const validateVesselHistory = (data: any) => {
  expect(data).toHaveProperty("VesselId");
  expect(data).toHaveProperty("Vessel");
  expect(data).toHaveProperty("Departing");
  expect(data).toHaveProperty("Arriving");
  expect(data).toHaveProperty("ScheduledDepart");
  expect(data).toHaveProperty("ActualDepart");
  expect(data).toHaveProperty("EstArrival");
  expect(data).toHaveProperty("Date");
};

export const validateCacheFlushDate = (data: any) => {
  expect(data).toHaveProperty("LastUpdated");
  expect(data.LastUpdated).toBeInstanceOf(Date);
};

export const validateTerminalBasics = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("TerminalName");
  expect(data).toHaveProperty("TerminalAbbrev");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("OverheadPassengerLoading");
  expect(data).toHaveProperty("Elevator");
  expect(data).toHaveProperty("WaitingRoom");
  expect(data).toHaveProperty("FoodService");
  expect(data).toHaveProperty("Restroom");
};

export const validateTerminalSailingSpace = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("TerminalName");
  expect(data).toHaveProperty("TerminalAbbrev");
  expect(data).toHaveProperty("DepartingSpaces");
  expect(Array.isArray(data.DepartingSpaces)).toBe(true);

  // Validate first departing space if it exists
  if (data.DepartingSpaces.length > 0) {
    const firstDeparture = data.DepartingSpaces[0];
    expect(firstDeparture).toHaveProperty("Departure");
    expect(firstDeparture.Departure).toBeInstanceOf(Date);
    expect(firstDeparture).toHaveProperty("VesselID");
    expect(firstDeparture).toHaveProperty("VesselName");
    expect(firstDeparture).toHaveProperty("MaxSpaceCount");
    expect(firstDeparture).toHaveProperty("SpaceForArrivalTerminals");
    expect(Array.isArray(firstDeparture.SpaceForArrivalTerminals)).toBe(true);
  }
};

export const validateTerminalLocation = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("TerminalSubjectID");
  expect(data).toHaveProperty("RegionID");
  expect(data).toHaveProperty("TerminalName");
  expect(data).toHaveProperty("TerminalAbbrev");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("AddressLineOne");
  expect(data).toHaveProperty("City");
  expect(data).toHaveProperty("State");
  expect(data).toHaveProperty("ZipCode");
  expect(data).toHaveProperty("Country");
  expect(data).toHaveProperty("Latitude");
  expect(data).toHaveProperty("Longitude");
  expect(data).toHaveProperty("DispGISZoomLoc");
  expect(Array.isArray(data.DispGISZoomLoc)).toBe(true);
  if (data.DispGISZoomLoc.length > 0) {
    const firstZoom = data.DispGISZoomLoc[0];
    expect(firstZoom).toHaveProperty("Latitude");
    expect(firstZoom).toHaveProperty("Longitude");
    expect(firstZoom).toHaveProperty("ZoomLevel");
  }
};

export const validateTerminalWaitTimes = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("TerminalSubjectID");
  expect(data).toHaveProperty("RegionID");
  expect(data).toHaveProperty("TerminalName");
  expect(data).toHaveProperty("TerminalAbbrev");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("WaitTimes");
  expect(Array.isArray(data.WaitTimes)).toBe(true);

  // Validate first wait time if it exists
  if (data.WaitTimes.length > 0) {
    const firstWaitTime = data.WaitTimes[0];
    expect(firstWaitTime).toHaveProperty("RouteID");
    expect(firstWaitTime).toHaveProperty("RouteName");
    expect(firstWaitTime).toHaveProperty("WaitTimeLastUpdated");
    expect(firstWaitTime.WaitTimeLastUpdated).toBeInstanceOf(Date);
  }
};

export const validateTerminalVerbose = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("TerminalSubjectID");
  expect(data).toHaveProperty("RegionID");
  expect(data).toHaveProperty("TerminalName");
  expect(data).toHaveProperty("TerminalAbbrev");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("AddressLineOne");
  expect(data).toHaveProperty("City");
  expect(data).toHaveProperty("State");
  expect(data).toHaveProperty("ZipCode");
  expect(data).toHaveProperty("Country");
  expect(data).toHaveProperty("Latitude");
  expect(data).toHaveProperty("Longitude");
  expect(data).toHaveProperty("Elevator");
  expect(data).toHaveProperty("WaitingRoom");
  expect(data).toHaveProperty("FoodService");
  expect(data).toHaveProperty("Restroom");
  expect(data).toHaveProperty("OverheadPassengerLoading");
  expect(data).toHaveProperty("TransitLinks");
  expect(data).toHaveProperty("WaitTimes");
  expect(Array.isArray(data.TransitLinks)).toBe(true);
  expect(Array.isArray(data.WaitTimes)).toBe(true);

  // Validate first transit link if it exists
  if (data.TransitLinks.length > 0) {
    const firstTransitLink = data.TransitLinks[0];
    expect(firstTransitLink).toHaveProperty("LinkName");
    expect(firstTransitLink).toHaveProperty("LinkURL");
    expect(firstTransitLink).toHaveProperty("SortSeq");
  }

  // Validate first wait time if it exists
  if (data.WaitTimes.length > 0) {
    const firstWaitTime = data.WaitTimes[0];
    expect(firstWaitTime).toHaveProperty("RouteID");
    expect(firstWaitTime).toHaveProperty("RouteName");
    expect(firstWaitTime).toHaveProperty("WaitTimeLastUpdated");
    expect(firstWaitTime.WaitTimeLastUpdated).toBeInstanceOf(Date);
  }
};

export const validateFare = (data: any) => {
  expect(data).toHaveProperty("FareID");
  expect(data).toHaveProperty("FareName");
  expect(data).toHaveProperty("FareAmount");
  expect(data).toHaveProperty("LastUpdated");
  expect(data.LastUpdated).toBeInstanceOf(Date);
};

export const validateRoute = (data: any) => {
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteName");
  expect(data).toHaveProperty("LastUpdated");
  expect(data.LastUpdated).toBeInstanceOf(Date);
};

// Error validation
export const validateApiError = (
  error: any,
  expectedCode?: string | string[]
) => {
  expect(error).toBeInstanceOf(WsdApiError);
  expect(error).toHaveProperty("code");
  expect(error).toHaveProperty("message");
  expect(error).toHaveProperty("getUserMessage");

  if (expectedCode) {
    if (Array.isArray(expectedCode)) {
      expect(expectedCode).toContain(error.code);
    } else {
      expect(error.code).toBe(expectedCode);
    }
  }
};

// Test data constants
export const TEST_VESSEL_ID = 1; // M/V Cathlamet
export const TEST_TERMINAL_ID = 7; // Seattle (actual API returns Seattle for 7)
export const TEST_ROUTE_ID = 1; // Anacortes - Friday Harbor
export const TEST_FARE_ID = 1;

// Invalid test data
export const INVALID_VESSEL_ID = 99999;
export const INVALID_TERMINAL_ID = 99999;
export const INVALID_ROUTE_ID = 99999;
export const INVALID_FARE_ID = 99999;

// Rate limiting between tests
export const RATE_LIMIT_DELAY = 1000; // 1 second between API calls
