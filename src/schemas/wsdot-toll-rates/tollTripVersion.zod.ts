import { z } from "zod";

/**
 * TollTripVersion schema
 *
 * Current version number for toll trip data.
 */
export const tollTripVersionSchema = z.object({
  /** Version number for the toll trip dataset */
  Version: z.number().describe("Version number for the toll trip dataset"),
});

/** TollTripVersion type */
export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;
