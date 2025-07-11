import { describe, expect, it } from "vitest";

import type {
  TerminalBasics,
  TerminalBulletin,
  TerminalBulletinItem,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalsCacheFlushDate,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTimes,
} from "@/api/wsf/terminals/types";

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

const mockTerminalBulletinItem = {
  BulletinTitle: "Test Bulletin",
  BulletinText: "<p>Test bulletin content</p>",
  BulletinSortSeq: 1,
  BulletinLastUpdated: new Date(1752254158923),
  BulletinLastUpdatedSortable: "20250711101558",
};

const mockTerminalBulletin = {
  TerminalID: 1,
  TerminalSubjectID: 111,
  RegionID: 1,
  TerminalName: "Anacortes",
  TerminalAbbrev: "ANA",
  SortSeq: 10,
  Bulletins: [mockTerminalBulletinItem],
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
      Departure: new Date(1752181200000),
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
      WaitTimeLastUpdated: new Date(1752181200000),
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
  LastUpdated: new Date(1752181200000),
  Source: "WSF Terminals API",
};

describe("WSF Terminals Type Validation", () => {
  describe("TerminalBasics Type", () => {
    it("should match the expected structure", () => {
      // This test validates that our mock data matches the TypeScript type
      const data: TerminalBasics = mockTerminalBasics;

      expect(data.TerminalID).toBe(1);
      expect(data.TerminalSubjectID).toBe(111);
      expect(data.RegionID).toBe(1);
      expect(data.TerminalName).toBe("Anacortes");
      expect(data.TerminalAbbrev).toBe("ANA");
      expect(data.SortSeq).toBe(10);
      expect(data.OverheadPassengerLoading).toBe(true);
      expect(data.Elevator).toBe(false);
      expect(data.WaitingRoom).toBe(true);
      expect(data.FoodService).toBe(true);
      expect(data.Restroom).toBe(true);
    });

    it("should handle all required properties", () => {
      const data: TerminalBasics = mockTerminalBasics;

      expect(typeof data.TerminalID).toBe("number");
      expect(typeof data.TerminalSubjectID).toBe("number");
      expect(typeof data.RegionID).toBe("number");
      expect(typeof data.TerminalName).toBe("string");
      expect(typeof data.TerminalAbbrev).toBe("string");
      expect(typeof data.SortSeq).toBe("number");
      expect(typeof data.OverheadPassengerLoading).toBe("boolean");
      expect(typeof data.Elevator).toBe("boolean");
      expect(typeof data.WaitingRoom).toBe("boolean");
      expect(typeof data.FoodService).toBe("boolean");
      expect(typeof data.Restroom).toBe("boolean");
    });
  });

  describe("TerminalLocation Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalLocation = mockTerminalLocation;

      expect(data.TerminalID).toBe(1);
      expect(data.AddressLineOne).toBe("2100 Ferry Terminal Road");
      expect(data.AddressLineTwo).toBeNull();
      expect(data.City).toBe("Anacortes");
      expect(data.State).toBe("WA");
      expect(data.ZipCode).toBe("98221");
      expect(data.Country).toBe("USA");
      expect(data.Latitude).toBe(48.507351);
      expect(data.Longitude).toBe(-122.677);
      expect(data.Directions).toBe("From Interstate 5 take exit 230...");
      expect(data.MapLink).toBe(
        "https://www.google.com/maps/place/Anacortes+Ferry+Terminal..."
      );
    });

    it("should handle nullable properties correctly", () => {
      const data: TerminalLocation = mockTerminalLocation;

      expect(data.AddressLineTwo).toBeNull();
      expect(data.Directions).toBeTruthy();
      expect(data.MapLink).toBeTruthy();

      // Test with different null values
      const dataWithNulls: TerminalLocation = {
        ...mockTerminalLocation,
        AddressLineTwo: null,
        Directions: null,
        MapLink: null,
      };

      expect(dataWithNulls.AddressLineTwo).toBeNull();
      expect(dataWithNulls.Directions).toBeNull();
      expect(dataWithNulls.MapLink).toBeNull();
    });

    it("should handle DispGISZoomLoc array structure", () => {
      const data: TerminalLocation = mockTerminalLocation;

      expect(Array.isArray(data.DispGISZoomLoc)).toBe(true);
      expect(data.DispGISZoomLoc.length).toBeGreaterThan(0);

      const firstZoom = data.DispGISZoomLoc[0];
      expect(typeof firstZoom.Latitude).toBe("number");
      expect(typeof firstZoom.Longitude).toBe("number");
      expect(typeof firstZoom.ZoomLevel).toBe("number");
    });
  });

  describe("TerminalBulletinItem Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalBulletinItem = mockTerminalBulletinItem;

      expect(data.BulletinTitle).toBe("Test Bulletin");
      expect(data.BulletinText).toBe("<p>Test bulletin content</p>");
      expect(data.BulletinSortSeq).toBe(1);
      expect(data.BulletinLastUpdated).toBeInstanceOf(Date);
      expect(data.BulletinLastUpdated?.getTime()).toBe(1752254158923);
      expect(data.BulletinLastUpdatedSortable).toBe("20250711101558");
    });

    it("should handle optional properties", () => {
      const dataWithoutOptionals: TerminalBulletinItem = {
        BulletinTitle: "Test",
        BulletinText: "Content",
        BulletinSortSeq: 1,
      };

      expect(dataWithoutOptionals.BulletinLastUpdated).toBeUndefined();
      expect(dataWithoutOptionals.BulletinLastUpdatedSortable).toBeUndefined();
    });
  });

  describe("TerminalBulletin Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalBulletin = mockTerminalBulletin;

      expect(data.TerminalID).toBe(1);
      expect(data.TerminalName).toBe("Anacortes");
      expect(Array.isArray(data.Bulletins)).toBe(true);
      expect(data.Bulletins.length).toBe(1);
    });

    it("should handle empty bulletins array", () => {
      const dataWithEmptyBulletins: TerminalBulletin = {
        ...mockTerminalBulletin,
        Bulletins: [],
      };

      expect(Array.isArray(dataWithEmptyBulletins.Bulletins)).toBe(true);
      expect(dataWithEmptyBulletins.Bulletins.length).toBe(0);
    });
  });

  describe("TerminalSailingSpace Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalSailingSpace = mockTerminalSailingSpace;

      expect(data.TerminalID).toBe(1);
      expect(data.TerminalName).toBe("Anacortes");
      expect(Array.isArray(data.DepartingSpaces)).toBe(true);
      expect(data.DepartingSpaces.length).toBe(1);
      expect(data.IsNoFareCollected).toBe(false);
      expect(data.NoFareCollectedMsg).toBeNull();
    });

    it("should handle nullable properties", () => {
      const dataWithNulls: TerminalSailingSpace = {
        ...mockTerminalSailingSpace,
        IsNoFareCollected: null,
        NoFareCollectedMsg: "No fare collected message",
      };

      expect(dataWithNulls.IsNoFareCollected).toBeNull();
      expect(dataWithNulls.NoFareCollectedMsg).toBe(
        "No fare collected message"
      );
    });

    it("should handle DepartingSpaces structure", () => {
      const data: TerminalSailingSpace = mockTerminalSailingSpace;
      const departingSpace = data.DepartingSpaces[0];

      expect(departingSpace.Departure).toBeInstanceOf(Date);
      expect(departingSpace.Departure.getTime()).toBe(1752181200000);
      expect(departingSpace.IsCancelled).toBe(false);
      expect(departingSpace.VesselID).toBe(69);
      expect(departingSpace.VesselName).toBe("Samish");
      expect(departingSpace.MaxSpaceCount).toBe(141);
      expect(Array.isArray(departingSpace.SpaceForArrivalTerminals)).toBe(true);
    });
  });

  describe("TerminalTransport Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalTransport = mockTerminalTransport;

      expect(data.TerminalID).toBe(1);
      expect(data.TerminalName).toBe("Anacortes");
      expect(data.ParkingInfo).toBe(
        "Peak rates effective May 1 - September 30..."
      );
      expect(data.ParkingShuttleInfo).toBeNull();
      expect(data.AirportInfo).toBe(
        "From the Seattle-Tacoma International Airport..."
      );
      expect(data.AirportShuttleInfo).toBe(
        "When traveling from Sea-Tac Airport..."
      );
      expect(data.MotorcycleInfo).toBe(
        "While motorcycles are not, by Washington Administrative Code..."
      );
      expect(data.TruckInfo).toBe(
        "Expect heavy truck traffic on the first 3 sailings..."
      );
      expect(data.BikeInfo).toBe("Approaching the Anacortes Terminal...");
      expect(data.TrainInfo).toBeNull();
      expect(data.TaxiInfo).toBeNull();
      expect(data.HovInfo).toBeNull();
      expect(Array.isArray(data.TransitLinks)).toBe(true);
    });

    it("should handle TransitLinks structure", () => {
      const data: TerminalTransport = mockTerminalTransport;
      const transitLink = data.TransitLinks[0];

      expect(transitLink.LinkName).toBe("Skagit Transit");
      expect(transitLink.LinkURL).toBe("http://www.skagittransit.org/");
      expect(transitLink.SortSeq).toBeNull();
    });
  });

  describe("TerminalWaitTimes Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalWaitTimes = mockTerminalWaitTimes;

      expect(data.TerminalID).toBe(1);
      expect(data.TerminalName).toBe("Anacortes");
      expect(Array.isArray(data.WaitTimes)).toBe(true);
      expect(data.WaitTimes.length).toBe(1);
    });

    it("should handle WaitTimes structure", () => {
      const data: TerminalWaitTimes = mockTerminalWaitTimes;
      const waitTime = data.WaitTimes[0];

      expect(waitTime.RouteID).toBe(1);
      expect(waitTime.RouteName).toBe("Anacortes - Friday Harbor");
      expect(waitTime.WaitTimeIvrNotes).toBe(
        "Current wait time is approximately 2 hours"
      );
      expect(waitTime.WaitTimeLastUpdated).toBeInstanceOf(Date);
      expect(waitTime.WaitTimeLastUpdated.getTime()).toBe(1752181200000);
      expect(waitTime.WaitTimeNotes).toBe(
        "Heavy traffic expected due to holiday weekend"
      );
    });

    it("should handle nullable wait time properties", () => {
      const dataWithNulls: TerminalWaitTimes = {
        ...mockTerminalWaitTimes,
        WaitTimes: [
          {
            RouteID: 1,
            RouteName: "Test Route",
            WaitTimeIvrNotes: null,
            WaitTimeLastUpdated: new Date(1752181200000),
            WaitTimeNotes: null,
          },
        ],
      };

      expect(dataWithNulls.WaitTimes[0].WaitTimeIvrNotes).toBeNull();
      expect(dataWithNulls.WaitTimes[0].WaitTimeNotes).toBeNull();
    });
  });

  describe("TerminalVerbose Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalVerbose = mockTerminalVerbose;

      expect(data.TerminalID).toBe(1);
      expect(data.TerminalName).toBe("Anacortes");
      expect(data.AddressLineOne).toBe("2100 Ferry Terminal Road");
      expect(data.City).toBe("Anacortes");
      expect(data.State).toBe("WA");
      expect(data.Elevator).toBe(false);
      expect(data.WaitingRoom).toBe(true);
      expect(data.FoodService).toBe(true);
      expect(data.Restroom).toBe(true);
      expect(data.OverheadPassengerLoading).toBe(true);
      expect(data.RealtimeShutoffFlag).toBe(false);
      expect(Array.isArray(data.Bulletins)).toBe(true);
      expect(Array.isArray(data.TransitLinks)).toBe(true);
      expect(Array.isArray(data.WaitTimes)).toBe(true);
    });

    it("should handle all nullable properties", () => {
      const data: TerminalVerbose = mockTerminalVerbose;

      expect(data.AddressLineTwo).toBeNull();
      expect(data.Directions).toBeTruthy();
      expect(data.MapLink).toBeTruthy();
      expect(data.IsNoFareCollected).toBe(false);
      expect(data.NoFareCollectedMsg).toBeNull();
      expect(data.AdaInfo).toBe("ADA accessible facilities available");
      expect(data.AdditionalInfo).toBe(
        "Pet-friendly terminal with designated areas"
      );
      expect(data.ConstructionInfo).toBeNull();
      expect(data.RealtimeShutoffMessage).toBeNull();
      expect(data.RealtimeIntroMsg).toBe(
        "Real-time information is available for this terminal"
      );
      expect(data.ResourceStatus).toBe("Active");
      expect(data.SecurityInfo).toBe("Security screening may be required");
      expect(data.TallySystemInfo).toBe("Electronic tally system in use");
      expect(data.TaxiInfo).toBe("Taxi service available at terminal entrance");
      expect(data.TrainInfo).toBe(
        "Amtrak service available in nearby Mount Vernon"
      );
      expect(data.TruckInfo).toBe("Commercial vehicle loading available");
      expect(data.TypeDesc).toBe("Major terminal with full service facilities");
      expect(data.VisitorLinks).toBe(
        "Visit Anacortes: https://www.anacortes.org"
      );
    });
  });

  describe("TerminalsCacheFlushDate Type", () => {
    it("should match the expected structure", () => {
      const data: TerminalsCacheFlushDate = mockCacheFlushDate;

      expect(data.LastUpdated).toBeInstanceOf(Date);
      expect(data.LastUpdated.getTime()).toBe(1752181200000);
      expect(data.Source).toBe("WSF Terminals API");
    });

    it("should handle date string format", () => {
      const data: TerminalsCacheFlushDate = mockCacheFlushDate;

      expect(data.LastUpdated).toBeInstanceOf(Date);
      expect(data.LastUpdated.getTime()).toBe(1752181200000);
      expect(typeof data.Source).toBe("string");
    });
  });

  describe("Date Conversion Validation", () => {
    it("should validate .NET DateString format", () => {
      const dateString = "/Date(1752181200000-0700)/";

      // Extract timestamp from .NET DateString format
      const match = dateString.match(/\/Date\((\d+)/);
      expect(match).not.toBeNull();

      if (match) {
        const timestamp = parseInt(match[1]);
        expect(timestamp).toBe(1752181200000);

        // Convert to Date object
        const date = new Date(timestamp);
        expect(date.getTime()).toBe(1752181200000);
      }
    });

    it("should handle different .NET DateString formats", () => {
      const dateStrings = [
        "/Date(1752181200000)/",
        "/Date(1752181200000-0700)/",
        "/Date(1752181200000+0700)/",
      ];

      dateStrings.forEach((dateString) => {
        const match = dateString.match(/\/Date\((\d+)/);
        expect(match).not.toBeNull();

        if (match) {
          const timestamp = parseInt(match[1]);
          const date = new Date(timestamp);
          expect(date.getTime()).toBe(1752181200000);
        }
      });
    });
  });

  describe("Type Compatibility", () => {
    it("should ensure all types are compatible with API responses", () => {
      // This test ensures that our TypeScript types are compatible
      // with the actual API response structures

      // TerminalBasics should be assignable to TerminalVerbose base properties
      const basics: TerminalBasics = mockTerminalBasics;
      const verbose: TerminalVerbose = mockTerminalVerbose;

      // Common properties should match
      expect(basics.TerminalID).toBe(verbose.TerminalID);
      expect(basics.TerminalName).toBe(verbose.TerminalName);
      expect(basics.TerminalAbbrev).toBe(verbose.TerminalAbbrev);
      expect(basics.SortSeq).toBe(verbose.SortSeq);
      expect(basics.OverheadPassengerLoading).toBe(
        verbose.OverheadPassengerLoading
      );
      expect(basics.Elevator).toBe(verbose.Elevator);
      expect(basics.WaitingRoom).toBe(verbose.WaitingRoom);
      expect(basics.FoodService).toBe(verbose.FoodService);
      expect(basics.Restroom).toBe(verbose.Restroom);
    });

    it("should validate array type compatibility", () => {
      // Test that array types are properly defined
      const basicsArray: TerminalBasics[] = [mockTerminalBasics];
      const locationArray: TerminalLocation[] = [mockTerminalLocation];
      const bulletinArray: TerminalBulletin[] = [mockTerminalBulletin];
      const sailingSpaceArray: TerminalSailingSpace[] = [
        mockTerminalSailingSpace,
      ];
      const transportArray: TerminalTransport[] = [mockTerminalTransport];
      const waitTimesArray: TerminalWaitTimes[] = [mockTerminalWaitTimes];
      const verboseArray: TerminalVerbose[] = [mockTerminalVerbose];

      expect(Array.isArray(basicsArray)).toBe(true);
      expect(Array.isArray(locationArray)).toBe(true);
      expect(Array.isArray(bulletinArray)).toBe(true);
      expect(Array.isArray(sailingSpaceArray)).toBe(true);
      expect(Array.isArray(transportArray)).toBe(true);
      expect(Array.isArray(waitTimesArray)).toBe(true);
      expect(Array.isArray(verboseArray)).toBe(true);

      expect(basicsArray.length).toBe(1);
      expect(locationArray.length).toBe(1);
      expect(bulletinArray.length).toBe(1);
      expect(sailingSpaceArray.length).toBe(1);
      expect(transportArray.length).toBe(1);
      expect(waitTimesArray.length).toBe(1);
      expect(verboseArray.length).toBe(1);
    });
  });
});
