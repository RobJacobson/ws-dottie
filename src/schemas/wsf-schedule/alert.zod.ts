import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Schema for alert response from WSF Schedule API.
 * Alerts associated with the route.
 */
export const alertSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().int().describe("Unique identifier for the alert."),
  /** A flag that, when true, indicates the alert is also being used as a bulletin. */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  /** A flag that, when true, indicates the alert is also being used as a communications announcement. */
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a communications announcement."
    ),
  /** The date the alert was published. */
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  /** The alert text, tailored as a brief route announcement. */
  AlertDescription: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a brief route announcement."),
  /** If present, indicates service disruption text associated with the alert. */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().describe("The title of the alert."),
  /** The full text of the alert. */
  AlertFullText: z.string().describe("The full text of the alert."),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type Alert = z.infer<typeof alertSchema>;

/**
 * Array of alerts.
 */
export const alertsArraySchema = z
  .array(alertSchema)
  .describe("Alerts associated with the route.");

export type AlertsArray = z.infer<typeof alertsArraySchema>;
