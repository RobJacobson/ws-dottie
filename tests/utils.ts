// Test utilities and mock data for WSF API tests

export const mockRawVesselLocationResponse = [
  {
    VesselID: 1,
    VesselName: "M/V Cathlamet",
    Longitude: -122.3321,
    Latitude: 47.6062,
    Heading: 180,
    Speed: 12.5,
    InService: true,
    AtDock: false,
    DepartingTerminalID: 1,
    DepartingTerminalName: "Seattle",
    ArrivingTerminalID: 2,
    ArrivingTerminalName: "Bainbridge Island",
    TimeStamp: "/Date(1703123456789)/",
    ScheduledDeparture: "/Date(1703124000000)/",
    EstimatedArrival: "/Date(1703125800000)/",
  },
  {
    VesselID: 2,
    VesselName: "M/V Wenatchee",
    Longitude: -122.3456,
    Latitude: 47.5987,
    Heading: 270,
    Speed: 8.2,
    InService: true,
    AtDock: true,
    DepartingTerminalID: 3,
    DepartingTerminalName: "Edmonds",
    ArrivingTerminalID: 4,
    ArrivingTerminalName: "Kingston",
    TimeStamp: "/Date(1703123456790)/",
    ScheduledDeparture: "/Date(1703124600000)/",
    EstimatedArrival: "/Date(1703126400000)/",
  },
];

export const mockRawTerminalResponse = [
  {
    TerminalID: 1,
    TerminalName: "Seattle",
    SpaceAvailable: 45,
    LastUpdate: "/Date(1703123456789)/",
    IsActive: true,
    Location: {
      Latitude: 47.6026,
      Longitude: -122.3393,
    },
  },
  {
    TerminalID: 2,
    TerminalName: "Bainbridge Island",
    SpaceAvailable: 32,
    LastUpdate: "/Date(1703123456790)/",
    IsActive: true,
    Location: {
      Latitude: 47.6231,
      Longitude: -122.5107,
    },
  },
];

export const mockRawScheduleResponse = [
  {
    RouteID: 1,
    RouteName: "Seattle - Bainbridge Island",
    DepartingTerminalID: 1,
    DepartingTerminalName: "Seattle",
    ArrivingTerminalID: 2,
    ArrivingTerminalName: "Bainbridge Island",
    DepartureTime: "2023-12-21T14:30:00",
    ArrivalTime: "2023-12-21T15:00:00",
    VesselID: 1,
    VesselName: "M/V Cathlamet",
    IsActive: true,
    LastUpdate: "/Date(1703123456789)/",
  },
];

export const mockRawFaresResponse = [
  {
    RouteID: 1,
    RouteName: "Seattle - Bainbridge Island",
    VehicleFare: 15.5,
    PassengerFare: 9.25,
    SeniorFare: 4.5,
    DisabledFare: 4.5,
    LastUpdate: "/Date(1703123456789)/",
  },
];

// Helper function to create mock API responses
export const createMockApiResponse = <T>(data: T, success = true) => ({
  success,
  data: success ? data : null,
  error: success ? null : "Mock error message",
  timestamp: new Date().toISOString(),
});

// Helper function to create mock error responses
export const createMockErrorResponse = (errorMessage = "Mock error") => ({
  success: false,
  data: null,
  error: errorMessage,
  timestamp: new Date().toISOString(),
});

// Helper function to create mock WSF date strings
export const createMockWsfDate = (timestamp: number) => `/Date(${timestamp})/`;

// Helper function to create mock ISO date strings
export const createMockIsoDate = (date: Date) =>
  date.toISOString().split("T")[0];

// Helper function to create mock US date strings
export const createMockUsDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
