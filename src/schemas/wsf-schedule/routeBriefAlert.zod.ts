import { z } from "zod";

/**
 * ServiceDisruption schema
 *
 * Schema for service disruption response from WSF Schedule API.
 * Service disruptions are returned in various operations, such as GetRouteDetails and GetRoutesHavingServiceDisruptions.
 */
export const routeBriefAlertSchema = z.object({
  /** Unique identifier for a bulletin. */
  BulletinID: z.number().int().describe("Unique identifier for a bulletin."),
  /** Indicates whether or not this bulletin should be published. */
  BulletinFlag: z
    .boolean()
    .describe("Indicates whether or not this bulletin should be published."),
  /** Date the bulletin was published. */
  PublishDate: z.date().nullable().describe("Date the bulletin was published."),
  /** Brief description of the service disruption. */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe("Brief description of the service disruption."),
});

export type RouteBriefAlert = z.infer<typeof routeBriefAlertSchema>;
