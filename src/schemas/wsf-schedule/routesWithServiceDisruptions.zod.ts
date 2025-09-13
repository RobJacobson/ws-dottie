import { z } from "zod";
import { serviceDisruptionSchema } from "./serviceDisruption.zod";

/**
 * Schema for routes with service disruptions response from WSF Schedule API.
 * This operation retrieves the most basic / brief information for routes currently associated with service disruptions.
 * A valid trip date may be determined using /validdaterange. Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const routesWithServiceDisruptionsSchema = z.object({
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
    .array(serviceDisruptionSchema)
    .nullable()
    .describe(
      "Service disruption alerts that are currently affecting the route."
    ),
});

export type RoutesWithServiceDisruptions = z.infer<
  typeof routesWithServiceDisruptionsSchema
>;
