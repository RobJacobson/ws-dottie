/**
 * @module WSDOT — Highway Alerts: Get Alerts as DataSet
 * @description Retrieves a dataset containing currently active incidents.
 *
 * Provides:
 * - All active alerts as a DataSet format
 *
 * Data includes:
 * - Highway alert records in DataSet format (see HighwayAlert schema)
 *
 * @functions
 *   - getAlertsAsDataSet: Returns all active alerts as DataSet
 *
 * @input
 *   - getAlertsAsDataSet: {}
 *
 * @output
 *   - getAlertsAsDataSet: DataSet containing HighwayAlert records
 *
 * @cli
 *   - getAlertsAsDataSet: node dist/cli.mjs getAlertsAsDataSet
 *
 * @exampleResponse
 * DataSet format containing highway alert records
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
 */
import { z } from "zod";
import { type Alerts, alertsSchema } from "@/schemas/wsdot-highway-alerts";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetchCustom } from "@/shared/fetching";

/** Params schema for getAlertsAsDataSet (none) */
export const getAlertsAsDataSetParamsSchema = z.object({});

/** GetAlertsAsDataSet params type */
export type GetAlertsAsDataSetParams = z.infer<
  typeof getAlertsAsDataSetParamsSchema
>;

/** Fetches all active highway alerts as DataSet */
export const getAlertsAsDataSet = async (
  params: GetAlertsAsDataSetParams = {}
): Promise<Alerts> => {
  return zodFetchCustom(
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsDataSetAsJson",
    {
      input: getAlertsAsDataSetParamsSchema,
      output: alertsSchema,
    },
    params
  );
};

/** Returns options for alerts as DataSet; polls every 60s */
export const getAlertsAsDataSetOptions = createQueryOptions({
  apiFunction: getAlertsAsDataSet,
  queryKey: ["wsdot", "highway-alerts", "getAlertsAsDataSet"],
  cacheStrategy: "MINUTE_UPDATES",
});
