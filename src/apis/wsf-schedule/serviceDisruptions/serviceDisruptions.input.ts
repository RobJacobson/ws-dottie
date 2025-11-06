/**
 * @fileoverview WSF Schedule API Input Schemas for Service Disruptions
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to service disruption operations.
 */

// Service Disruptions uses the same input schema as routes
// This is because it's typically filtered by trip date like routes
export {
  RoutesHavingServiceDisruptionsByTripDateInput,
  routesHavingServiceDisruptionsByTripDateInputSchema,
} from "../routes/routes.input";
