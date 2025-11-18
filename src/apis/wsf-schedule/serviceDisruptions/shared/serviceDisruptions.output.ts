/**
 * @fileoverview WSF Schedule API Output Schemas for Service Disruptions
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API service disruption operations.
 */

// Service Disruptions uses the same output schema as routes
// Import the service disruption schema from the routes output file
export {
  ServiceDisruption,
  ServiceDisruptionList,
  serviceDisruptionSchema,
  serviceDisruptionsListSchema,
} from "../../routes/shared/routes.output";
