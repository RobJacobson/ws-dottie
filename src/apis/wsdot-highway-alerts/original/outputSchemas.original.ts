import { z } from "zod";
import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";

/**
 * Schema for Alert - represents a Highway Alert
 *
 * A Highway Alert.
 */
export const alertSchema = z.object({
  /** Unique Identifier for the alert. */
  AlertID: z.int().describe("Unique Identifier for the alert."),
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
  EndTime: zDotnetDate().nullable().describe("Estimated end time for alert."),
  /** Categorization of alert, i.e. Collision, Maintenance, etc. */
  EventCategory: z
    .string()
    .nullable()
    .describe("Categorization of alert, i.e. Collision, Maintenance, etc."),
  /** Current status of alert, open, closed. */
  EventStatus: z
    .string()
    .nullable()
    .describe("Current status of alert, open, closed."),
  /**
   * Optional - Additional information about the alert, used for relaying useful extra information for an alert.
   */
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
  /** When the alert was last changed. */
  LastUpdatedTime: zDotnetDate()
    .nullable()
    .describe("When the alert was last changed."),
  /** Expected impact on traffic, highest, high, medium, low. */
  Priority: z
    .string()
    .nullable()
    .describe("Expected impact on traffic, highest, high, medium, low."),
  /**
   * WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest.
   */
  Region: z
    .string()
    .nullable()
    .describe(
      "WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest."
    ),
  /** Start location for the alert on the roadway. */
  StartRoadwayLocation: roadwayLocationSchema
    .nullable()
    .describe("Start location for the alert on the roadway."),
  /** When the impact on traffic began. */
  StartTime: zDotnetDate()
    .nullable()
    .describe("When the impact on traffic began."),
});

export type Alert = z.infer<typeof alertSchema>;

/**
 * Schema for Area - represents a map area
 *
 * Return list of areas and associated IDs
 */
export const areaSchema = z.object({
  /** The map area identifier. */
  MapArea: z.string().nullable().describe("The map area identifier."),
  /** Description of the map area. */
  MapAreaDescription: z
    .string()
    .nullable()
    .describe("Description of the map area."),
});

export type Area = z.infer<typeof areaSchema>;
