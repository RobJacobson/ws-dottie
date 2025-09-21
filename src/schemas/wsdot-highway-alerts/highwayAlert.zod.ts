import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";

/**
 * Alert schema
 *
 * A Highway Alert.
 */
export const highwayAlertSchema = z
  .object({
    /** Unique Identifier for the alert. */
    AlertID: z.number().int().describe("Unique Identifier for the alert."),
    /** Used for countywide alerts, name of the affected county. */
    County: z
      .string()
      .nullable()
      .describe("Used for countywide alerts, name of the affected county."),
    /** End location for the alert on the roadway. */
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("End location for the alert on the roadway."),
    /** Estimated end time for alert. */
    EndTime: zWsdotDate().nullable().describe("Estimated end time for alert."),
    /** Categorization of alert, i.e. Collision, Maintenance, etc. */
    EventCategory: z
      .string()
      .nullable()
      .describe("Categorization of alert, i.e. Collision, Maintenance, etc."),
    /** Current status of alert, Open, Closed. */
    EventStatus: z
      .enum(["Open", "Closed"])
      .nullable()
      .describe("Current status of alert, Open, Closed."),
    /** Optional - Additional information about the alert, used for relaying useful extra information for an alert. */
    ExtendedDescription: z
      .string()
      .nullable()
      .describe(
        "Optional - Additional information about the alert, used for relaying useful extra information for an alert."
      ),
    /** Information about what the alert has been issued for. */
    HeadlineDescription: z
      .string()
      .nullable()
      .describe("Information about what the alert has been issued for."),
    /** When was alert was last changed. */
    LastUpdatedTime: zWsdotDate()
      .nullable()
      .describe("When was alert was last changed."),
    /** Expected impact on traffic, Highest, High, Medium, Low, Lowest. */
    Priority: z
      .enum(["Highest", "High", "Medium", "Low", "Lowest"])
      .nullable()
      .describe(
        "Expected impact on traffic, Highest, High, Medium, Low, Lowest."
      ),
    /** WSDOT Region which entered the alert, valid values: Eastern, North Central, Northwest, Olympic, South Central, Southwest. */
    Region: z
      .string()
      .nullable()
      .describe(
        "WSDOT Region which entered the alert, valid values: Eastern (EA), North Central (NC), Northwest (NW), Olympic (OL), South Central (SC), Southwest (SW)."
      ),
    /** Start location for the alert on the roadway. */
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe("Start location for the alert on the roadway."),
    /** When the impact on traffic began. */
    StartTime: zWsdotDate()
      .nullable()
      .describe("When the impact on traffic began."),
  })
  .describe("A Highway Alert.");

/** Alert type */
export type HighwayAlert = z.infer<typeof highwayAlertSchema>;

/**
 * Array of alerts.
 */
export const highwayAlertsSchema = z
  .array(highwayAlertSchema)
  .describe(
    "Coverage Area: Statewide. Provides access to all of the active incidents currently logged in our ROADS system."
  );

export type HighwayAlerts = z.infer<typeof highwayAlertsSchema>;
