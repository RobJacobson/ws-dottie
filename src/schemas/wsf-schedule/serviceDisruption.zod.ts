import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Schema for service disruption response from WSF Schedule API.
 * Service disruption alerts that are currently affecting the route.
 */
export const serviceDisruptionSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().int().describe("Unique identifier for the alert."),
  /** A flag that, when true, indicates the alert is also being used as a bulletin. */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  /** The date the alert was published. */
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  /** The service disruption text associated with the alert. */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe("The service disruption text associated with the alert."),
});

export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;

/**
 * Array of service disruptions.
 */
export const serviceDisruptionsArraySchema = z
  .array(serviceDisruptionSchema)
  .describe(
    "Service disruption alerts that are currently affecting the route."
  );

export type ServiceDisruptionsArray = z.infer<
  typeof serviceDisruptionsArraySchema
>;
