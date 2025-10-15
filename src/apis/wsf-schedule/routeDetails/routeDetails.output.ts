/**
 * @fileoverview WSF Schedule API Output Schemas for Route Details
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API route details operations.
 */

import { z } from "zod";

// Route Details uses the same output schemas as routes
// Import the route detail schema from the routes output file
export {
  RouteDetail,
  RouteDetailsList,
  routeDetailSchema,
  routeDetailsListSchema,
} from "../routes/routes.output";
