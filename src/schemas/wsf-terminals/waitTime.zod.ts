import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack";

/**
 * Wait time schema for WSF Terminals API
 *
 * Represents wait time information for a specific route at a terminal.
 */
export const waitTimeSchema = z.object({
  /** Unique identifier for the route associated with this wait time. */
  RouteID: z
    .number()
    .int()
    .nullable()
    .describe(
      "Unique identifier for the route associated with this wait time."
    ),

  /** The name of the route associated with this wait time. */
  RouteName: z
    .string()
    .nullable()
    .describe("The name of the route associated with this wait time."),

  /** Notes detailing wait time conditions along with tips for vehicles and passengers. */
  WaitTimeNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions along with tips for vehicles and passengers."
    ),

  /** The date this wait time information was last updated. */
  WaitTimeLastUpdated: zWsdotDate()
    .nullable()
    .describe("The date this wait time information was last updated."),

  /** Notes detailing wait time conditions (tailored for text to speech systems). */
  WaitTimeIVRNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions (tailored for text to speech systems)."
    ),
});

export type WaitTime = z.infer<typeof waitTimeSchema>;
