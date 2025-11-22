import { roadwayLocationSchema } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for Alert - represents a Highway Alert
 *
 * A Highway Alert.
 */
export const alertSchema = z
  .object({
    AlertID: z.number().int().describe("Numeric ID of the highway alert."),
    County: z
      .string()
      .nullable()
      .describe(
        "County name for countywide alerts, or null when alert is route-specific."
      ),
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location where the alert ends, or null when alert is point-specific or end location is unavailable."
      ),
    EndTime: z.date()
      .nullable()
      .describe(
        "UTC datetime when the alert impact is estimated to end, or null when end time is not estimated or alert is ongoing."
      ),
    EventCategory: z
      .string()
      .nullable()
      .describe(
        "Category classification for the alert event type, or null when category is unavailable."
      ),
    EventStatus: z
      .string()
      .nullable()
      .describe(
        "Code indicating alert status: 'Open' = active, 'Closed' = resolved, or null when status is unavailable."
      ),
    ExtendedDescription: z
      .string()
      .nullable()
      .describe(
        "Additional detailed information about the alert, or null when extended description is unavailable."
      ),
    HeadlineDescription: z
      .string()
      .nullable()
      .describe(
        "Primary description of the alert issue, or null when headline is unavailable."
      ),
    LastUpdatedTime: z.date()
      .nullable()
      .describe("UTC datetime when the alert was last modified or updated."),
    Priority: z
      .string()
      .nullable()
      .describe(
        "Code indicating traffic impact priority: 'Highest' = severe, 'High' = significant, 'Medium' = moderate, 'Low' = minimal, or null when priority is unavailable."
      ),
    Region: z
      .string()
      .nullable()
      .describe(
        "Code indicating WSDOT region: 'EA' = Eastern, 'NC' = North Central, 'NW' = Northwest, 'OL' = Olympic, 'SC' = South Central, 'SW' = Southwest, or null when region is unavailable."
      ),
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location where the alert begins, or null when alert is point-specific or start location is unavailable."
      ),
    StartTime: z.date()
      .nullable()
      .describe("UTC datetime when the alert impact on traffic began."),
  })
  .describe(
    "Highway alert with identification, event category, priority, location data, timestamps, and descriptions for traffic incidents and road conditions."
  );

export type Alert = z.infer<typeof alertSchema>;
