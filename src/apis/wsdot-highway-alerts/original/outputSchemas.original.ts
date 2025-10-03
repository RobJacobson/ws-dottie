import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for RoadwayLocation - represents location information for a roadway in WSDOT Highway Alerts
 *
 * Description of the location. This could be a cross street or a nearby landmark.
 */
export const roadwayLocationSchema = z.object({
  /**
   * Description of the location. This could be a cross street or a nearby landmark.
   */
  Description: z
    .string()
    .nullable()
    .describe(
      "Description of the location. This could be a cross street or a nearby landmark."
    ),
  /**
   * The side of the road the location is on (Northbound, Southbound). This does not necessarily correspond to an actual compass direction.
   */
  Direction: z
    .enum(["B", "E", "N", "S", "W"])
    .nullable()
    .describe(
      "The side of the road the location is on (Northbound, Southbound). This does not necessarily correspond to an actual compass direction."
    ),
  /** Latitude of the location. */
  Latitude: z.number().describe("Latitude of the location."),
  /** Longitude of the location. */
  Longitude: z.number().describe("Longitude of the location."),
  /** The milepost of the location. */
  MilePost: z.number().describe("The milepost of the location."),
  /** The name of the road. */
  RoadName: z.string().nullable().describe("The name of the road."),
});

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;

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
  EndTime: zWsdotDate().nullable().describe("Estimated end time for alert."),
  /** Categorization of alert, i.e. Collision, Maintenance, etc. */
  EventCategory: z
    .string()
    .nullable()
    .describe("Categorization of alert, i.e. Collision, Maintenance, etc."),
  /** Current status of alert, open, closed. */
  EventStatus: z
    .enum(["Open", "Closed"])
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
  LastUpdatedTime: zWsdotDate()
    .nullable()
    .describe("When the alert was last changed."),
  /** Expected impact on traffic, highest, high, medium, low. */
  Priority: z
    .enum(["High", "Highest", "Low", "Lowest", "Medium"])
    .nullable()
    .describe("Expected impact on traffic, highest, high, medium, low."),
  /**
   * WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest.
   */
  Region: z
    .enum([
      "Eastern",
      "North Central",
      "Northwest",
      "Olympic",
      "South Central",
      "Southwest",
    ])
    .nullable()
    .describe(
      "WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest."
    ),
  /** Start location for the alert on the roadway. */
  StartRoadwayLocation: roadwayLocationSchema
    .nullable()
    .describe("Start location for the alert on the roadway."),
  /** When the impact on traffic began. */
  StartTime: zWsdotDate()
    .nullable()
    .describe("When the impact on traffic began."),
});

export type Alert = z.infer<typeof alertSchema>;

/**
 * Schema for AlertsList - represents a list of Highway Alerts
 *
 * The GetAlerts endpoint returns an array of currently active incidents
 */
export const alertsListSchema = z.array(alertSchema).describe("The GetAlerts endpoint returns an array of currently active incidents");

export type AlertsList = z.infer<typeof alertsListSchema>;

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

/**
 * Schema for AreasList - represents a list of map areas
 *
 * The GetMapAreas endpoint returns a list of areas and associated IDs
 */
export const areasListSchema = z.array(areaSchema).describe("The GetMapAreas endpoint returns a list of areas and associated IDs");

export type AreasList = z.infer<typeof areasListSchema>;

/**
 * Schema for EventCategoriesList - represents a list of event category strings
 *
 * The GetEventCategories endpoint returns an array of strings containing Event Categories currently in use
 */
export const eventCategoriesListSchema = z.array(z.string()).describe("The GetEventCategories endpoint returns an array of strings containing Event Categories currently in use");

export type EventCategoriesList = z.infer<typeof eventCategoriesListSchema>;
