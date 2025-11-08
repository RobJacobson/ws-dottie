import { z } from "@/shared/zod";
import { vesselBaseSchema } from "../shared/vesselBase";

/**
 * VesselStats schema
 *
 * This operation retrieves details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselStatSchema = vesselBaseSchema
  .extend({
    VesselNameDesc: z
      .string()
      .describe(
        "Vessel name origin and significance, as a human-readable description. E.g., 'The Chimacum People who spoke the Chimaquan dialect, inhabited the area...' for Chimacum, 'From the Chelan language: Tsill-ane, meaning \"deep water.\"' for Chelan. Provides cultural and historical context for vessel naming."
      ),
    VesselHistory: z
      .string()
      .nullable()
      .describe(
        "Vessel operational history and milestones, as a human-readable description. E.g., 'Chimacum is the third of the 144-car, Olympic Class ferries scheduled to begin service in June 2017.' for Chimacum, empty string ' ' when no history available, null when history is unavailable. Documents significant events in vessel's operational life."
      ),
    Beam: z
      .string()
      .describe(
        "Vessel beam width, as feet and inches. E.g., '78' 8\"' for Issaquah-class vessels, '83' 6\"' for Olympic-class Chimacum. Measured at widest point of vessel, used for terminal dock compatibility and vessel classification."
      ),
    CityBuilt: z
      .string()
      .describe(
        "City where vessel was constructed, as a human-readable description. E.g., 'Seattle' for most WSF vessels. Indicates vessel construction location and shipyard."
      ),
    SpeedInKnots: z
      .number()
      .int()
      .nullable()
      .describe(
        "Vessel maximum operational speed, as knots. E.g., '17' for Olympic-class Chimacum, '16' for Issaquah-class Cathlamet, '14' for Kwa-di Tabil class Chetzemoka, null when speed is unavailable. Used for voyage time calculations and route planning."
      ),
    Draft: z
      .string()
      .describe(
        "Vessel draft depth, as feet and inches. E.g., '18'' for Olympic-class Chimacum, '16' 7\"' for Issaquah-class vessels, '11'' for Kwa-di Tabil class. Measured from waterline to bottom of hull, used for harbor depth requirements and navigation planning."
      ),
    EngineCount: z
      .number()
      .int()
      .nullable()
      .describe(
        "Total number of propulsion engines aboard vessel, as an integer. E.g., '2' for most WSF vessels, null when engine count is unavailable. Indicates vessel propulsion redundancy and power configuration."
      ),
    Horsepower: z
      .number()
      .int()
      .nullable()
      .describe(
        "Total engine horsepower output, as horsepower. E.g., '6000' for Olympic-class and Kwa-di Tabil class vessels, '5100' for Issaquah-class vessels, null when horsepower is unavailable. Indicates vessel power and performance capability."
      ),
    Length: z
      .string()
      .describe(
        "Vessel overall length, as feet and inches. E.g., '362' 5\"' for Olympic-class Chimacum, '328' 2\"' for Issaquah-class vessels, '273' 10\"' for Kwa-di Tabil class. Measured from bow to stern, used for terminal dock length requirements and vessel classification."
      ),
    MaxPassengerCount: z
      .number()
      .int()
      .nullable()
      .describe(
        "Maximum passenger capacity, as an integer. E.g., '1500' for Olympic-class Chimacum, '1196' for Issaquah-class vessels, '748' for Kwa-di Tabil class, null when capacity is unavailable. Used for capacity planning and passenger load management."
      ),
    PassengerOnly: z
      .boolean()
      .describe(
        "Vehicle support indicator, as a boolean. E.g., false for vehicles and passengers like all WSF vessels, true for passenger-only vessels. Indicates whether vessel carries vehicles or only passengers."
      ),
    FastFerry: z
      .boolean()
      .describe(
        "Fast ferry classification indicator, as a boolean. E.g., false for standard ferries like Chimacum and Cathlamet, true for high-speed passenger ferries. Indicates vessel speed classification and service type."
      ),
    PropulsionInfo: z
      .string()
      .describe(
        "Engine propulsion type, as a human-readable description. E.g., 'DIESEL' for all WSF vessels. Indicates fuel type and propulsion technology used."
      ),
    TallDeckClearance: z
      .number()
      .int()
      .nullable()
      .describe(
        "Tall deck vertical clearance height, as inches. E.g., '192' for Olympic-class Chimacum, '186' for Issaquah-class vessels, '173' for Kwa-di Tabil class, null when clearance is unavailable. Used to determine if tall vehicles can access tall deck spaces."
      ),
    RegDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe(
        "Maximum regular deck vehicle capacity including tall deck spaces, as an integer. E.g., '144' for Olympic-class Chimacum, '124' for Issaquah-class vessels, '64' for Kwa-di Tabil class, null when capacity is unavailable. Total vehicle capacity including standard and tall deck spaces."
      ),
    TallDeckSpace: z
      .number()
      .int()
      .nullable()
      .describe(
        "Tall deck vehicle capacity, as an integer. E.g., '34' for Olympic-class Chimacum, '25' for Issaquah-class and Kwa-di Tabil class vessels, null when tall deck capacity is unavailable. Number of vehicle spaces on tall deck for vehicles exceeding standard clearance height."
      ),
    Tonnage: z
      .number()
      .int()
      .nullable()
      .describe(
        "Vessel gross tonnage, as tons. E.g., '3525' for Olympic-class Chimacum, '2477' for Issaquah-class vessels, '4623' for Kwa-di Tabil class, null when tonnage is unavailable. Used for vessel classification and regulatory compliance."
      ),
    Displacement: z
      .number()
      .int()
      .nullable()
      .describe(
        "Vessel displacement weight, as long tons. E.g., '5171' for Olympic-class Chimacum, '3310' for Issaquah-class vessels, '2090' for Kwa-di Tabil class, null when displacement is unavailable. Weight of water displaced by vessel, used for stability calculations."
      ),
    YearBuilt: z
      .number()
      .int()
      .nullable()
      .describe(
        "Vessel construction year, as a year. E.g., '2017' for Olympic-class Chimacum, '1981' for Issaquah-class Cathlamet, '2010' for Kwa-di Tabil class Chetzemoka, null when build year is unavailable. Indicates vessel age and construction era."
      ),
    YearRebuilt: z
      .number()
      .int()
      .nullable()
      .describe(
        "Vessel major rebuild year, as a year. E.g., '2005' for vessel Chelan, '1993' for vessel Cathlamet, null when vessel has not been rebuilt. Indicates significant renovation or modernization work completed."
      ),
    VesselDrawingImg: z
      .string()
      .nullable()
      .describe(
        "URL to detailed vessel drawing image, as a URL string. E.g., null when vessel-specific drawing unavailable (use class DrawingImg instead). Used for displaying vessel schematics and technical diagrams."
      ),
    SolasCertified: z
      .boolean()
      .describe(
        "International travel certification indicator, as a boolean. E.g., true for SOLAS-certified vessels like Chelan, false for domestic-only vessels like Chimacum. Indicates vessel meets Safety of Life at Sea international standards."
      ),
    MaxPassengerCountForInternational: z
      .number()
      .int()
      .nullable()
      .describe(
        "Maximum passenger capacity for international routes, as an integer. E.g., '1090' for SOLAS-certified vessel Chelan, null for domestic-only vessels. Used for international route capacity planning when vessel has different domestic and international capacity limits."
      ),
  })
  .describe(
    "Represents vessel technical specifications including dimensions, capacity, speed, propulsion, and build details. E.g., vessel Chimacum built 2017 in Seattle, 362 feet 5 inches long, 1500 passenger capacity, 17 knots speed, 6000 horsepower. Used for vessel comparison, capacity planning, terminal compatibility assessment, and technical reference. Extends vesselBaseSchema with technical specification fields."
  );

export type VesselStat = z.infer<typeof vesselStatSchema>;
