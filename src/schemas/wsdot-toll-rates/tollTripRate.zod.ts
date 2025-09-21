import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack";

/**
 * TollTripRate schema
 *
 * Individual toll trip rate with message and version information.
 */
export const tollTripRateSchema = z.object({
  /** Status/message for the trip rate */
  Message: z.string().nullable().describe("Status/message for the trip rate"),
  /** Message update time */
  MessageUpdateTime: zWsdotDate().describe("Message update time"),
  /** Toll amount in cents */
  Toll: z.number().describe("Toll amount in cents"),
  /** Trip identifier */
  TripName: z.string().nullable().describe("Trip identifier"),
});

/** TollTripRate type */
export type TollTripRate = z.infer<typeof tollTripRateSchema>;
