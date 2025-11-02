import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * VesselLocations schema
 *
 * This operation retrieves vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselLocationsSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '2' for vessel Chelan, '38' for vessel Yakima. Used as primary key for vessel location tracking."
      ),
    VesselName: z
      .string()
      .nullable()
      .describe(
        "Vessel name, as a human-readable description. E.g., 'Chelan' for vessel 2, 'Yakima' for vessel 38, null when vessel name is unavailable. Provides vessel identification for location display."
      ),
    Mmsi: z
      .number()
      .int()
      .nullable()
      .describe(
        "Maritime Mobile Service Identity number, as an integer ID. E.g., '366709770' for vessel Chelan, '366772750' for vessel Yakima, null when MMSI is unavailable. Used for AIS tracking and maritime communication systems."
      ),
    DepartingTerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '1' for Anacortes terminal. Indicates origin terminal where vessel is docked or was last docked."
      ),
    DepartingTerminalName: z
      .string()
      .nullable()
      .describe(
        "Departing terminal name, as a human-readable description. E.g., 'Friday Harbor' for terminal 10, 'Anacortes' for terminal 1, null when terminal name is unavailable. Provides origin terminal identification for display."
      ),
    DepartingTerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "Departing terminal abbreviation code, as a terminal abbreviation. E.g., 'FRH' for Friday Harbor, 'ANA' for Anacortes, null when abbreviation is unavailable. Used for compact terminal identification in displays and route information."
      ),
    ArrivingTerminalID: z
      .number()
      .int()
      .nullable()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '1' for Anacortes terminal, '10' for Friday Harbor terminal, null when next destination is undetermined. Indicates destination terminal for vessel's current voyage."
      ),
    ArrivingTerminalName: z
      .string()
      .nullable()
      .describe(
        "Arriving terminal name, as a human-readable description. E.g., 'Anacortes' for terminal 1, 'Friday Harbor' for terminal 10, null when next destination is undetermined. Provides destination terminal identification for display."
      ),
    ArrivingTerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "Arriving terminal abbreviation code, as a terminal abbreviation. E.g., 'ANA' for Anacortes, 'FRH' for Friday Harbor, null when next destination is undetermined. Used for compact destination terminal identification."
      ),
    Latitude: z
      .number()
      .describe(
        "Vessel GPS latitude coordinate, in decimal degrees. E.g., '48.529468' for vessel Chelan near Friday Harbor, '48.548502' for vessel Yakima near Anacortes."
      ),
    Longitude: z
      .number()
      .describe(
        "Vessel GPS longitude coordinate, in decimal degrees. E.g., '-122.818977' for vessel Chelan near Friday Harbor, '-122.83794' for vessel Yakima near Anacortes."
      ),
    Speed: z
      .number()
      .describe(
        "Vessel speed over ground, as knots. E.g., '15.7' for vessel Chelan in transit, '0' when vessel is docked like Suquamish. Used for voyage progress tracking and arrival time calculations."
      ),
    Heading: z
      .number()
      .describe(
        "Vessel heading direction, as degrees. E.g., '102' for vessel Chelan heading east, '324' for vessel Yakima heading northwest, '159' for docked vessel Suquamish. Measured clockwise from north (0-359 degrees)."
      ),
    InService: z
      .boolean()
      .describe(
        "Vessel operational service status, as a boolean. E.g., true for active vessels like Chelan and Yakima, false when vessel is out of service. Indicates whether vessel is available for passenger operations."
      ),
    AtDock: z
      .boolean()
      .describe(
        "Vessel docked status, as a boolean. E.g., true for docked vessels like Suquamish and Puyallup, false for vessels in transit like Chelan and Yakima. Determines whether vessel is currently at terminal or underway."
      ),
    LeftDock: zDotnetDate()
      .nullable()
      .describe(
        "Timestamp when vessel last departed from dock, as a UTC datetime. E.g., '2025-09-08T01:20:00.000Z' for vessel Chelan that left Friday Harbor at 6:20 PM, null when vessel is currently docked. Used to calculate voyage duration and departure delay tracking."
      ),
    Eta: zDotnetDate()
      .nullable()
      .describe(
        "Estimated arrival time at destination terminal, as a UTC datetime. E.g., '2025-09-08T02:30:00.000Z' for vessel Chelan arriving Anacortes at 7:30 PM, null when vessel is docked or ETA unavailable. Used for arrival time predictions and passenger information displays."
      ),
    EtaBasis: z
      .string()
      .nullable()
      .describe(
        "Description of ETA calculation method, as a human-readable description. E.g., 'Vessel Chelan departed Friday Harbor going to Anacortes and using vessel Chelan closest location data from Nov 1 2025 10:59AM' for calculated ETA, 'Vessel is Docked. ETA is only available when underway.' when docked, null when ETA basis is unavailable. Explains how arrival time estimate was derived."
      ),
    ScheduledDeparture: zDotnetDate()
      .nullable()
      .describe(
        "Scheduled departure time from origin terminal, as a UTC datetime. E.g., '2025-09-08T01:20:00.000Z' for vessel Chelan scheduled to depart Friday Harbor at 6:20 PM, null when scheduled departure is undetermined. Used to compare actual vs. scheduled departure times."
      ),
    OpRouteAbbrev: z
      .array(z.string())
      .nullable()
      .describe(
        "Abbreviated route names currently serviced by vessel, as an array of route codes. E.g., ['ana-sj'] for Anacortes-San Juan route, ['muk-cl'] for Mukilteo-Clinton route, null or empty array when vessel is not in service. Used to identify which routes vessel is currently operating."
      ),
    VesselPositionNum: z
      .number()
      .int()
      .nullable()
      .describe(
        "Vessel position number for route scheduling, as an integer. E.g., '1' for first vessel on route, '2' for second vessel, null when vessel is not in service. Identifies which scheduled departure slot vessel is servicing on route."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Preferred sort order for display purposes, as an integer. E.g., '20' for San Juan Islands routes, '30' for Port Townsend-Coupeville route, '40' for Mukilteo-Clinton route. Lower values appear first when sorting vessels in ascending order."
      ),
    ManagedBy: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Vessel management organization, as a status code. Valid values: 1 (WSF), 2 (KCM). E.g., '1' indicates vessel is managed by Washington State Ferries, '2' indicates vessel is managed by King County Metro. Determines operational control and management responsibility."
      ),
    TimeStamp: zDotnetDate().describe(
      "Timestamp when vessel location data was last updated, as a UTC datetime. E.g., '2025-09-08T02:02:00.000Z' for location update at 7:02 PM. Indicates data freshness and update frequency for real-time tracking systems."
    ),
    VesselWatchShutID: z
      .number()
      .int()
      .describe(
        "VesselWatch shutdown identifier, as an integer ID. E.g., '2' for vessel information unavailable, '3' for vessel in service. Used to identify specific VesselWatch system status conditions."
      ),
    VesselWatchShutMsg: z
      .string()
      .nullable()
      .describe(
        "VesselWatch shutdown message, as a human-readable description. E.g., 'Vessel information unavailable' for status ID 2, 'Vessel in Service' for status ID 3, null when shutdown message is unavailable. Provides user-facing status message for VesselWatch system."
      ),
    VesselWatchShutFlag: z
      .string()
      .nullable()
      .describe(
        "VesselWatch shutdown flag, as a status code. E.g., '0' for normal operation, null when flag is unavailable. Indicates whether VesselWatch system shutdown conditions are active."
      ),
    VesselWatchStatus: z
      .string()
      .nullable()
      .describe(
        "VesselWatch system status, as a status code. E.g., '0' for normal operation, null when status is unavailable. Indicates current operational state of VesselWatch tracking system."
      ),
    VesselWatchMsg: z
      .string()
      .nullable()
      .describe(
        "VesselWatch system message, as a human-readable description. E.g., 'WSF's VesselWatch page is currently not responding and is out of service...' for system issues, null when message is unavailable. Provides user-facing information about VesselWatch system status."
      ),
  })
  .describe(
    "Represents real-time vessel location data including GPS coordinates, terminal assignments, speed/heading, and ETA information. E.g., vessel Chelan at position 48.529468, -122.818977 departing Friday Harbor going to Anacortes at 15.7 knots with ETA 7:30 PM. Used for real-time vessel tracking, arrival time calculations, and passenger information systems. Updates every 5 seconds."
  );

export type VesselLocations = z.infer<typeof vesselLocationsSchema>;
