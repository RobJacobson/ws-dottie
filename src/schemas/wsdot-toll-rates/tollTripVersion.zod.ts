import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * TollTripVersion schema
 *
 * Current version number for toll trip data.
 */
export const tollTripVersionSchema = z.object({
  /** Time stamp for the version data (JS Date) */
  TimeStamp: zWsdotDate().describe("Time stamp for the version data (JS Date)"),
  /** Version number for the toll trip dataset */
  Version: z.number().describe("Version number for the toll trip dataset"),
});

/** TollTripVersion type */
export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;
