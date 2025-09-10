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
import { eventCategoriesSchema } from "@/schemas/wsdot-highway-alerts";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getEventCategories */
export const getEventCategoriesParamsSchema = z.object({});

/** GetEventCategories params type */
export type GetEventCategoriesParams = z.infer<
  typeof getEventCategoriesParamsSchema
>;

/** Endpoint definition for getEventCategories */
export const getEventCategoriesDef = defineEndpoint({
  moduleGroup: "wsdot-highway-alerts",
  functionName: "getEventCategories",
  endpoint:
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson",
  inputSchema: getEventCategoriesParamsSchema,
  outputSchema: eventCategoriesSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
});
