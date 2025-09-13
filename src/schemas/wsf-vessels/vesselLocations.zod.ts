import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Vessel locations schema for WSF Vessels API
 *
 * This operation provides vessel locations and associated ETA data. A VesselID, or
 * unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of
 * the URL string.
 *
 * ⚠️ Important: This data changes very frequently (potentially every 5 seconds).
 * Please do not cache results in your application for an extended period of time.
 */
export const vesselLocationsSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),

  /** The name of the vessel. */
  VesselName: z.string().nullable().describe("The name of the vessel."),

  /** The vessel's Maritime Mobile Service Identity. */
  Mmsi: z
    .number()
    .int()
    .nullable()
    .describe("The vessel's Maritime Mobile Service Identity."),

  /** Unique identifier pertaining to the terminal where this vessel is docked or was last docked. */
  DepartingTerminalID: z
    .number()
    .int()
    .describe(
      "Unique identifier pertaining to the terminal where this vessel is docked or was last docked."
    ),

  /** The name of the terminal where this vessel is docked or was last docked. */
  DepartingTerminalName: z
    .string()
    .nullable()
    .describe(
      "The name of the terminal where this vessel is docked or was last docked."
    ),

  /** The abbreviated terminal name where this vessel is docked or was last docked. */
  DepartingTerminalAbbrev: z
    .string()
    .nullable()
    .describe(
      "The abbreviated terminal name where this vessel is docked or was last docked."
    ),

  /** Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined. */
  ArrivingTerminalID: z
    .number()
    .int()
    .nullable()
    .describe(
      "Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
    ),

  /** The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined. */
  ArrivingTerminalName: z
    .string()
    .nullable()
    .describe(
      "The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
    ),

  /** The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined. */
  ArrivingTerminalAbbrev: z
    .string()
    .nullable()
    .describe(
      "The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined."
    ),

  /** The latitude of the vessel. */
  Latitude: z.number().describe("The latitude of the vessel."),

  /** The longitude of the vessel. */
  Longitude: z.number().describe("The longitude of the vessel."),

  /** The speed of the vessel (in Knots). */
  Speed: z.number().describe("The speed of the vessel (in Knots)."),

  /** The heading of the vessel (in degrees). */
  Heading: z.number().int().describe("The heading of the vessel (in degrees)."),

  /** Indicates whether or not the vessel is in service. */
  InService: z
    .boolean()
    .describe("Indicates whether or not the vessel is in service."),

  /** Indicates whether or not the vessel is docked. */
  AtDock: z
    .boolean()
    .describe("Indicates whether or not the vessel is docked."),

  /** The date and time that the vessel last left the dock. This value is not present when docked. */
  LeftDock: zWsdotDate()
    .nullable()
    .describe(
      "The date and time that the vessel last left the dock. This value is not present when docked."
    ),

  /** The estimated date and time that the vessel will arrive at its destination. This value is not present when docked. */
  Eta: zWsdotDate()
    .nullable()
    .describe(
      "The estimated date and time that the vessel will arrive at its destination. This value is not present when docked."
    ),

  /** A brief description summarizing how the Eta is being calculated. This value is not present when docked. */
  EtaBasis: z
    .string()
    .nullable()
    .describe(
      "A brief description summarizing how the Eta is being calculated. This value is not present when docked."
    ),

  /** The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined. */
  ScheduledDeparture: zWsdotDate()
    .nullable()
    .describe(
      "The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined."
    ),

  /** An array of strings that contain 0 or more abbreviated route names currently being serviced by this vessel. */
  OpRouteAbbrev: z
    .array(z.string())
    .nullable()
    .describe(
      "An array of strings that contain 0 or more abbreviated route names currently being serviced by this vessel."
    ),

  /** For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service. */
  VesselPositionNum: z
    .number()
    .int()
    .nullable()
    .describe(
      "For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service."
    ),

  /** A preferred sort order (sort-ascending with respect to other vessels). */
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other vessels)."
    ),

  /** Indicates who manages this vessel. 1 for WSF, 2 for KCM. */
  ManagedBy: z
    .union([z.literal(1), z.literal(2)])
    .describe("Indicates who manages this vessel (1 = WSF, 2 = KCM)."),

  /** The date and time when this vessel location was last updated. */
  TimeStamp: zWsdotDate().describe(
    "The date and time when this vessel location was last updated."
  ),
});

export type VesselLocations = z.infer<typeof vesselLocationsSchema>;
