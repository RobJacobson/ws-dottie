import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for RoadwayLocation - represents location information for a roadway in WSDOT Highway Alerts
 */
export const RoadwayLocationSchema = z.object({
  Description: z
    .string()
    .nullable()
    .describe(
      "Description of the location. This could be a cross street or a nearby landmark."
    ),
  Direction: z
    .string()
    .nullable()
    .describe(
      "The side of the road the location is on (Northbound, Southbound). This does not necessarily correspond to an actual compass direction."
    ),
  Latitude: z.number().describe("Latitude of the location."),
  Longitude: z.number().describe("Longitude of the location."),
  MilePost: z.number().describe("The milepost of the location."),
  RoadName: z.string().nullable().describe("The name of the road."),
});

export type RoadwayLocation = z.infer<typeof RoadwayLocationSchema>;

/**
 * Schema for Alert - represents a Highway Alert
 */
export const AlertSchema = z.object({
  AlertID: z.number().describe("Unique Identifier for the alert."),
  County: z
    .string()
    .nullable()
    .describe("Used for countywide alerts, name of the affected county."),
  EndRoadwayLocation: RoadwayLocationSchema.nullable().describe(
    "End location for the alert on the roadway."
  ),
  EndTime: zWsdotDate().nullable().describe("Estimated end time for alert."),
  EventCategory: z
    .string()
    .nullable()
    .describe("Categorization of alert, i.e. Collision, Maintenance, etc."),
  EventStatus: z
    .string()
    .nullable()
    .describe("Current status of alert, open, closed."),
  ExtendedDescription: z
    .string()
    .nullable()
    .describe(
      "Optional - Additional information about the alert, used for relaying useful extra information for an alert."
    ),
  HeadlineDescription: z
    .string()
    .nullable()
    .describe("Information about what the alert has been issued for."),
  LastUpdatedTime: zWsdotDate()
    .nullable()
    .describe("When was alert was last changed."),
  Priority: z
    .string()
    .nullable()
    .describe("Expected impact on traffic, highest, high, medium, low."),
  Region: z
    .string()
    .nullable()
    .describe(
      "WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest."
    ),
  StartRoadwayLocation: RoadwayLocationSchema.nullable().describe(
    "Start location for the alert on the roadway."
  ),
  StartTime: zWsdotDate()
    .nullable()
    .describe("When the impact on traffic began."),
});

export type Alert = z.infer<typeof AlertSchema>;

/**
 * Schema for Area - represents a map area
 */
export const AreaSchema = z.object({
  MapArea: z.string().nullable().describe("The map area identifier."),
  MapAreaDescription: z
    .string()
    .nullable()
    .describe("Description of the map area."),
});

export type Area = z.infer<typeof AreaSchema>;

/**
 * Schema for array of Alert
 */
export const ArrayOfAlertSchema = z.array(AlertSchema);

export type ArrayOfAlert = z.infer<typeof ArrayOfAlertSchema>;

/**
 * Schema for array of Area
 */
export const ArrayOfAreaSchema = z.array(AreaSchema);

export type ArrayOfArea = z.infer<typeof ArrayOfAreaSchema>;

/**
 * Schema for array of strings (used for event categories)
 */
export const ArrayOfStringSchema = z.array(z.string());

export type ArrayOfString = z.infer<typeof ArrayOfStringSchema>;
