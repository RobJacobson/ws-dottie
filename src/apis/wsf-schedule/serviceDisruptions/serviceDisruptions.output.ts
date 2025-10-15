/**
 * @fileoverview WSF Schedule API Output Schemas for Service Disruptions
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API service disruption operations.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

// Service Disruptions uses the same output schema as routes
// Import the service disruption schema from the routes output file
export {
  ServiceDisruption,
  ServiceDisruptionList,
  serviceDisruptionSchema,
  serviceDisruptionsListSchema,
} from "../routes/routes.output";
