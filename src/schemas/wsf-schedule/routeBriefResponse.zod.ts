import { z } from "zod";
import { routeBriefAlertSchema } from "./routeBriefAlert.zod";

/**
 * Schema for route response from WSF Schedule API.
 * This operation retrieves the most basic / brief information pertaining to routes.
 * If only a trip date is included in the URL string, all routes available for that date of travel are returned.
 * If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly.
 * Valid departing and arriving terminals may be found using /terminalsandmates. Similarly, a valid trip date may be determined using /validdaterange.
 * Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const routeBriefResponseSchema = z.object({
  /** Unique identifier for a route. */
  RouteID: z.number().int().describe("Unique identifier for a route."),
  /** The route's abbreviation. */
  RouteAbbrev: z.string().nullable().describe("The route's abbreviation."),
  /** The full name of the route. */
  Description: z.string().nullable().describe("The full name of the route."),
  /** Unique identifier that identifies the region associated with the route. */
  RegionID: z
    .number()
    .int()
    .describe(
      "Unique identifier that identifies the region associated with the route."
    ),
  /** Service disruption alerts that are currently affecting the route. */
  ServiceDisruptions: z
    .array(routeBriefAlertSchema)
    .nullable()
    .describe(
      "Service disruption alerts that are currently affecting the route."
    ),
});

export type RouteBriefResponse = z.infer<typeof routeBriefResponseSchema>;

/**
 * Array of route brief responses.
 */
export const routeBriefResponsesSchema = z
  .array(routeBriefResponseSchema)
  .describe("The routes available for the given trip date.");

export type RouteBriefResponses = z.infer<typeof routeBriefResponsesSchema>;
