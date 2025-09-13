import { z } from "zod";
import { travelTimeRouteSchema } from "./travelTimeRoute.zod";

/**
 * TravelTimes schema
 *
 * Coverage Area: Seattle, Tacoma, Snoqualmie Pass. Provides travel times for many popular travel routes around Washington State.
 */
export const travelTimesSchema = z
  .array(travelTimeRouteSchema)
  .describe(
    "Coverage Area: Seattle, Tacoma, Snoqualmie Pass. Provides travel times for many popular travel routes around Washington State."
  );

/** TravelTimes type */
export type TravelTimes = z.infer<typeof travelTimesSchema>;
