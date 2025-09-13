import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Schema for route alert response from WSF Schedule API.
 * This is a simplified alert schema used in route details responses.
 * It contains fewer fields than the full schedule alert schema.
 */
export const routeAlertSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().int().describe("Unique identifier for the alert."),
  /** A flag that, when true, indicates the alert includes text tailored as a bulletin. */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a bulletin."
    ),
  /** A flag that, when true, indicates the alert includes text tailored as a communications announcement. */
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a communications announcement."
    ),
  /** The date the alert was published. */
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  /** A brief description of the alert. */
  AlertDescription: z
    .string()
    .nullable()
    .describe("A brief description of the alert."),
  /** If present, indicates service disruption text associated with the alert. */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().nullable().describe("The title of the alert."),
  /** The full text content of the alert. */
  AlertFullText: z
    .string()
    .nullable()
    .describe("The full text content of the alert."),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type RouteAlert = z.infer<typeof routeAlertSchema>;
