import { z } from "zod";

import { vesselClassSchema } from "./class.zod";
import { vesselSchema } from "./vessel.zod";

/**
 * Vessel stats schema for WSF Vessels API
 *
 * This operation provides details regarding vessel specifications (engine count,
 * length of vessel, year built, etc). A VesselID, or unique vessel identifier,
 * may be optionally passed to retrieve a specific vessel. A valid API Access Code
 * from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const vesselStatsSchema = vesselSchema.extend({
  /** Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. */
  Class: vesselClassSchema.describe(
    "Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel."
  ),

  /** The definition or significance behind the name of the vessel. */
  VesselNameDesc: z
    .string()
    .nullable()
    .describe("The definition or significance behind the name of the vessel."),

  /** The history of the vessel. */
  VesselHistory: z.string().nullable().describe("The history of the vessel."),

  /** The length of the vessel's beam in feet / inches. */
  Beam: z
    .string()
    .nullable()
    .describe("The length of the vessel's beam in feet / inches."),

  /** The location where the vessel was built. */
  CityBuilt: z
    .string()
    .nullable()
    .describe("The location where the vessel was built."),

  /** The speed of the vessel. */
  SpeedInKnots: z
    .number()
    .int()
    .nullable()
    .describe("The speed of the vessel."),

  /** The draft of the vessel in feet / inches. */
  Draft: z
    .string()
    .nullable()
    .describe("The draft of the vessel in feet / inches."),

  /** The total count of engines aboard the vessel. */
  EngineCount: z
    .number()
    .int()
    .nullable()
    .describe("The total count of engines aboard the vessel."),

  /** The horsepower of the vessel. */
  Horsepower: z
    .number()
    .int()
    .nullable()
    .describe("The horsepower of the vessel."),

  /** The length of the vessel in feet / inches. */
  Length: z
    .string()
    .nullable()
    .describe("The length of the vessel in feet / inches."),

  /** The max passenger count aboard the vessel. */
  MaxPassengerCount: z
    .number()
    .int()
    .nullable()
    .describe("The max passenger count aboard the vessel."),

  /** Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers). */
  PassengerOnly: z
    .boolean()
    .describe(
      "Indicates whether or not this vessel supports vehicles (true for passenger only, false for vehicles and passengers)."
    ),

  /** Indicates whether or not this vessel is considered a fast ferry. */
  FastFerry: z
    .boolean()
    .describe(
      "Indicates whether or not this vessel is considered a fast ferry."
    ),

  /** The type of engine used in this vessel. */
  PropulsionInfo: z
    .string()
    .nullable()
    .describe("The type of engine used in this vessel."),

  /** The auto deck clearance (in inches) aboard the vessel. */
  TallDeckClearance: z
    .number()
    .int()
    .nullable()
    .describe("The auto deck clearance (in inches) aboard the vessel."),

  /** The max number of vehicles (includes TallDeckSpace). */
  RegDeckSpace: z
    .number()
    .int()
    .nullable()
    .describe("The max number of vehicles (includes TallDeckSpace)."),

  /** The total number of tall deck spaces associated with this vessel. */
  TallDeckSpace: z
    .number()
    .int()
    .nullable()
    .describe(
      "The total number of tall deck spaces associated with this vessel."
    ),

  /** The tonnage of the vessel. */
  Tonnage: z.number().int().nullable().describe("The tonnage of the vessel."),

  /** The displacement (weight in long tons) of the vessel. */
  Displacement: z
    .number()
    .int()
    .nullable()
    .describe("The displacement (weight in long tons) of the vessel."),

  /** The year the vessel was built. */
  YearBuilt: z
    .number()
    .int()
    .nullable()
    .describe("The year the vessel was built."),

  /** The year the vessel was rebuilt. */
  YearRebuilt: z
    .number()
    .int()
    .nullable()
    .describe("The year the vessel was rebuilt."),

  /** A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used. */
  VesselDrawingImg: z
    .string()
    .nullable()
    .describe(
      "A URL that points to a detailed drawing of the vessel. If not available, the DrawingImg from the vessel class may be used."
    ),

  /** Indicates whether or not the vessel is certified for international travel. */
  SolasCertified: z
    .boolean()
    .describe(
      "Indicates whether or not the vessel is certified for international travel."
    ),

  /** The max passenger count aboard the vessel for international travel. */
  MaxPassengerCountForInternational: z
    .number()
    .int()
    .nullable()
    .describe(
      "The max passenger count aboard the vessel for international travel."
    ),
});

export type VesselStats = z.infer<typeof vesselStatsSchema>;

/**
 * Array of vessel stats.
 */
export const vesselsStatsSchema = z
  .array(vesselStatsSchema)
  .describe("The specification details for vessels in the WSF fleet.");

export type VesselsStats = z.infer<typeof vesselsStatsSchema>;
