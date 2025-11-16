import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

export const vesselLocationSchema = z
  .object({
    VesselID: z.number().int().describe("Numeric ID of the vessel."),
    VesselName: z.string().nullable().describe("Display name of the vessel."),
    Mmsi: z
      .number()
      .int()
      .nullable()
      .describe("Maritime Mobile Service Identity number for AIS tracking."),
    DepartingTerminalID: z
      .number()
      .int()
      .describe("Numeric ID of the departing terminal."),
    DepartingTerminalName: z
      .string()
      .nullable()
      .describe("Display name of the departing terminal."),
    DepartingTerminalAbbrev: z
      .string()
      .nullable()
      .describe("Abbreviation code of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .int()
      .nullable()
      .describe("Numeric ID of the arriving terminal."),
    ArrivingTerminalName: z
      .string()
      .nullable()
      .describe("Display name of the arriving terminal."),
    ArrivingTerminalAbbrev: z
      .string()
      .nullable()
      .describe("Abbreviation code of the arriving terminal."),
    Latitude: z
      .number()
      .describe("Vessel GPS latitude coordinate in decimal degrees."),
    Longitude: z
      .number()
      .describe("Vessel GPS longitude coordinate in decimal degrees."),
    Speed: z.number().describe("Vessel speed over ground in knots."),
    Heading: z
      .number()
      .describe(
        "Vessel heading direction in degrees clockwise from north (0-359)."
      ),
    InService: z
      .boolean()
      .describe(
        "True if vessel is available for passenger operations; otherwise false."
      ),
    AtDock: z
      .boolean()
      .describe(
        "True if vessel is currently docked at terminal; otherwise false."
      ),
    LeftDock: zDotnetDate()
      .nullable()
      .describe("UTC datetime when vessel last departed from dock."),
    Eta: zDotnetDate()
      .nullable()
      .describe("UTC datetime of estimated arrival at destination terminal."),
    EtaBasis: z
      .string()
      .nullable()
      .describe("Description of ETA calculation method."),
    ScheduledDeparture: zDotnetDate()
      .nullable()
      .describe("UTC datetime of scheduled departure from origin terminal."),
    OpRouteAbbrev: z
      .array(z.string())
      .nullable()
      .describe(
        "Array of abbreviated route names currently serviced by vessel."
      ),
    VesselPositionNum: z
      .number()
      .int()
      .nullable()
      .describe("Vessel position number for route scheduling."),
    SortSeq: z
      .number()
      .int()
      .describe("Display sort order; lower values appear first in lists."),
    ManagedBy: z
      .union([z.literal(1), z.literal(2)])
      .describe("Code indicating management owner: 1 = WSF, 2 = KCM."),
    TimeStamp: zDotnetDate().describe(
      "UTC datetime when vessel location data was last updated."
    ),
    VesselWatchShutID: z
      .number()
      .int()
      .describe("Numeric ID indicating VesselWatch shutdown status condition."),
    VesselWatchShutMsg: z
      .string()
      .nullable()
      .describe("User-facing message for VesselWatch shutdown status."),
    VesselWatchShutFlag: z
      .string()
      .nullable()
      .describe(
        "Code indicating whether VesselWatch shutdown conditions are active."
      ),
    VesselWatchStatus: z
      .string()
      .nullable()
      .describe(
        "Code indicating current operational state of VesselWatch tracking system."
      ),
    VesselWatchMsg: z
      .string()
      .nullable()
      .describe("User-facing message about VesselWatch system status."),
  })
  .describe(
    "Real-time vessel location data including GPS coordinates, terminal assignments, speed, heading, and ETA information."
  );

export type VesselLocation = z.infer<typeof vesselLocationSchema>;
