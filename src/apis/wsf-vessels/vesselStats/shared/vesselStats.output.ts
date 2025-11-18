import { z } from "@/shared/zod";
import { vesselBaseSchema } from "../../shared/vesselBase";

export const vesselStatSchema = vesselBaseSchema
  .extend({
    VesselNameDesc: z
      .string()
      .describe("Cultural and historical context for vessel name origin."),
    VesselHistory: z
      .string()
      .nullable()
      .describe("Operational history and milestones for the vessel."),
    Beam: z.string().describe("Vessel beam width in feet and inches."),
    CityBuilt: z.string().describe("City where vessel was constructed."),
    SpeedInKnots: z
      .number()
      .int()
      .nullable()
      .describe("Maximum operational speed in knots."),
    Draft: z.string().describe("Vessel draft depth in feet and inches."),
    EngineCount: z
      .number()
      .int()
      .nullable()
      .describe("Total number of propulsion engines aboard vessel."),
    Horsepower: z
      .number()
      .int()
      .nullable()
      .describe("Total engine horsepower output."),
    Length: z.string().describe("Vessel overall length in feet and inches."),
    MaxPassengerCount: z
      .number()
      .int()
      .nullable()
      .describe("Maximum passenger capacity."),
    PassengerOnly: z
      .boolean()
      .describe("True if vessel carries only passengers; otherwise false."),
    FastFerry: z
      .boolean()
      .describe(
        "True if vessel is classified as a fast ferry; otherwise false."
      ),
    PropulsionInfo: z
      .string()
      .describe("Engine propulsion type and fuel technology."),
    TallDeckClearance: z
      .number()
      .int()
      .nullable()
      .describe("Tall deck vertical clearance height in inches."),
    RegDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe(
        "Maximum regular deck vehicle capacity including tall deck spaces."
      ),
    TallDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe("Tall deck vehicle capacity."),
    Tonnage: z.number().int().nullable().describe("Vessel gross tonnage."),
    Displacement: z
      .number()
      .int()
      .nullable()
      .describe("Vessel displacement weight in long tons."),
    YearBuilt: z
      .number()
      .int()
      .nullable()
      .describe("Vessel construction year."),
    YearRebuilt: z
      .number()
      .int()
      .nullable()
      .describe("Vessel major rebuild year."),
    VesselDrawingImg: z
      .string()
      .nullable()
      .describe("URL to detailed vessel drawing image."),
    SolasCertified: z
      .boolean()
      .describe(
        "True if vessel meets SOLAS international safety standards; otherwise false."
      ),
    MaxPassengerCountForInternational: z
      .number()
      .int()
      .nullable()
      .describe("Maximum passenger capacity for international routes."),
  })
  .describe(
    "Vessel technical specifications including dimensions, capacity, speed, propulsion, and build details."
  );

export type VesselStat = z.infer<typeof vesselStatSchema>;
