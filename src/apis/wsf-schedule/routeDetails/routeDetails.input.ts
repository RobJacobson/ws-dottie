/**
 * @fileoverview WSF Schedule API Input Schemas for Route Details
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to route details operations.
 */

// Route Details uses the same input schemas as routes
// Import the route details schemas from the routes input file
export {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
  routeDetailsByTripDateAndRouteIdInputSchema,
  routeDetailsByTripDateAndTerminalsInputSchema,
  routeDetailsByTripDateInputSchema,
} from "../routes/routes.input";
