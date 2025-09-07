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
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

/** Fetches event categories */
export const getEventCategories = async (
  params: GetEventCategoriesParams = {}
): Promise<string[]> => {
  return zodFetch({
    endpoint:
      "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson",
    inputSchema: getEventCategoriesParamsSchema,
    outputSchema: eventCategoriesSchema,
    params,
  });
};

/** Params schema for getEventCategories (none) */
export const getEventCategoriesParamsSchema = z.object({});

/** GetEventCategories params type */
export type GetEventCategoriesParams = z.infer<
  typeof getEventCategoriesParamsSchema
>;

/** Returns options for event categories; polls every 60s */
export const eventCategoriesOptions = createQueryOptions({
  apiFunction: getEventCategories,
  queryKey: ["wsdot", "highway-alerts", "getEventCategories"],
  cacheStrategy: "MINUTE_UPDATES",
});
