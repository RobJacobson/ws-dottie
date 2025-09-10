import { z } from "zod";
import { routeAlertSchema } from "./routeAlert.zod";

/**
 * Schema for route details response from WSF Schedule API.
 * This operation retrieves highly detailed information pertaining to routes.
 * If only a trip date is included in the URL string, all routes available for that date of travel are returned.
 * If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly.
 * Along the same lines, including only a trip date and route will filter the resultset to a single route.
 * Valid departing and arriving terminals may be found using /terminalsandmates while valid routes may be found using /routes.
 * Similarly, a valid trip date may be determined using /validdaterange. Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const routeDetailsSchema = z.object({
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
  /** Unique identifier used to group routes for VesselWatch. */
  VesselWatchID: z
    .number()
    .int()
    .describe("Unique identifier used to group routes for VesselWatch."),
  /** Indicates whether or not the route is reservable. */
  ReservationFlag: z
    .boolean()
    .describe("Indicates whether or not the route is reservable."),
  /** Indicates whether or not the route operates outside the US. */
  InternationalFlag: z
    .boolean()
    .describe("Indicates whether or not the route operates outside the US."),
  /** If this flag is true, then the route does not service vehicles. */
  PassengerOnlyFlag: z
    .boolean()
    .describe(
      "If this flag is true, then the route does not service vehicles."
    ),
  /** An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes. */
  CrossingTime: z
    .string()
    .nullable()
    .describe(
      "An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes."
    ),
  /** ADA information associated with the route. */
  AdaNotes: z
    .string()
    .nullable()
    .describe("ADA information associated with the route."),
  /** Miscellaneous information associated with the route. */
  GeneralRouteNotes: z
    .string()
    .nullable()
    .describe("Miscellaneous information associated with the route."),
  /** Route notes specific to the season that the trip date is associated with. */
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe(
      "Route notes specific to the season that the trip date is associated with."
    ),
  /** Alerts associated with the route. */
  Alerts: z
    .array(routeAlertSchema)
    .nullable()
    .describe("Alerts associated with the route."),
});

export type RouteDetailsItem = z.infer<typeof routeDetailsSchema>;

/**
 * Array of route details.
 */
export const routeDetailsArraySchema = z
  .array(routeDetailsSchema)
  .describe("The detailed route information for the given trip date.");

export type RouteDetails = z.infer<typeof routeDetailsArraySchema>;
