import { beforeEach, describe, expect, it, vi } from "vitest";

import * as scheduleApi from "@/api/wsf/schedule/api";
import { fetchWsf, fetchWsfArray } from "@/shared/fetching/fetch";

// Mock fetch function
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsf: vi.fn(),
  fetchWsfArray: vi.fn(),
}));

// Mock data
const mockRoute = {
  RouteID: 1,
  RouteAbbrev: "ana-sj",
  Description: "Anacortes / San Juan Islands",
  RegionID: 1,
};

const mockRouteDetails = {
  RouteID: 1,
  RouteAbbrev: "ana-sj",
  Description: "Anacortes / San Juan Islands",
  RegionID: 1,
  CrossingTime: 90,
  ReservationFlag: true,
  PassengerOnlyFlag: false,
  InternationalFlag: false,
  VesselWatchID: 123,
  GeneralRouteNotes: "...",
  SeasonalRouteNotes: "...",
  AdaNotes: "...",
  Alerts: [],
};

const mockSchedule = {
  ScheduleID: 1,
  ScheduleName: "Summer 2024",
  ScheduleSeason: 2024,
  SchedulePDFUrl: "https://example.com/schedule.pdf",
  ScheduleStart: new Date("2024-06-01T00:00:00-07:00"),
  ScheduleEnd: new Date("2024-09-30T00:00:00-07:00"),
  AllRoutes: [1],
  TerminalCombos: [],
};

const mockTimeAdjustment = {
  ScheduleID: 1,
  SchedRouteID: 2,
  RouteID: 1,
  RouteDescription: "Anacortes / San Juan Islands",
  RouteSortSeq: 1,
  SailingID: 10,
  SailingDescription: "Leave Anacortes",
  ActiveSailingDateRange: {
    DateFrom: new Date("2024-07-01T00:00:00-07:00"),
    DateThru: new Date("2024-07-31T00:00:00-07:00"),
    EventID: null,
    EventDescription: null,
  },
  SailingDir: 1,
  JourneyID: 100,
  VesselID: 50,
  VesselName: "Samish",
  VesselHandicapAccessible: true,
  VesselPositionNum: 1,
  TerminalID: 1,
  TerminalDescription: "Anacortes",
  TerminalBriefDescription: "Anacortes",
  JourneyTerminalID: 200,
  DepArrIndicator: 1,
  AdjDateFrom: new Date("2024-07-01T00:00:00-07:00"),
  AdjDateThru: new Date("2024-07-01T00:00:00-07:00"),
  AdjType: 2,
  TidalAdj: true,
  TimeToAdj: new Date("1900-01-01T00:00:00-08:00"),
  Annotations: [
    {
      AnnotationID: 123,
      AnnotationText: "Tidal adjustment",
      AnnotationIVRText: "Tidal adjustment in effect",
      AdjustedCrossingTime: 15,
      AnnotationImg: "tidal.png",
      TypeDescription: "Tidal",
      SortSeq: 1,
    },
  ],
  EventID: null,
  EventDescription: null,
};

const mockAlternativeFormat = {
  AltID: 5,
  SubjectID: 3,
  SubjectName: "Schedules",
  AltTitle: "Cellular / PDA Schedule",
  AltUrl: "https://www.wsdot.com/ferries/schedule/Small/default.aspx",
  AltDesc: "WSF Small Schedule",
  FileType: "pda",
  Status: "Active",
  SortSeq: 30,
  FromDate: new Date("2024-06-01T00:00:00-07:00"),
  ThruDate: new Date("2024-09-30T00:00:00-07:00"),
  ModifiedDate: new Date("2024-07-01T12:10:06-07:00"),
  ModifiedBy: "TranD",
};

// Helpers
const validateRoute = (data: any) => {
  expect(data).toMatchObject({
    RouteID: expect.any(Number),
    RouteAbbrev: expect.any(String),
    Description: expect.any(String),
    RegionID: expect.any(Number),
  });
};

const validateRouteDetails = (data: any) => {
  expect(data).toMatchObject({
    RouteID: expect.any(Number),
    RouteAbbrev: expect.any(String),
    Description: expect.any(String),
    RegionID: expect.any(Number),
    CrossingTime: expect.any(Number),
    ReservationFlag: expect.any(Boolean),
    PassengerOnlyFlag: expect.any(Boolean),
    InternationalFlag: expect.any(Boolean),
    VesselWatchID: expect.any(Number),
    GeneralRouteNotes: expect.any(String),
    SeasonalRouteNotes: expect.any(String),
    AdaNotes: expect.any(String),
    Alerts: expect.any(Array),
  });
};

const validateSchedule = (data: any) => {
  expect(data).toMatchObject({
    ScheduleID: expect.any(Number),
    ScheduleName: expect.any(String),
    ScheduleSeason: expect.any(Number),
    SchedulePDFUrl: expect.any(String),
    ScheduleStart: expect.any(Date),
    ScheduleEnd: expect.any(Date),
    AllRoutes: expect.any(Array),
    TerminalCombos: expect.any(Array),
  });
};

const validateTimeAdjustment = (data: any) => {
  expect(data).toMatchObject({
    ScheduleID: expect.any(Number),
    SchedRouteID: expect.any(Number),
    RouteID: expect.any(Number),
    RouteDescription: expect.any(String),
    RouteSortSeq: expect.any(Number),
    SailingID: expect.any(Number),
    SailingDescription: expect.any(String),
    ActiveSailingDateRange: expect.any(Object),
    SailingDir: expect.any(Number),
    JourneyID: expect.any(Number),
    VesselID: expect.any(Number),
    VesselName: expect.any(String),
    VesselHandicapAccessible: expect.any(Boolean),
    VesselPositionNum: expect.any(Number),
    TerminalID: expect.any(Number),
    TerminalDescription: expect.any(String),
    TerminalBriefDescription: expect.any(String),
    JourneyTerminalID: expect.any(Number),
    DepArrIndicator: expect.any(Number),
    AdjDateFrom: expect.any(Date),
    AdjDateThru: expect.any(Date),
    AdjType: expect.any(Number),
    TidalAdj: expect.any(Boolean),
    TimeToAdj: expect.any(Date),
    Annotations: expect.any(Array),
    EventID: null,
    EventDescription: null,
  });
  // Validate annotation structure
  if (data.Annotations.length > 0) {
    expect(data.Annotations[0]).toMatchObject({
      AnnotationID: expect.any(Number),
      AnnotationText: expect.any(String),
      AnnotationIVRText: expect.any(String),
      AdjustedCrossingTime: expect.any(Number),
      AnnotationImg: expect.any(String),
      TypeDescription: expect.any(String),
      SortSeq: expect.any(Number),
    });
  }
};

const validateAlternativeFormat = (data: any) => {
  expect(data).toMatchObject({
    AltID: expect.any(Number),
    SubjectID: expect.any(Number),
    SubjectName: expect.any(String),
    AltTitle: expect.any(String),
    AltUrl: expect.any(String),
    AltDesc: expect.any(String),
    FileType: expect.any(String),
    Status: expect.any(String),
    SortSeq: expect.any(Number),
    FromDate: expect.any(Date),
    ThruDate: expect.any(Date),
    ModifiedDate: expect.any(Date),
    ModifiedBy: expect.any(String),
  });
};

// Tests

describe("WSF Schedule API", () => {
  beforeEach(() => {
    vi.mocked(fetchWsf).mockReset();
    vi.mocked(fetchWsfArray).mockReset();
  });

  it("getRoutes returns valid route array", async () => {
    vi.mocked(fetchWsfArray).mockResolvedValue([mockRoute]);
    const result = await scheduleApi.getRoutes(new Date("2024-07-01"));
    expect(Array.isArray(result)).toBe(true);
    validateRoute(result[0]);
  });

  it("getRouteDetailsByRoute returns valid route details", async () => {
    vi.mocked(fetchWsf).mockResolvedValue(mockRouteDetails);
    const result = await scheduleApi.getRouteDetailsByRoute({
      tripDate: new Date("2024-07-01"),
      routeId: 1,
    });
    validateRouteDetails(result);
  });

  it("getScheduledRoutes returns valid schedule array", async () => {
    vi.mocked(fetchWsfArray).mockResolvedValue([mockSchedule]);
    const result = await scheduleApi.getScheduledRoutes();
    expect(Array.isArray(result)).toBe(true);
    validateSchedule(result[0]);
  });

  it("getTimeAdjustments returns valid time adjustment array", async () => {
    vi.mocked(fetchWsfArray).mockResolvedValue([mockTimeAdjustment]);
    const result = await scheduleApi.getTimeAdjustments();
    expect(Array.isArray(result)).toBe(true);
    validateTimeAdjustment(result[0]);
  });

  it("getAlternativeFormats returns valid alternative format array", async () => {
    vi.mocked(fetchWsfArray).mockResolvedValue([mockAlternativeFormat]);
    const result = await scheduleApi.getAlternativeFormats("Schedules");
    expect(Array.isArray(result)).toBe(true);
    validateAlternativeFormat(result[0]);
  });
});

describe("WSF Schedule API - Cache/Date/Season/Terminal Endpoints", () => {
  beforeEach(() => {
    vi.mocked(fetchWsf).mockReset();
    vi.mocked(fetchWsfArray).mockReset();
  });

  it("getCacheFlushDateSchedule returns a Date or null", async () => {
    const date = new Date("2024-07-01T00:00:00-07:00");
    vi.mocked(fetchWsf).mockResolvedValue(date);
    const result = await scheduleApi.getCacheFlushDateSchedule();
    expect(result === null || result instanceof Date).toBe(true);
  });

  it("getValidDateRange returns a valid date range object", async () => {
    const mockRange = {
      DateFrom: new Date("2024-07-01T00:00:00-07:00"),
      DateThru: new Date("2024-09-30T00:00:00-07:00"),
    };
    vi.mocked(fetchWsf).mockResolvedValue(mockRange);
    const result = await scheduleApi.getValidDateRange();
    expect(result).toMatchObject({
      DateFrom: expect.any(Date),
      DateThru: expect.any(Date),
    });
  });

  it("getActiveSeasons returns an array of ActiveSeason", async () => {
    const mockSeason = {
      ScheduleID: 1,
      ScheduleName: "Summer 2024",
      ScheduleSeason: 2024,
      SchedulePDFUrl: "https://example.com/schedule.pdf",
      ScheduleStart: new Date("2024-06-01T00:00:00-07:00"),
      ScheduleEnd: new Date("2024-09-30T00:00:00-07:00"),
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockSeason]);
    const result = await scheduleApi.getActiveSeasons();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      ScheduleID: expect.any(Number),
      ScheduleName: expect.any(String),
      ScheduleSeason: expect.any(Number),
      SchedulePDFUrl: expect.any(String),
      ScheduleStart: expect.any(Date),
      ScheduleEnd: expect.any(Date),
    });
  });

  it("getTerminals returns an array of ScheduleTerminal", async () => {
    const mockTerminal = { TerminalID: 1, Description: "Anacortes" };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockTerminal]);
    const result = await scheduleApi.getTerminals(new Date("2024-07-01"));
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      TerminalID: expect.any(Number),
      Description: expect.any(String),
    });
  });

  it("getTerminalsAndMates returns an array of ScheduleTerminalCombo", async () => {
    const mockCombo = {
      DepartingTerminalID: 1,
      DepartingDescription: "Anacortes",
      ArrivingTerminalID: 2,
      ArrivingDescription: "Friday Harbor",
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockCombo]);
    const result = await scheduleApi.getTerminalsAndMates(
      new Date("2024-07-01")
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      DepartingTerminalID: expect.any(Number),
      DepartingDescription: expect.any(String),
      ArrivingTerminalID: expect.any(Number),
      ArrivingDescription: expect.any(String),
    });
  });

  it("getTerminalsAndMatesByRoute returns an array of ScheduleTerminalCombo", async () => {
    const mockCombo = {
      DepartingTerminalID: 1,
      DepartingDescription: "Anacortes",
      ArrivingTerminalID: 2,
      ArrivingDescription: "Friday Harbor",
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockCombo]);
    const result = await scheduleApi.getTerminalsAndMatesByRoute({
      tripDate: new Date("2024-07-01"),
      routeId: 1,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      DepartingTerminalID: expect.any(Number),
      DepartingDescription: expect.any(String),
      ArrivingTerminalID: expect.any(Number),
      ArrivingDescription: expect.any(String),
    });
  });

  it("getTerminalMates returns an array of ScheduleTerminal", async () => {
    const mockTerminal = { TerminalID: 2, Description: "Friday Harbor" };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockTerminal]);
    const result = await scheduleApi.getTerminalMates(
      new Date("2024-07-01"),
      1
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      TerminalID: expect.any(Number),
      Description: expect.any(String),
    });
  });
});

describe("WSF Schedule API - Routes and Route Details Endpoints", () => {
  beforeEach(() => {
    vi.mocked(fetchWsf).mockReset();
    vi.mocked(fetchWsfArray).mockReset();
  });

  it("getRoutes returns an array of Route", async () => {
    const mockRoute = {
      RouteID: 1,
      RouteAbbrev: "ana-sj",
      Description: "Anacortes / San Juan Islands",
      RegionID: 1,
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockRoute]);
    const result = await scheduleApi.getRoutes(new Date("2024-07-01"));
    expect(Array.isArray(result)).toBe(true);
    validateRoute(result[0]);
  });

  it("getRoutesByTerminals returns an array of Route", async () => {
    const mockRoute = {
      RouteID: 2,
      RouteAbbrev: "sea-bain",
      Description: "Seattle / Bainbridge",
      RegionID: 2,
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockRoute]);
    const result = await scheduleApi.getRoutesByTerminals({
      tripDate: new Date("2024-07-01"),
      departingTerminalId: 1,
      arrivingTerminalId: 2,
    });
    expect(Array.isArray(result)).toBe(true);
    validateRoute(result[0]);
  });

  it("getRoutesWithDisruptions returns an array of Route", async () => {
    const mockRoute = {
      RouteID: 3,
      RouteAbbrev: "edm-king",
      Description: "Edmonds / Kingston",
      RegionID: 3,
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockRoute]);
    const result = await scheduleApi.getRoutesWithDisruptions(
      new Date("2024-07-01")
    );
    expect(Array.isArray(result)).toBe(true);
    validateRoute(result[0]);
  });

  it("getRouteDetails returns an array of Route", async () => {
    const mockRoute = {
      RouteID: 4,
      RouteAbbrev: "fa-sj",
      Description: "Fauntleroy / Vashon",
      RegionID: 4,
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockRoute]);
    const result = await scheduleApi.getRouteDetails(new Date("2024-07-01"));
    expect(Array.isArray(result)).toBe(true);
    validateRoute(result[0]);
  });

  it("getRouteDetailsByTerminals returns an array of Route", async () => {
    const mockRoute = {
      RouteID: 5,
      RouteAbbrev: "pt-coup",
      Description: "Port Townsend / Coupeville",
      RegionID: 5,
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockRoute]);
    const result = await scheduleApi.getRouteDetailsByTerminals({
      tripDate: new Date("2024-07-01"),
      departingTerminalId: 1,
      arrivingTerminalId: 2,
    });
    expect(Array.isArray(result)).toBe(true);
    validateRoute(result[0]);
  });

  it("getRouteDetailsByRoute returns a RouteDetails object", async () => {
    vi.mocked(fetchWsf).mockResolvedValue(mockRouteDetails);
    const result = await scheduleApi.getRouteDetailsByRoute({
      tripDate: new Date("2024-07-01"),
      routeId: 1,
    });
    validateRouteDetails(result);
  });
});

describe("WSF Schedule API - Scheduled Routes, Sailings, and Schedule Endpoints", () => {
  beforeEach(() => {
    vi.mocked(fetchWsf).mockReset();
    vi.mocked(fetchWsfArray).mockReset();
  });

  it("getScheduledRoutes returns an array of ScheduledRoute", async () => {
    const mockScheduledRoute = {
      ScheduleID: 1,
      SchedRouteID: 2,
      ContingencyOnly: false,
      RouteID: 1,
      RouteAbbrev: "ana-sj",
      Description: "Anacortes / San Juan Islands",
      SeasonalRouteNotes: "Summer schedule",
      RegionID: 1,
      ServiceDisruptions: [],
      ContingencyAdj: [],
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockScheduledRoute]);
    const result = await scheduleApi.getScheduledRoutes();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      ScheduleID: expect.any(Number),
      SchedRouteID: expect.any(Number),
      ContingencyOnly: expect.any(Boolean),
      RouteID: expect.any(Number),
      RouteAbbrev: expect.any(String),
      Description: expect.any(String),
      SeasonalRouteNotes: expect.any(String),
      RegionID: expect.any(Number),
      ServiceDisruptions: expect.any(Array),
      ContingencyAdj: expect.any(Array),
    });
  });

  it("getScheduledRoutesBySeason returns an array of ScheduledRoute", async () => {
    const mockScheduledRoute = {
      ScheduleID: 2,
      SchedRouteID: 3,
      ContingencyOnly: false,
      RouteID: 2,
      RouteAbbrev: "sea-bain",
      Description: "Seattle / Bainbridge",
      SeasonalRouteNotes: "Winter schedule",
      RegionID: 2,
      ServiceDisruptions: [],
      ContingencyAdj: [],
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockScheduledRoute]);
    const result = await scheduleApi.getScheduledRoutesBySeason(2);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      ScheduleID: expect.any(Number),
      SchedRouteID: expect.any(Number),
      ContingencyOnly: expect.any(Boolean),
      RouteID: expect.any(Number),
      RouteAbbrev: expect.any(String),
      Description: expect.any(String),
      SeasonalRouteNotes: expect.any(String),
      RegionID: expect.any(Number),
      ServiceDisruptions: expect.any(Array),
      ContingencyAdj: expect.any(Array),
    });
  });

  it("getSailings returns an array of Sailing", async () => {
    const mockSailing = {
      ScheduleID: 1,
      SchedRouteID: 2,
      RouteID: 1,
      SailingID: 10,
      SailingDescription: "Leave Anacortes",
      SailingNotes: "Summer schedule",
      DisplayColNum: 1,
      SailingDir: 1,
      DayOpDescription: "Daily",
      DayOpUseForHoliday: false,
      ActiveDateRanges: [
        {
          DateFrom: new Date("2024-07-01T00:00:00-07:00"),
          DateThru: new Date("2024-07-31T00:00:00-07:00"),
          EventID: null,
          EventDescription: null,
        },
      ],
      Journs: [],
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockSailing]);
    const result = await scheduleApi.getSailings({ schedRouteId: 2 });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      ScheduleID: expect.any(Number),
      SchedRouteID: expect.any(Number),
      RouteID: expect.any(Number),
      SailingID: expect.any(Number),
      SailingDescription: expect.any(String),
      SailingNotes: expect.any(String),
      DisplayColNum: expect.any(Number),
      SailingDir: expect.any(Number),
      DayOpDescription: expect.any(String),
      DayOpUseForHoliday: expect.any(Boolean),
      ActiveDateRanges: expect.any(Array),
      Journs: expect.any(Array),
    });
  });

  it("getAllSailings returns an array of Sailing", async () => {
    const mockSailing = {
      ScheduleID: 1,
      SchedRouteID: 2,
      RouteID: 1,
      SailingID: 11,
      SailingDescription: "Leave Friday Harbor",
      SailingNotes: "Summer schedule",
      DisplayColNum: 2,
      SailingDir: 2,
      DayOpDescription: "Daily",
      DayOpUseForHoliday: false,
      ActiveDateRanges: [
        {
          DateFrom: new Date("2024-07-01T00:00:00-07:00"),
          DateThru: new Date("2024-07-31T00:00:00-07:00"),
          EventID: null,
          EventDescription: null,
        },
      ],
      Journs: [],
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockSailing]);
    const result = await scheduleApi.getAllSailings({ schedRouteId: 2 });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      ScheduleID: expect.any(Number),
      SchedRouteID: expect.any(Number),
      RouteID: expect.any(Number),
      SailingID: expect.any(Number),
      SailingDescription: expect.any(String),
      SailingNotes: expect.any(String),
      DisplayColNum: expect.any(Number),
      SailingDir: expect.any(Number),
      DayOpDescription: expect.any(String),
      DayOpUseForHoliday: expect.any(Boolean),
      ActiveDateRanges: expect.any(Array),
      Journs: expect.any(Array),
    });
  });

  it("getScheduleByRoute returns a ScheduleResponse object", async () => {
    vi.mocked(fetchWsf).mockResolvedValue(mockSchedule);
    const result = await scheduleApi.getScheduleByRoute({
      tripDate: new Date("2024-07-01"),
      routeId: 1,
    });
    validateSchedule(result);
  });

  it("getScheduleByTerminals returns a ScheduleResponse object", async () => {
    vi.mocked(fetchWsf).mockResolvedValue(mockSchedule);
    const result = await scheduleApi.getScheduleByTerminals({
      tripDate: new Date("2024-07-01"),
      departingTerminalId: 1,
      arrivingTerminalId: 2,
    });
    validateSchedule(result);
  });

  it("getScheduleTodayByRoute returns a ScheduleResponse object", async () => {
    vi.mocked(fetchWsf).mockResolvedValue(mockSchedule);
    const result = await scheduleApi.getScheduleTodayByRoute({
      routeId: 1,
      onlyRemainingTimes: false,
    });
    validateSchedule(result);
  });

  it("getScheduleTodayByTerminals returns a ScheduleResponse object", async () => {
    vi.mocked(fetchWsf).mockResolvedValue(mockSchedule);
    const result = await scheduleApi.getScheduleTodayByTerminals({
      departingTerminalId: 1,
      arrivingTerminalId: 2,
      onlyRemainingTimes: true,
    });
    validateSchedule(result);
  });
});

describe("WSF Schedule API - Time Adjustments, Alerts, and Alternative Formats Endpoints", () => {
  beforeEach(() => {
    vi.mocked(fetchWsf).mockReset();
    vi.mocked(fetchWsfArray).mockReset();
  });

  it("getTimeAdjustments returns an array of TimeAdjustment", async () => {
    vi.mocked(fetchWsfArray).mockResolvedValue([mockTimeAdjustment]);
    const result = await scheduleApi.getTimeAdjustments();
    expect(Array.isArray(result)).toBe(true);
    validateTimeAdjustment(result[0]);
  });

  it("getTimeAdjustmentsByRoute returns an array of TimeAdjustment", async () => {
    const mockTimeAdj = {
      ...mockTimeAdjustment,
      RouteID: 2,
      RouteDescription: "Seattle / Bainbridge",
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockTimeAdj]);
    const result = await scheduleApi.getTimeAdjustmentsByRoute(2);
    expect(Array.isArray(result)).toBe(true);
    validateTimeAdjustment(result[0]);
  });

  it("getTimeAdjustmentsBySchedRoute returns an array of TimeAdjustment", async () => {
    const mockTimeAdj = {
      ...mockTimeAdjustment,
      SchedRouteID: 3,
      SailingDescription: "Leave Seattle",
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockTimeAdj]);
    const result = await scheduleApi.getTimeAdjustmentsBySchedRoute(3);
    expect(Array.isArray(result)).toBe(true);
    validateTimeAdjustment(result[0]);
  });

  it("getAlerts returns an array of Alert", async () => {
    const mockAlert = {
      BulletinID: 1,
      BulletinFlag: true,
      BulletinText: "Service disruption",
      CommunicationFlag: false,
      CommunicationText: null,
      RouteAlertFlag: true,
      RouteAlertText: "Route affected",
      HomepageAlertText: "Check homepage for updates",
      PublishDate: new Date("2024-07-01T00:00:00-07:00"),
      DisruptionDescription: "Mechanical issues",
      AllRoutesFlag: false,
      SortSeq: 1,
      AlertTypeID: 1,
      AlertType: "Service Disruption",
      AlertFullTitle: "Service Disruption - Route 1",
      AffectedRouteIDs: [1, 2],
      IVRText: "Press 1 for route information",
    };
    vi.mocked(fetchWsfArray).mockResolvedValue([mockAlert]);
    const result = await scheduleApi.getAlerts();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      BulletinID: expect.any(Number),
      BulletinFlag: expect.any(Boolean),
      BulletinText: expect.any(String),
      CommunicationFlag: expect.any(Boolean),
      RouteAlertFlag: expect.any(Boolean),
      RouteAlertText: expect.any(String),
      HomepageAlertText: expect.any(String),
      PublishDate: expect.any(Date),
      AllRoutesFlag: expect.any(Boolean),
      SortSeq: expect.any(Number),
      AlertTypeID: expect.any(Number),
      AlertType: expect.any(String),
      AlertFullTitle: expect.any(String),
      AffectedRouteIDs: expect.any(Array),
    });
  });

  it("getAlternativeFormats returns an array of AlternativeFormat", async () => {
    vi.mocked(fetchWsfArray).mockResolvedValue([mockAlternativeFormat]);
    const result = await scheduleApi.getAlternativeFormats("Schedules");
    expect(Array.isArray(result)).toBe(true);
    validateAlternativeFormat(result[0]);
  });
});
