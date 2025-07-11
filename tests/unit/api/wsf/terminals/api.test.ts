import { beforeEach, describe, expect, it, vi } from "vitest";

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
} from "@/api/wsf/terminals/api";

// Mock the fetch function to return test data
const mockFetch = vi.fn();

// Mock data that matches the actual API response structure
const mockTerminalBasics = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  OverheadPassengerLoading: true,
  Elevator: false,
  WaitingRoom: true,
  FoodService: true,
  Restroom: true,
};

const mockTerminalLocation = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  AddressLineOne: "2100 Ferry Terminal Road",
  AddressLineTwo: null,
  City: "Anacortes",
  State: "WA",
  ZipCode: "98221",
  Country: "USA",
  Latitude: 48.507351,
  Longitude: -122.677,
  Directions: "From Interstate 5 take exit 230...",
  DispGISZoomLoc: [
    {
      Latitude: 48.507351,
      Longitude: -122.677,
      ZoomLevel: 0,
    },
  ],
  MapLink: "https://www.google.com/maps/place/Anacortes+Ferry+Terminal...",
};

const mockTerminalBulletin = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  Bulletins: [
    {
      BulletinTitle: "Test Bulletin",
      BulletinText: "<p>Test bulletin content</p>",
      BulletinSortSeq: 1,
      BulletinLastUpdated: "/Date(1752254158923-0700)/",
      BulletinLastUpdatedSortable: "20250711101558",
    },
  ],
};

const mockTerminalSailingSpace = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  DepartingSpaces: [
    {
      Departure: "/Date(1752181200000-0700)/",
      IsCancelled: false,
      VesselID: 69,
      VesselName: "Samish",
      MaxSpaceCount: 141,
      SpaceForArrivalTerminals: [
        {
          TerminalID: 1,
          TerminalName: "Anacortes -> Friday Harbor",
          VesselID: 69,
          VesselName: "Samish",
          DisplayReservableSpace: false,
          ReservableSpaceCount: null,
          ReservableSpaceHexColor: null,
          DisplayDriveUpSpace: true,
          DriveUpSpaceCount: 0,
          DriveUpSpaceHexColor: "#FF0000",
          MaxSpaceCount: 141,
          ArrivalTerminalIDs: [10],
        },
      ],
    },
  ],
  IsNoFareCollected: false,
  NoFareCollectedMsg: null,
};

const mockTerminalTransport = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  ParkingInfo: "Peak rates effective May 1 - September 30...",
  ParkingShuttleInfo: null,
  AirportInfo: "From the Seattle-Tacoma International Airport...",
  AirportShuttleInfo: "When traveling from Sea-Tac Airport...",
  MotorcycleInfo:
    "While motorcycles are not, by Washington Administrative Code...",
  TruckInfo: "Expect heavy truck traffic on the first 3 sailings...",
  BikeInfo: "Approaching the Anacortes Terminal...",
  TrainInfo: null,
  TaxiInfo: null,
  HovInfo: null,
  TransitLinks: [
    {
      LinkName: "Skagit Transit",
      LinkURL: "http://www.skagittransit.org/",
      SortSeq: null,
    },
  ],
};

const mockTerminalWaitTimes = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  WaitTimes: [
    {
      RouteID: 1,
      RouteName: "Anacortes - Friday Harbor",
      WaitTimeIvrNotes: "Current wait time is approximately 2 hours",
      WaitTimeLastUpdated: "/Date(1752181200000-0700)/",
      WaitTimeNotes: "Heavy traffic expected due to holiday weekend",
    },
  ],
};

const mockTerminalVerbose = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  AddressLineOne: "2100 Ferry Terminal Road",
  AddressLineTwo: null,
  City: "Anacortes",
  State: "WA",
  ZipCode: "98221",
  Country: "USA",
  Latitude: 48.507351,
  Longitude: -122.677,
  Directions: "From Interstate 5 take exit 230...",
  DispGISZoomLoc: [
    {
      Latitude: 48.507351,
      Longitude: -122.677,
      ZoomLevel: 0,
    },
  ],
  MapLink: "https://www.google.com/maps/place/Anacortes+Ferry+Terminal...",
  Elevator: false,
  WaitingRoom: true,
  FoodService: true,
  Restroom: true,
  OverheadPassengerLoading: true,
  IsNoFareCollected: false,
  NoFareCollectedMsg: null,
  AdaInfo: "ADA accessible facilities available",
  AdditionalInfo: "Pet-friendly terminal with designated areas",
  AirportInfo:
    "Seattle-Tacoma International Airport is approximately 80 miles away",
  AirportShuttleInfo: "Shuttle service available to Sea-Tac Airport",
  BikeInfo: "Bike racks available at terminal entrance",
  ChamberOfCommerce: "Anacortes Chamber of Commerce: (360) 293-7911",
  ConstructionInfo: null,
  FacInfo:
    "Terminal facilities include waiting room, restrooms, and food service",
  FareDiscountInfo: "Senior and disabled discounts available",
  FoodServiceInfo: "Coffee shop and snack bar available",
  HovInfo: "HOV lanes available on approach roads",
  LostAndFoundInfo: "Contact terminal office for lost and found items",
  MotorcycleInfo: "Designated motorcycle parking available",
  ParkingInfo: "Free parking available for up to 24 hours",
  ParkingShuttleInfo: "Shuttle service between parking lots and terminal",
  RealtimeShutoffFlag: false,
  RealtimeShutoffMessage: null,
  RealtimeIntroMsg: "Real-time information is available for this terminal",
  ResourceStatus: "Active",
  SecurityInfo: "Security screening may be required",
  TallySystemInfo: "Electronic tally system in use",
  TaxiInfo: "Taxi service available at terminal entrance",
  TrainInfo: "Amtrak service available in nearby Mount Vernon",
  TruckInfo: "Commercial vehicle loading available",
  TypeDesc: "Major terminal with full service facilities",
  VisitorLinks: "Visit Anacortes: https://www.anacortes.org",
  Bulletins: [],
  TransitLinks: [
    {
      LinkName: "Skagit Transit",
      LinkURL: "https://www.skagittransit.org",
      SortSeq: 1,
    },
  ],
  WaitTimes: [],
};

const mockCacheFlushDate = {
  LastUpdated: "/Date(1752181200000-0700)/",
  Source: "WSF Terminals API",
};

// Helper function to validate date conversion
const validateDateConversion = (dateField: any, expectedTimestamp: number) => {
  expect(dateField).toBeInstanceOf(Date);
  expect(dateField.getTime()).toBe(expectedTimestamp);
};

// Helper function to validate TerminalBasics type
const validateTerminalBasics = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    OverheadPassengerLoading: expect.any(Boolean),
    Elevator: expect.any(Boolean),
    WaitingRoom: expect.any(Boolean),
    FoodService: expect.any(Boolean),
    Restroom: expect.any(Boolean),
  });
};

// Helper function to validate TerminalLocation type
const validateTerminalLocation = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    AddressLineOne: expect.any(String),
    City: expect.any(String),
    State: expect.any(String),
    ZipCode: expect.any(String),
    Country: expect.any(String),
    Latitude: expect.any(Number),
    Longitude: expect.any(Number),
    DispGISZoomLoc: expect.any(Array),
  });

  // Validate nullable fields separately
  expect(
    typeof data.AddressLineTwo === "string" || data.AddressLineTwo === null
  ).toBe(true);
  expect(typeof data.Directions === "string" || data.Directions === null).toBe(
    true
  );
  expect(typeof data.MapLink === "string" || data.MapLink === null).toBe(true);

  // Validate DispGISZoomLoc structure
  expect(data.DispGISZoomLoc[0]).toMatchObject({
    Latitude: expect.any(Number),
    Longitude: expect.any(Number),
    ZoomLevel: expect.any(Number),
  });
};

// Helper function to validate TerminalBulletin type
const validateTerminalBulletin = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    Bulletins: expect.any(Array),
  });

  // Validate bulletin items
  if (data.Bulletins.length > 0) {
    expect(data.Bulletins[0]).toMatchObject({
      BulletinTitle: expect.any(String),
      BulletinText: expect.any(String),
      BulletinSortSeq: expect.any(Number),
    });

    // Validate optional fields separately
    const bulletin = data.Bulletins[0];
    expect(
      bulletin.BulletinLastUpdated === undefined ||
        bulletin.BulletinLastUpdated instanceof Date
    ).toBe(true);
    expect(
      bulletin.BulletinLastUpdatedSortable === undefined ||
        typeof bulletin.BulletinLastUpdatedSortable === "string"
    ).toBe(true);
  }
};

// Helper function to validate TerminalSailingSpace type
const validateTerminalSailingSpace = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    DepartingSpaces: expect.any(Array),
  });

  // Validate nullable fields separately
  expect(
    data.IsNoFareCollected === null ||
      typeof data.IsNoFareCollected === "boolean"
  ).toBe(true);
  expect(
    data.NoFareCollectedMsg === null ||
      typeof data.NoFareCollectedMsg === "string"
  ).toBe(true);

  // Validate departing spaces
  if (data.DepartingSpaces.length > 0) {
    expect(data.DepartingSpaces[0]).toMatchObject({
      Departure: expect.any(Date),
      IsCancelled: expect.any(Boolean),
      VesselID: expect.any(Number),
      VesselName: expect.any(String),
      MaxSpaceCount: expect.any(Number),
      SpaceForArrivalTerminals: expect.any(Array),
    });

    // Validate arrival spaces
    if (data.DepartingSpaces[0].SpaceForArrivalTerminals.length > 0) {
      expect(data.DepartingSpaces[0].SpaceForArrivalTerminals[0]).toMatchObject(
        {
          TerminalID: expect.any(Number),
          TerminalName: expect.any(String),
          VesselID: expect.any(Number),
          VesselName: expect.any(String),
          DisplayReservableSpace: expect.any(Boolean),
          DisplayDriveUpSpace: expect.any(Boolean),
          DriveUpSpaceCount: expect.any(Number),
          DriveUpSpaceHexColor: expect.any(String),
          MaxSpaceCount: expect.any(Number),
          ArrivalTerminalIDs: expect.any(Array),
        }
      );

      // Validate nullable fields separately
      const arrivalSpace = data.DepartingSpaces[0].SpaceForArrivalTerminals[0];
      expect(
        arrivalSpace.ReservableSpaceCount === null ||
          typeof arrivalSpace.ReservableSpaceCount === "number"
      ).toBe(true);
      expect(
        arrivalSpace.ReservableSpaceHexColor === null ||
          typeof arrivalSpace.ReservableSpaceHexColor === "string"
      ).toBe(true);
    }
  }
};

// Helper function to validate TerminalTransport type
const validateTerminalTransport = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    ParkingInfo: expect.any(String),
    AirportInfo: expect.any(String),
    AirportShuttleInfo: expect.any(String),
    MotorcycleInfo: expect.any(String),
    TruckInfo: expect.any(String),
    BikeInfo: expect.any(String),
    TransitLinks: expect.any(Array),
  });

  // Validate nullable fields separately
  expect(
    data.ParkingShuttleInfo === null ||
      typeof data.ParkingShuttleInfo === "string"
  ).toBe(true);
  expect(data.TrainInfo === null || typeof data.TrainInfo === "string").toBe(
    true
  );
  expect(data.TaxiInfo === null || typeof data.TaxiInfo === "string").toBe(
    true
  );
  expect(data.HovInfo === null || typeof data.HovInfo === "string").toBe(true);

  // Validate transit links
  if (data.TransitLinks.length > 0) {
    expect(data.TransitLinks[0]).toMatchObject({
      LinkName: expect.any(String),
      LinkURL: expect.any(String),
    });

    // Validate nullable SortSeq separately
    expect(
      data.TransitLinks[0].SortSeq === null ||
        typeof data.TransitLinks[0].SortSeq === "number"
    ).toBe(true);
  }
};

// Helper function to validate TerminalWaitTimes type
const validateTerminalWaitTimes = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    WaitTimes: expect.any(Array),
  });

  // Validate wait times
  if (data.WaitTimes.length > 0) {
    expect(data.WaitTimes[0]).toMatchObject({
      RouteID: expect.any(Number),
      RouteName: expect.any(String),
      WaitTimeLastUpdated: expect.any(Date),
    });

    // Validate nullable fields separately
    const waitTime = data.WaitTimes[0];
    expect(
      waitTime.WaitTimeIvrNotes === null ||
        typeof waitTime.WaitTimeIvrNotes === "string"
    ).toBe(true);
    expect(
      waitTime.WaitTimeNotes === null ||
        typeof waitTime.WaitTimeNotes === "string"
    ).toBe(true);
  }
};

// Helper function to validate TerminalVerbose type
const validateTerminalVerbose = (data: any) => {
  expect(data).toMatchObject({
    TerminalID: expect.any(Number),
    TerminalSubjectID: expect.any(Number),
    RegionID: expect.any(Number),
    TerminalName: expect.any(String),
    TerminalAbbrev: expect.any(String),
    SortSeq: expect.any(Number),
    AddressLineOne: expect.any(String),
    City: expect.any(String),
    State: expect.any(String),
    ZipCode: expect.any(String),
    Country: expect.any(String),
    Latitude: expect.any(Number),
    Longitude: expect.any(Number),
    DispGISZoomLoc: expect.any(Array),
    Elevator: expect.any(Boolean),
    WaitingRoom: expect.any(Boolean),
    FoodService: expect.any(Boolean),
    Restroom: expect.any(Boolean),
    OverheadPassengerLoading: expect.any(Boolean),
    RealtimeShutoffFlag: expect.any(Boolean),
    Bulletins: expect.any(Array),
    TransitLinks: expect.any(Array),
    WaitTimes: expect.any(Array),
  });

  // Validate nullable fields separately
  expect(
    data.AddressLineTwo === null || typeof data.AddressLineTwo === "string"
  ).toBe(true);
  expect(data.Directions === null || typeof data.Directions === "string").toBe(
    true
  );
  expect(data.MapLink === null || typeof data.MapLink === "string").toBe(true);
  expect(
    data.IsNoFareCollected === null ||
      typeof data.IsNoFareCollected === "boolean"
  ).toBe(true);
  expect(
    data.NoFareCollectedMsg === null ||
      typeof data.NoFareCollectedMsg === "string"
  ).toBe(true);
  expect(data.AdaInfo === null || typeof data.AdaInfo === "string").toBe(true);
  expect(
    data.AdditionalInfo === null || typeof data.AdditionalInfo === "string"
  ).toBe(true);
  expect(
    data.AirportInfo === null || typeof data.AirportInfo === "string"
  ).toBe(true);
  expect(
    data.AirportShuttleInfo === null ||
      typeof data.AirportShuttleInfo === "string"
  ).toBe(true);
  expect(data.BikeInfo === null || typeof data.BikeInfo === "string").toBe(
    true
  );
  expect(
    data.ChamberOfCommerce === null ||
      typeof data.ChamberOfCommerce === "string"
  ).toBe(true);
  expect(
    data.ConstructionInfo === null || typeof data.ConstructionInfo === "string"
  ).toBe(true);
  expect(data.FacInfo === null || typeof data.FacInfo === "string").toBe(true);
  expect(
    data.FareDiscountInfo === null || typeof data.FareDiscountInfo === "string"
  ).toBe(true);
  expect(
    data.FoodServiceInfo === null || typeof data.FoodServiceInfo === "string"
  ).toBe(true);
  expect(data.HovInfo === null || typeof data.HovInfo === "string").toBe(true);
  expect(
    data.LostAndFoundInfo === null || typeof data.LostAndFoundInfo === "string"
  ).toBe(true);
  expect(
    data.MotorcycleInfo === null || typeof data.MotorcycleInfo === "string"
  ).toBe(true);
  expect(
    data.ParkingInfo === null || typeof data.ParkingInfo === "string"
  ).toBe(true);
  expect(
    data.ParkingShuttleInfo === null ||
      typeof data.ParkingShuttleInfo === "string"
  ).toBe(true);
  expect(
    data.RealtimeShutoffMessage === null ||
      typeof data.RealtimeShutoffMessage === "string"
  ).toBe(true);
  expect(
    data.RealtimeIntroMsg === null || typeof data.RealtimeIntroMsg === "string"
  ).toBe(true);
  expect(
    data.ResourceStatus === null || typeof data.ResourceStatus === "string"
  ).toBe(true);
  expect(
    data.SecurityInfo === null || typeof data.SecurityInfo === "string"
  ).toBe(true);
  expect(
    data.TallySystemInfo === null || typeof data.TallySystemInfo === "string"
  ).toBe(true);
  expect(data.TaxiInfo === null || typeof data.TaxiInfo === "string").toBe(
    true
  );
  expect(data.TrainInfo === null || typeof data.TrainInfo === "string").toBe(
    true
  );
  expect(data.TruckInfo === null || typeof data.TruckInfo === "string").toBe(
    true
  );
  expect(data.TypeDesc === null || typeof data.TypeDesc === "string").toBe(
    true
  );
  expect(
    data.VisitorLinks === null || typeof data.VisitorLinks === "string"
  ).toBe(true);
};

// Helper function to validate TerminalsCacheFlushDate type
const validateCacheFlushDate = (data: any) => {
  expect(data).toMatchObject({
    LastUpdated: expect.any(Date),
    Source: expect.any(String),
  });
};

describe("WSF Terminals API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  describe("Cache Functions", () => {
    describe("getCacheFlushDateTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getCacheFlushDateTerminals).toBe("function");
        expect(getCacheFlushDateTerminals).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getCacheFlushDateTerminals).toBe("function");
        expect(getCacheFlushDateTerminals).toHaveLength(0);
      });

      it("should return data with correct types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockCacheFlushDate,
        });

        const result = await getCacheFlushDateTerminals();

        expect(result).not.toBeNull();
        validateCacheFlushDate(result!);
        validateDateConversion(result?.LastUpdated, 1752181200000);
      });
    });
  });

  describe("Terminal Basics Functions", () => {
    describe("getTerminalBasics", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalBasics).toBe("function");
        expect(getTerminalBasics).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalBasics).toBe("function");
        expect(getTerminalBasics).toHaveLength(0);
      });

      it("should return data with correct TerminalBasics types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalBasics],
        });

        const result = await getTerminalBasics();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalBasics(result[0]);
      });
    });

    describe("getTerminalBasicsByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalBasicsByTerminalId).toBe("function");
        expect(getTerminalBasicsByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalBasicsByTerminalId).toBe("function");
        expect(getTerminalBasicsByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalBasics types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalBasics,
        });

        const result = await getTerminalBasicsByTerminalId(1);

        validateTerminalBasics(result);
        expect(result.TerminalID).toBe(1);
      });
    });
  });

  describe("Terminal Location Functions", () => {
    describe("getTerminalLocations", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalLocations).toBe("function");
        expect(getTerminalLocations).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalLocations).toBe("function");
        expect(getTerminalLocations).toHaveLength(0);
      });

      it("should return data with correct TerminalLocation types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalLocation],
        });

        const result = await getTerminalLocations();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalLocation(result[0]);
      });
    });

    describe("getTerminalLocationsByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalLocationsByTerminalId).toBe("function");
        expect(getTerminalLocationsByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalLocationsByTerminalId).toBe("function");
        expect(getTerminalLocationsByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalLocation types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalLocation,
        });

        const result = await getTerminalLocationsByTerminalId(1);

        validateTerminalLocation(result);
        expect(result.TerminalID).toBe(1);
      });
    });
  });

  describe("Terminal Sailing Space Functions", () => {
    describe("getTerminalSailingSpace", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalSailingSpace).toBe("function");
        expect(getTerminalSailingSpace).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalSailingSpace).toBe("function");
        expect(getTerminalSailingSpace).toHaveLength(0);
      });

      it("should return data with correct TerminalSailingSpace types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalSailingSpace],
        });

        const result = await getTerminalSailingSpace();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalSailingSpace(result[0]);

        // Validate date conversion
        if (result[0].DepartingSpaces.length > 0) {
          validateDateConversion(
            result[0].DepartingSpaces[0].Departure,
            1752181200000
          );
        }
      });
    });

    describe("getTerminalSailingSpaceByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalSailingSpaceByTerminalId).toBe("function");
        expect(getTerminalSailingSpaceByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalSailingSpaceByTerminalId).toBe("function");
        expect(getTerminalSailingSpaceByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalSailingSpace types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalSailingSpace,
        });

        const result = await getTerminalSailingSpaceByTerminalId(1);

        validateTerminalSailingSpace(result);
        expect(result.TerminalID).toBe(1);

        // Validate date conversion
        if (result.DepartingSpaces.length > 0) {
          validateDateConversion(
            result.DepartingSpaces[0].Departure,
            1752181200000
          );
        }
      });
    });
  });

  describe("Terminal Bulletin Functions", () => {
    describe("getTerminalBulletins", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalBulletins).toBe("function");
        expect(getTerminalBulletins).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalBulletins).toBe("function");
        expect(getTerminalBulletins).toHaveLength(0);
      });

      it("should return data with correct TerminalBulletin types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalBulletin],
        });

        const result = await getTerminalBulletins();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalBulletin(result[0]);

        // Validate date conversion
        if (result[0].Bulletins.length > 0) {
          validateDateConversion(
            result[0].Bulletins[0].BulletinLastUpdated,
            1752254158923
          );
        }
      });
    });

    describe("getTerminalBulletinsByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalBulletinsByTerminalId).toBe("function");
        expect(getTerminalBulletinsByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalBulletinsByTerminalId).toBe("function");
        expect(getTerminalBulletinsByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalBulletin types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalBulletin,
        });

        const result = await getTerminalBulletinsByTerminalId(1);

        validateTerminalBulletin(result);
        expect(result.TerminalID).toBe(1);

        // Validate date conversion
        if (result.Bulletins.length > 0) {
          validateDateConversion(
            result.Bulletins[0].BulletinLastUpdated,
            1752254158923
          );
        }
      });
    });
  });

  describe("Terminal Transport Functions", () => {
    describe("getTerminalTransports", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalTransports).toBe("function");
        expect(getTerminalTransports).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalTransports).toBe("function");
        expect(getTerminalTransports).toHaveLength(0);
      });

      it("should return data with correct TerminalTransport types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalTransport],
        });

        const result = await getTerminalTransports();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalTransport(result[0]);
      });
    });

    describe("getTerminalTransportsByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalTransportsByTerminalId).toBe("function");
        expect(getTerminalTransportsByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalTransportsByTerminalId).toBe("function");
        expect(getTerminalTransportsByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalTransport types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalTransport,
        });

        const result = await getTerminalTransportsByTerminalId(1);

        validateTerminalTransport(result);
        expect(result.TerminalID).toBe(1);
      });
    });
  });

  describe("Terminal Wait Time Functions", () => {
    describe("getTerminalWaitTimes", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalWaitTimes).toBe("function");
        expect(getTerminalWaitTimes).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalWaitTimes).toBe("function");
        expect(getTerminalWaitTimes).toHaveLength(0);
      });

      it("should return data with correct TerminalWaitTimes types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalWaitTimes],
        });

        const result = await getTerminalWaitTimes();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalWaitTimes(result[0]);

        // Validate date conversion
        if (result[0].WaitTimes.length > 0) {
          validateDateConversion(
            result[0].WaitTimes[0].WaitTimeLastUpdated,
            1752181200000
          );
        }
      });
    });

    describe("getTerminalWaitTimesByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalWaitTimesByTerminalId).toBe("function");
        expect(getTerminalWaitTimesByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalWaitTimesByTerminalId).toBe("function");
        expect(getTerminalWaitTimesByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalWaitTimes types and date conversion", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalWaitTimes,
        });

        const result = await getTerminalWaitTimesByTerminalId(1);

        validateTerminalWaitTimes(result);
        expect(result.TerminalID).toBe(1);

        // Validate date conversion
        if (result.WaitTimes.length > 0) {
          validateDateConversion(
            result.WaitTimes[0].WaitTimeLastUpdated,
            1752181200000
          );
        }
      });
    });
  });

  describe("Terminal Verbose Functions", () => {
    describe("getTerminalVerbose", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalVerbose).toBe("function");
        expect(getTerminalVerbose).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTerminalVerbose).toBe("function");
        expect(getTerminalVerbose).toHaveLength(0);
      });

      it("should return data with correct TerminalVerbose types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [mockTerminalVerbose],
        });

        const result = await getTerminalVerbose();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        validateTerminalVerbose(result[0]);
      });
    });

    describe("getTerminalVerboseByTerminalId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalVerboseByTerminalId).toBe("function");
        expect(getTerminalVerboseByTerminalId).toHaveLength(1);
      });

      it("should accept a terminal ID parameter", () => {
        expect(typeof getTerminalVerboseByTerminalId).toBe("function");
        expect(getTerminalVerboseByTerminalId).toHaveLength(1);
      });

      it("should return data with correct TerminalVerbose types", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockTerminalVerbose,
        });

        const result = await getTerminalVerboseByTerminalId(1);

        validateTerminalVerbose(result);
        expect(result.TerminalID).toBe(1);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(getTerminalBasics()).rejects.toThrow();
    });

    it("should handle network errors gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(getTerminalBasics()).rejects.toThrow("Network error");
    });

    it("should handle malformed JSON responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      await expect(getTerminalBasics()).rejects.toThrow("Invalid JSON");
    });
  });

  describe("Type Safety", () => {
    it("should handle null values in nullable fields", async () => {
      const mockDataWithNulls = {
        ...mockTerminalBasics,
        TerminalName: null, // This should not be null in real API
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [mockDataWithNulls],
      });

      const result = await getTerminalBasics();
      expect(result[0]?.TerminalName).toBeNull();
    });

    it("should handle empty arrays", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await getTerminalBasics();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it("should handle missing optional fields", async () => {
      const mockDataWithoutOptionals = {
        TerminalID: 1,
        TerminalSubjectID: 111,
        RegionID: 1,
        TerminalName: "Test",
        TerminalAbbrev: "TST",
        SortSeq: 1,
        OverheadPassengerLoading: true,
        Elevator: false,
        WaitingRoom: true,
        FoodService: true,
        Restroom: true,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [mockDataWithoutOptionals],
      });

      const result = await getTerminalBasics();
      validateTerminalBasics(result[0]);
    });
  });
});
