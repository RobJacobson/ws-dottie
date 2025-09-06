import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";

/**
 * Alert schema
 *
 * A Highway Alert.
 */
export const alertSchema = z
  .object({
    /** Unique Identifier for the alert. */
    AlertID: z
      .number()
      .int()
      .positive()
      .describe("Unique Identifier for the alert."),
    /** Start location for the alert on the roadway. */
    StartRoadwayLocation: roadwayLocationSchema.describe(
      "Start location for the alert on the roadway."
    ),
    /** End location for the alert on the roadway. */
    EndRoadwayLocation: roadwayLocationSchema.describe(
      "End location for the alert on the roadway."
    ),
    /** WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest. */
    Region: z
      .enum(["EA", "NC", "NW", "OL", "SC", "SW"])
      .describe(
        "WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest."
      ),
    /** Used for countywide alerts, name of the affected county. */
    County: z
      .string()
      .describe("Used for countywide alerts, name of the affected county."),
    /** When the impact on traffic began. */
    StartTime: zWsdotDate()
      .nullable()
      .describe("When the impact on traffic began."),
    /** Estimated end time for alert. */
    EndTime: zWsdotDate().nullable().describe("Estimated end time for alert."),
    /** Categorization of alert, i.e. Collision, Maintenance, etc. */
    EventCategory: z
      .string()
      .describe("Categorization of alert, i.e. Collision, Maintenance, etc."),
    /** Information about what the alert has been issued for. */
    HeadlineDescription: z
      .string()
      .describe("Information about what the alert has been issued for."),
    /** Optional - Additional information about the alert, used for relaying useful extra information for an alert. */
    ExtendedDescription: z
      .string()
      .describe(
        "Optional - Additional information about the alert, used for relaying useful extra information for an alert."
      ),
    /** Current status of alert, open, closed. */
    EventStatus: z
      .enum(["open", "closed"])
      .describe("Current status of alert, open, closed."),
    /** When was alert was last changed. */
    LastUpdatedTime: zWsdotDate()
      .nullable()
      .describe("When was alert was last changed."),
    /** Expected impact on traffic, highest, high, medium, low. */
    Priority: z
      .enum(["highest", "high", "medium", "low"])
      .describe("Expected impact on traffic, highest, high, medium, low."),
  })
  .describe("A Highway Alert.");

/**
 * Alerts schema
 *
 * Coverage Area: Statewide. Provides access to all of the active incidents currently logged in our ROADS system.
 */
export const alertsSchema = z
  .array(alertSchema)
  .describe(
    "Coverage Area: Statewide. Provides access to all of the active incidents currently logged in our ROADS system."
  );

/** Alert type */
export type Alert = z.infer<typeof alertSchema>;

/** Alerts type */
export type Alerts = z.infer<typeof alertsSchema>;
