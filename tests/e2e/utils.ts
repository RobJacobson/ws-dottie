import { expect } from "vitest";

import { WsdotApiError } from "@/shared/fetching/errors";

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
  expect(data).toHaveProperty("VesselSubjectID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("VesselAbbrev");
  expect(data).toHaveProperty("Class");
  expect(data).toHaveProperty("VesselNameDesc");
  expect(data).toHaveProperty("VesselHistory");
  expect(data).toHaveProperty("Beam");
  expect(data).toHaveProperty("CityBuilt");
  expect(data).toHaveProperty("SpeedInKnots");
  expect(data).toHaveProperty("Draft");
  expect(data).toHaveProperty("EngineCount");
  expect(data).toHaveProperty("Horsepower");
  expect(data).toHaveProperty("Length");
  expect(data).toHaveProperty("MaxPassengerCount");
  expect(data).toHaveProperty("PassengerOnly");
  expect(data).toHaveProperty("FastFerry");
  expect(data).toHaveProperty("PropulsionInfo");
  expect(data).toHaveProperty("TallDeckClearance");
  expect(data).toHaveProperty("RegDeckSpace");
  expect(data).toHaveProperty("TallDeckSpace");
  expect(data).toHaveProperty("Tonnage");
  expect(data).toHaveProperty("Displacement");
  expect(data).toHaveProperty("YearBuilt");
  expect(data).toHaveProperty("VesselDrawingImg");
  expect(data).toHaveProperty("SolasCertified");
  expect(data).toHaveProperty("MaxPassengerCountForInternational");
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
  expect(data).toBeInstanceOf(Date);
  expect(data.getTime()).toBeGreaterThan(0);
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
    // SortSeq can be null in actual API
    if (firstTransitLink.SortSeq !== null) {
      expect(typeof firstTransitLink.SortSeq).toBe("number");
    }
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

// Fares API validation functions
export const validateFaresCacheFlushDate = (data: any) => {
  expect(data).toBeInstanceOf(Date);
  expect(data.getTime()).toBeGreaterThan(0);
};

export const validateFaresValidDateRange = (data: any) => {
  expect(data).toHaveProperty("DateFrom");
  expect(data).toHaveProperty("DateThru");
  expect(data.DateFrom).toBeInstanceOf(Date);
  expect(data.DateThru).toBeInstanceOf(Date);
  expect(data.DateFrom.getTime()).toBeLessThan(data.DateThru.getTime());
};

export const validateFaresTerminal = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("Description");
  expect(typeof data.TerminalID).toBe("number");
  expect(typeof data.Description).toBe("string");
  expect(data.TerminalID).toBeGreaterThan(0);
  expect(data.Description.length).toBeGreaterThan(0);
};

export const validateFaresTerminalMate = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("Description");
  expect(typeof data.TerminalID).toBe("number");
  expect(typeof data.Description).toBe("string");
  expect(data.TerminalID).toBeGreaterThan(0);
  expect(data.Description.length).toBeGreaterThan(0);
};

export const validateFaresTerminalCombo = (data: any) => {
  expect(data).toHaveProperty("DepartingDescription");
  expect(data).toHaveProperty("ArrivingDescription");
  expect(data).toHaveProperty("CollectionDescription");
  expect(typeof data.DepartingDescription).toBe("string");
  expect(typeof data.ArrivingDescription).toBe("string");
  expect(typeof data.CollectionDescription).toBe("string");
  expect(data.DepartingDescription.length).toBeGreaterThan(0);
  expect(data.ArrivingDescription.length).toBeGreaterThan(0);
  expect(data.CollectionDescription.length).toBeGreaterThan(0);
};

export const validateFaresTerminalComboVerbose = (data: any) => {
  expect(data).toHaveProperty("DepartingTerminalID");
  expect(data).toHaveProperty("DepartingDescription");
  expect(data).toHaveProperty("ArrivingTerminalID");
  expect(data).toHaveProperty("ArrivingDescription");
  expect(data).toHaveProperty("CollectionDescription");
  expect(typeof data.DepartingTerminalID).toBe("number");
  expect(typeof data.DepartingDescription).toBe("string");
  expect(typeof data.ArrivingTerminalID).toBe("number");
  expect(typeof data.ArrivingDescription).toBe("string");
  expect(typeof data.CollectionDescription).toBe("string");
  expect(data.DepartingTerminalID).toBeGreaterThan(0);
  expect(data.ArrivingTerminalID).toBeGreaterThan(0);
  expect(data.DepartingDescription.length).toBeGreaterThan(0);
  expect(data.ArrivingDescription.length).toBeGreaterThan(0);
  expect(data.CollectionDescription.length).toBeGreaterThan(0);
};

export const validateFareLineItemBasic = (data: any) => {
  expect(data).toHaveProperty("FareLineItemID");
  expect(data).toHaveProperty("FareLineItem");
  expect(data).toHaveProperty("Category");
  expect(data).toHaveProperty("DirectionIndependent");
  expect(data).toHaveProperty("Amount");
  expect(typeof data.FareLineItemID).toBe("number");
  expect(typeof data.FareLineItem).toBe("string");
  expect(typeof data.Category).toBe("string");
  expect(typeof data.DirectionIndependent).toBe("boolean");
  expect(typeof data.Amount).toBe("number");
  expect(data.FareLineItemID).toBeGreaterThan(0);
  expect(data.FareLineItem.length).toBeGreaterThan(0);
  expect(data.Category.length).toBeGreaterThan(0);
  expect(data.Amount).toBeGreaterThanOrEqual(0);
};

export const validateFareLineItem = (data: any) => {
  expect(data).toHaveProperty("FareLineItemID");
  expect(data).toHaveProperty("FareLineItem");
  expect(data).toHaveProperty("Category");
  expect(data).toHaveProperty("DirectionIndependent");
  expect(data).toHaveProperty("Amount");
  expect(typeof data.FareLineItemID).toBe("number");
  expect(typeof data.FareLineItem).toBe("string");
  expect(typeof data.Category).toBe("string");
  expect(typeof data.DirectionIndependent).toBe("boolean");
  expect(typeof data.Amount).toBe("number");
  expect(data.FareLineItemID).toBeGreaterThan(0);
  expect(data.FareLineItem.length).toBeGreaterThan(0);
  expect(data.Category.length).toBeGreaterThan(0);
  expect(data.Amount).toBeGreaterThanOrEqual(0);
};

export const validateFareLineItemVerbose = (data: any) => {
  expect(data).toHaveProperty("DepartingTerminalID");
  expect(data).toHaveProperty("DepartingDescription");
  expect(data).toHaveProperty("ArrivingTerminalID");
  expect(data).toHaveProperty("ArrivingDescription");
  expect(data).toHaveProperty("FareLineItemID");
  expect(data).toHaveProperty("FareLineItem");
  expect(data).toHaveProperty("Category");
  expect(data).toHaveProperty("DirectionIndependent");
  expect(data).toHaveProperty("Amount");
  expect(data).toHaveProperty("RoundTrip");
  expect(typeof data.DepartingTerminalID).toBe("number");
  expect(typeof data.DepartingDescription).toBe("string");
  expect(typeof data.ArrivingTerminalID).toBe("number");
  expect(typeof data.ArrivingDescription).toBe("string");
  expect(typeof data.FareLineItemID).toBe("number");
  expect(typeof data.FareLineItem).toBe("string");
  expect(typeof data.Category).toBe("string");
  expect(typeof data.DirectionIndependent).toBe("boolean");
  expect(typeof data.Amount).toBe("number");
  expect(typeof data.RoundTrip).toBe("boolean");
};

export const validateFareLineItemsVerboseResponse = (data: any) => {
  expect(data).toHaveProperty("TerminalComboVerbose");
  expect(data).toHaveProperty("LineItemLookup");
  expect(data).toHaveProperty("LineItems");
  expect(data).toHaveProperty("RoundTripLineItems");
  expect(Array.isArray(data.TerminalComboVerbose)).toBe(true);
  expect(Array.isArray(data.LineItemLookup)).toBe(true);
  expect(Array.isArray(data.LineItems)).toBe(true);
  expect(Array.isArray(data.RoundTripLineItems)).toBe(true);

  // Validate first terminal combo if available
  if (data.TerminalComboVerbose.length > 0) {
    validateFaresTerminalComboVerbose(data.TerminalComboVerbose[0]);
  }

  // Validate first line item lookup if available
  if (data.LineItemLookup.length > 0) {
    const lookup = data.LineItemLookup[0];
    expect(lookup).toHaveProperty("TerminalComboIndex");
    expect(lookup).toHaveProperty("LineItemIndex");
    expect(lookup).toHaveProperty("RoundTripLineItemIndex");
    expect(typeof lookup.TerminalComboIndex).toBe("number");
    expect(typeof lookup.LineItemIndex).toBe("number");
    expect(typeof lookup.RoundTripLineItemIndex).toBe("number");
  }

  // Validate first line items array if available
  if (data.LineItems.length > 0 && data.LineItems[0].length > 0) {
    validateFareLineItem(data.LineItems[0][0]);
  }

  // Validate first round trip line items array if available
  if (
    data.RoundTripLineItems.length > 0 &&
    data.RoundTripLineItems[0].length > 0
  ) {
    validateFareLineItem(data.RoundTripLineItems[0][0]);
  }
};

export const validateFareTotal = (data: any) => {
  expect(data).toHaveProperty("TotalType");
  expect(data).toHaveProperty("Description");
  expect(data).toHaveProperty("BriefDescription");
  expect(data).toHaveProperty("Amount");
  expect(typeof data.TotalType).toBe("number");
  expect(typeof data.Description).toBe("string");
  expect(typeof data.BriefDescription).toBe("string");
  expect(typeof data.Amount).toBe("number");
  expect(data.TotalType).toBeGreaterThanOrEqual(0);
  expect(data.Description.length).toBeGreaterThan(0);
  expect(data.BriefDescription.length).toBeGreaterThan(0);
  expect(data.Amount).toBeGreaterThanOrEqual(0);
};

// Legacy fare validation (keeping for backward compatibility)
export const validateFare = (data: any) => {
  expect(data).toHaveProperty("FareID");
  expect(data).toHaveProperty("FareName");
  expect(data).toHaveProperty("FareAmount");
  expect(data).toHaveProperty("LastUpdated");
  expect(data.LastUpdated).toBeInstanceOf(Date);
};

export const validateRoute = (data: any) => {
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteAbbrev");
  expect(data).toHaveProperty("Description");
  expect(data).toHaveProperty("RegionID");
  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.RouteAbbrev).toBe("string");
  expect(typeof data.Description).toBe("string");
  expect(typeof data.RegionID).toBe("number");
};

export const validateRouteDetails = (data: any) => {
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteAbbrev");
  expect(data).toHaveProperty("Description");
  expect(data).toHaveProperty("RegionID");
  expect(data).toHaveProperty("CrossingTime");
  expect(data).toHaveProperty("ReservationFlag");
  expect(data).toHaveProperty("PassengerOnlyFlag");
  expect(data).toHaveProperty("InternationalFlag");
  expect(data).toHaveProperty("VesselWatchID");
  expect(data).toHaveProperty("GeneralRouteNotes");
  expect(data).toHaveProperty("SeasonalRouteNotes");
  expect(data).toHaveProperty("AdaNotes");
  expect(data).toHaveProperty("Alerts");

  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.RouteAbbrev).toBe("string");
  expect(typeof data.Description).toBe("string");
  expect(typeof data.RegionID).toBe("number");
  // CrossingTime can be number, string, or object depending on the endpoint
  expect(data.CrossingTime !== undefined).toBe(true);
  expect(typeof data.ReservationFlag).toBe("boolean");
  expect(typeof data.PassengerOnlyFlag).toBe("boolean");
  expect(typeof data.InternationalFlag).toBe("boolean");
  expect(typeof data.VesselWatchID).toBe("number");
  expect(typeof data.GeneralRouteNotes).toBe("string");
  expect(typeof data.SeasonalRouteNotes).toBe("string");
  // AdaNotes can be string or object depending on the endpoint
  expect(data.AdaNotes !== undefined).toBe(true);
  expect(Array.isArray(data.Alerts)).toBe(true);
};

// Schedule API validation functions
export const validateScheduleCacheFlushDate = (data: any) => {
  expect(data).toBeInstanceOf(Date);
  expect(data.getTime()).toBeGreaterThan(0);
};

export const validateValidDateRange = (data: any) => {
  expect(data).toHaveProperty("DateFrom");
  expect(data).toHaveProperty("DateThru");
  expect(data.DateFrom).toBeInstanceOf(Date);
  expect(data.DateThru).toBeInstanceOf(Date);
  expect(data.DateFrom.getTime()).toBeLessThan(data.DateThru.getTime());
};

export const validateActiveSeason = (data: any) => {
  expect(data).toHaveProperty("ScheduleID");
  expect(data).toHaveProperty("ScheduleName");
  expect(data).toHaveProperty("ScheduleSeason");
  expect(data).toHaveProperty("SchedulePDFUrl");
  expect(data).toHaveProperty("ScheduleStart");
  expect(data).toHaveProperty("ScheduleEnd");
  expect(typeof data.ScheduleID).toBe("number");
  expect(typeof data.ScheduleName).toBe("string");
  expect(typeof data.ScheduleSeason).toBe("number");
  expect(typeof data.SchedulePDFUrl).toBe("string");
  expect(data.ScheduleStart).toBeInstanceOf(Date);
  expect(data.ScheduleEnd).toBeInstanceOf(Date);
};

export const validateScheduledRoute = (data: any) => {
  expect(data).toHaveProperty("ScheduleID");
  expect(data).toHaveProperty("SchedRouteID");
  expect(data).toHaveProperty("ContingencyOnly");
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteAbbrev");
  expect(data).toHaveProperty("Description");
  expect(data).toHaveProperty("SeasonalRouteNotes");
  expect(data).toHaveProperty("RegionID");
  expect(data).toHaveProperty("ServiceDisruptions");
  expect(data).toHaveProperty("ContingencyAdj");
  expect(typeof data.ScheduleID).toBe("number");
  expect(typeof data.SchedRouteID).toBe("number");
  expect(typeof data.ContingencyOnly).toBe("boolean");
  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.RouteAbbrev).toBe("string");
  expect(typeof data.Description).toBe("string");
  // SeasonalRouteNotes can be string or object depending on the API response
  expect(data.SeasonalRouteNotes !== undefined).toBe(true);
  expect(typeof data.RegionID).toBe("number");
  expect(Array.isArray(data.ServiceDisruptions)).toBe(true);
  expect(Array.isArray(data.ContingencyAdj)).toBe(true);
};

export const validateScheduleTerminal = (data: any) => {
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("Description");
  expect(typeof data.TerminalID).toBe("number");
  expect(typeof data.Description).toBe("string");
};

export const validateScheduleTerminalCombo = (data: any) => {
  expect(data).toHaveProperty("DepartingTerminalID");
  expect(data).toHaveProperty("DepartingDescription");
  expect(data).toHaveProperty("ArrivingTerminalID");
  expect(data).toHaveProperty("ArrivingDescription");
  expect(typeof data.DepartingTerminalID).toBe("number");
  expect(typeof data.DepartingDescription).toBe("string");
  expect(typeof data.ArrivingTerminalID).toBe("number");
  expect(typeof data.ArrivingDescription).toBe("string");
};

export const validateScheduleRoute = (data: any) => {
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteAbbrev");
  expect(data).toHaveProperty("Description");
  expect(data).toHaveProperty("RegionID");
  // Alerts property is optional and may not always be present
  if (Object.hasOwn(data, "Alerts")) {
    expect(Array.isArray(data.Alerts)).toBe(true);
  }
  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.RouteAbbrev).toBe("string");
  expect(typeof data.Description).toBe("string");
  expect(typeof data.RegionID).toBe("number");
};

export const validateSailing = (data: any) => {
  expect(data).toHaveProperty("ScheduleID");
  expect(data).toHaveProperty("SchedRouteID");
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("SailingID");
  expect(data).toHaveProperty("SailingDescription");
  expect(data).toHaveProperty("SailingNotes");
  expect(data).toHaveProperty("DisplayColNum");
  expect(data).toHaveProperty("SailingDir");
  expect(data).toHaveProperty("DayOpDescription");
  expect(data).toHaveProperty("DayOpUseForHoliday");
  expect(data).toHaveProperty("ActiveDateRanges");
  expect(data).toHaveProperty("Journs");
  expect(typeof data.ScheduleID).toBe("number");
  expect(typeof data.SchedRouteID).toBe("number");
  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.SailingID).toBe("number");
  expect(typeof data.SailingDescription).toBe("string");
  // SailingNotes can be string or object depending on the endpoint
  expect(data.SailingNotes !== undefined).toBe(true);
  // DisplayColNum can be 0 or positive number
  expect(typeof data.DisplayColNum).toBe("number");
  expect(data.DisplayColNum).toBeGreaterThanOrEqual(0);
  expect(typeof data.SailingDir).toBe("number");
  expect(typeof data.DayOpDescription).toBe("string");
  expect(typeof data.DayOpUseForHoliday).toBe("boolean");
  expect(Array.isArray(data.ActiveDateRanges)).toBe(true);
  expect(Array.isArray(data.Journs)).toBe(true);
};

export const validateSchedule = (data: any) => {
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteName");
  expect(data).toHaveProperty("SailingDate");
  expect(data).toHaveProperty("Departures");
  expect(data).toHaveProperty("LastUpdated");
  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.RouteName).toBe("string");
  expect(data.SailingDate).toBeInstanceOf(Date);
  expect(Array.isArray(data.Departures)).toBe(true);
  expect(data.LastUpdated).toBeInstanceOf(Date);
};

export const validateScheduleResponse = (data: any) => {
  expect(data).toHaveProperty("ScheduleID");
  expect(data).toHaveProperty("ScheduleName");
  expect(data).toHaveProperty("ScheduleSeason");
  expect(data).toHaveProperty("SchedulePDFUrl");
  expect(data).toHaveProperty("ScheduleStart");
  expect(data).toHaveProperty("ScheduleEnd");
  expect(data).toHaveProperty("AllRoutes");
  expect(data).toHaveProperty("TerminalCombos");
  expect(typeof data.ScheduleID).toBe("number");
  expect(typeof data.ScheduleName).toBe("string");
  expect(typeof data.ScheduleSeason).toBe("number");
  expect(typeof data.SchedulePDFUrl).toBe("string");
  expect(data.ScheduleStart).toBeInstanceOf(Date);
  expect(data.ScheduleEnd).toBeInstanceOf(Date);
  expect(Array.isArray(data.AllRoutes)).toBe(true);
  expect(Array.isArray(data.TerminalCombos)).toBe(true);
};

export const validateTerminalCombo = (data: any) => {
  expect(data).toHaveProperty("DepartingTerminalID");
  expect(data).toHaveProperty("DepartingTerminalName");
  expect(data).toHaveProperty("ArrivingTerminalID");
  expect(data).toHaveProperty("ArrivingTerminalName");
  expect(data).toHaveProperty("SailingNotes");
  expect(data).toHaveProperty("Annotations");
  expect(data).toHaveProperty("AnnotationsIVR");
  expect(data).toHaveProperty("Times");
  expect(typeof data.DepartingTerminalID).toBe("number");
  expect(typeof data.DepartingTerminalName).toBe("string");
  expect(typeof data.ArrivingTerminalID).toBe("number");
  expect(typeof data.ArrivingTerminalName).toBe("string");
  expect(typeof data.SailingNotes).toBe("string");
  expect(Array.isArray(data.Annotations)).toBe(true);
  expect(Array.isArray(data.AnnotationsIVR)).toBe(true);
  expect(Array.isArray(data.Times)).toBe(true);
};

export const validateScheduleTime = (data: any) => {
  expect(data).toHaveProperty("DepartingTime");
  expect(data).toHaveProperty("ArrivingTime");
  expect(data).toHaveProperty("LoadingRule");
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("VesselHandicapAccessible");
  expect(data).toHaveProperty("VesselPositionNum");
  expect(data).toHaveProperty("Routes");
  expect(data).toHaveProperty("AnnotationIndexes");
  expect(data.DepartingTime).toBeInstanceOf(Date);
  expect(data.ArrivingTime).toBeInstanceOf(Date);
  expect(typeof data.LoadingRule).toBe("number");
  expect(typeof data.VesselID).toBe("number");
  expect(typeof data.VesselName).toBe("string");
  expect(typeof data.VesselHandicapAccessible).toBe("boolean");
  expect(typeof data.VesselPositionNum).toBe("number");
  expect(Array.isArray(data.Routes)).toBe(true);
  expect(Array.isArray(data.AnnotationIndexes)).toBe(true);
};

export const validateScheduleDeparture = (data: any) => {
  expect(data).toHaveProperty("SailingID");
  expect(data).toHaveProperty("SchedRouteID");
  expect(data).toHaveProperty("DepartureTime");
  expect(data).toHaveProperty("ArrivalTime");
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("DepartingTerminalID");
  expect(data).toHaveProperty("DepartingTerminalName");
  expect(data).toHaveProperty("ArrivingTerminalID");
  expect(data).toHaveProperty("ArrivingTerminalName");
  expect(data).toHaveProperty("IsCancelled");
  expect(data).toHaveProperty("LastUpdated");
  expect(typeof data.SailingID).toBe("number");
  expect(typeof data.SchedRouteID).toBe("number");
  expect(data.DepartureTime).toBeInstanceOf(Date);
  expect(data.ArrivalTime).toBeInstanceOf(Date);
  expect(typeof data.VesselID).toBe("number");
  expect(typeof data.VesselName).toBe("string");
  expect(typeof data.DepartingTerminalID).toBe("number");
  expect(typeof data.DepartingTerminalName).toBe("string");
  expect(typeof data.ArrivingTerminalID).toBe("number");
  expect(typeof data.ArrivingTerminalName).toBe("string");
  expect(typeof data.IsCancelled).toBe("boolean");
  expect(data.LastUpdated).toBeInstanceOf(Date);
};

export const validateTimeAdjustment = (data: any) => {
  expect(data).toHaveProperty("ScheduleID");
  expect(data).toHaveProperty("SchedRouteID");
  expect(data).toHaveProperty("RouteID");
  expect(data).toHaveProperty("RouteDescription");
  expect(data).toHaveProperty("SailingID");
  expect(data).toHaveProperty("SailingDescription");
  expect(data).toHaveProperty("ActiveSailingDateRange");
  expect(data).toHaveProperty("SailingDir");
  expect(data).toHaveProperty("JourneyID");
  expect(data).toHaveProperty("VesselID");
  expect(data).toHaveProperty("VesselName");
  expect(data).toHaveProperty("TerminalID");
  expect(data).toHaveProperty("TerminalDescription");
  expect(data).toHaveProperty("AdjDateFrom");
  expect(data).toHaveProperty("AdjDateThru");
  expect(data).toHaveProperty("AdjType");
  expect(data).toHaveProperty("TidalAdj");
  expect(data).toHaveProperty("TimeToAdj");
  expect(data).toHaveProperty("Annotations");

  expect(typeof data.ScheduleID).toBe("number");
  expect(typeof data.SchedRouteID).toBe("number");
  expect(typeof data.RouteID).toBe("number");
  expect(typeof data.RouteDescription).toBe("string");
  expect(typeof data.SailingID).toBe("number");
  expect(typeof data.SailingDescription).toBe("string");
  expect(typeof data.SailingDir).toBe("number");
  expect(typeof data.JourneyID).toBe("number");
  expect(typeof data.VesselID).toBe("number");
  expect(typeof data.VesselName).toBe("string");
  expect(typeof data.TerminalID).toBe("number");
  expect(typeof data.TerminalDescription).toBe("string");
  expect(data.AdjDateFrom).toBeInstanceOf(Date);
  expect(data.AdjDateThru).toBeInstanceOf(Date);
  expect(typeof data.AdjType).toBe("number");
  expect(typeof data.TidalAdj).toBe("boolean");
  expect(data.TimeToAdj).toBeInstanceOf(Date);
  expect(Array.isArray(data.Annotations)).toBe(true);

  // Validate ActiveSailingDateRange structure
  expect(data.ActiveSailingDateRange).toHaveProperty("DateFrom");
  expect(data.ActiveSailingDateRange).toHaveProperty("DateThru");
  expect(data.ActiveSailingDateRange).toHaveProperty("EventID");
  expect(data.ActiveSailingDateRange).toHaveProperty("EventDescription");
  expect(data.ActiveSailingDateRange.DateFrom).toBeInstanceOf(Date);
  expect(data.ActiveSailingDateRange.DateThru).toBeInstanceOf(Date);
};

export const validateAlert = (data: any) => {
  expect(data).toHaveProperty("BulletinID");
  expect(data).toHaveProperty("BulletinFlag");
  expect(data).toHaveProperty("BulletinText");
  expect(data).toHaveProperty("CommunicationFlag");
  expect(data).toHaveProperty("CommunicationText");
  expect(data).toHaveProperty("RouteAlertFlag");
  expect(data).toHaveProperty("RouteAlertText");
  expect(data).toHaveProperty("HomepageAlertText");
  expect(data).toHaveProperty("PublishDate");
  expect(data).toHaveProperty("DisruptionDescription");
  expect(data).toHaveProperty("AllRoutesFlag");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("AlertTypeID");
  expect(data).toHaveProperty("AlertType");
  expect(data).toHaveProperty("AlertFullTitle");
  expect(data).toHaveProperty("AffectedRouteIDs");
  expect(data).toHaveProperty("IVRText");
  expect(typeof data.BulletinID).toBe("number");
  expect(typeof data.BulletinFlag).toBe("boolean");
  expect(typeof data.BulletinText).toBe("string");
  expect(typeof data.CommunicationFlag).toBe("boolean");
  expect(
    data.CommunicationText === null ||
      typeof data.CommunicationText === "string"
  ).toBe(true);
  expect(typeof data.RouteAlertFlag).toBe("boolean");
  expect(typeof data.RouteAlertText).toBe("string");
  expect(typeof data.HomepageAlertText).toBe("string");
  expect(data.PublishDate).toBeInstanceOf(Date);
  expect(
    data.DisruptionDescription === null ||
      typeof data.DisruptionDescription === "string"
  ).toBe(true);
  expect(typeof data.AllRoutesFlag).toBe("boolean");
  expect(typeof data.SortSeq).toBe("number");
  expect(typeof data.AlertTypeID).toBe("number");
  expect(typeof data.AlertType).toBe("string");
  expect(typeof data.AlertFullTitle).toBe("string");
  expect(Array.isArray(data.AffectedRouteIDs)).toBe(true);
  expect(data.IVRText === null || typeof data.IVRText === "string").toBe(true);
};

export const validateAlternativeFormat = (data: any) => {
  expect(data).toHaveProperty("AltID");
  expect(data).toHaveProperty("SubjectID");
  expect(data).toHaveProperty("SubjectName");
  expect(data).toHaveProperty("AltTitle");
  expect(data).toHaveProperty("AltUrl");
  expect(data).toHaveProperty("AltDesc");
  expect(data).toHaveProperty("FileType");
  expect(data).toHaveProperty("Status");
  expect(data).toHaveProperty("SortSeq");
  expect(data).toHaveProperty("FromDate");
  expect(data).toHaveProperty("ThruDate");
  expect(data).toHaveProperty("ModifiedDate");
  expect(data).toHaveProperty("ModifiedBy");

  expect(typeof data.AltID).toBe("number");
  expect(typeof data.SubjectID).toBe("number");
  expect(typeof data.SubjectName).toBe("string");
  expect(typeof data.AltTitle).toBe("string");
  expect(typeof data.AltUrl).toBe("string");
  expect(typeof data.AltDesc).toBe("string");
  expect(typeof data.FileType).toBe("string");
  expect(typeof data.Status).toBe("string");
  expect(typeof data.SortSeq).toBe("number");
  expect(typeof data.FromDate).toBe("string");
  expect(typeof data.ThruDate).toBe("string");
  expect(typeof data.ModifiedDate).toBe("string");
  expect(typeof data.ModifiedBy).toBe("string");
};

// Error validation
export const validateApiError = (
  error: any,
  expectedCode?: string | string[]
) => {
  expect(error).toBeInstanceOf(WsdotApiError);
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
export const TEST_SCHED_ROUTE_ID = 2327; // Anacortes / San Juan Islands
export const TEST_SCHEDULE_ID = 192; // Summer 2025

// Valid terminal pairs for testing (from actual WSF API data)
export const VALID_TERMINAL_PAIR_1 = { departing: 1, arriving: 13 }; // Anacortes → Friday Harbor
export const VALID_TERMINAL_PAIR_2 = { departing: 1, arriving: 18 }; // Anacortes → Orcas Island
export const VALID_TERMINAL_PAIR_3 = { departing: 8, arriving: 12 }; // Edmonds → Kingston
export const VALID_TERMINAL_PAIR_4 = { departing: 12, arriving: 8 }; // Kingston → Edmonds

// Invalid test data
export const INVALID_VESSEL_ID = 99999;
export const INVALID_TERMINAL_ID = 99999;
export const INVALID_ROUTE_ID = 99999;
export const INVALID_FARE_ID = 99999;
export const INVALID_SCHED_ROUTE_ID = 99999;
export const INVALID_SCHEDULE_ID = 99999;

// Rate limiting between tests
export const RATE_LIMIT_DELAY = 0; // No delay between API calls
