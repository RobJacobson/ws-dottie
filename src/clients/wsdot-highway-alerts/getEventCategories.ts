/**
 * @module WSDOT — Highway Alerts: Event Categories
 * @description Event category list for highway alerts.
 *
 * Provides:
 * - Event categories used for classifying highway alerts
 *
 * Data includes:
 * - Array of category strings
 *
 * @functions
 *   - getEventCategories: Returns event categories
 *
 * @input
 *   - getEventCategories: {}
 *
 * @output
 *   - getEventCategories: EventCategories (string[])
 *
 * @cli
 *   - getEventCategories: node dist/cli.mjs getEventCategories
 *
 * @exampleResponse
 * [
 *   "",
 *   "Abandoned Vehicle",
 *   "Administrative"
 * ]
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
 */
import { z } from "zod";

import {
  type EventCategories,
  eventCategoriesSchema,
} from "@/schemas/wsdot-highway-alerts/eventCategories.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getEventCategories */
const eventCategoriesInput = z.object({}).strict();

/** Endpoint metadata for getEventCategories */
export const getEventCategoriesMeta: EndpointDefinition<
  EventCategoriesInput,
  EventCategories
> = {
  id: "wsdot-highway-alerts:getEventCategories",
  endpoint:
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson",
  inputSchema: eventCategoriesInput,
  outputSchema: eventCategoriesSchema,
  sampleParams: {},
  cacheStrategy: "FREQUENT",
};

// Type exports
export type EventCategoriesInput = z.infer<typeof eventCategoriesInput>;
