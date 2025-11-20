import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
import { highwayAlertsGroup } from "./shared/highwayAlerts.endpoints";
import {
  type SearchAlertsInput,
  searchAlertsInputSchema,
} from "./shared/highwayAlerts.input";
import { type Alert, alertSchema } from "./shared/highwayAlerts.output";

/**
 * Metadata for the searchAlerts endpoint
 */
export const searchAlertsMeta = {
  functionName: "searchAlerts",
  endpoint:
    "/searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
  inputSchema: searchAlertsInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: {
    StateRoute: "405",
    StartingMilepost: 10,
    EndingMilepost: 20,
    SearchTimeStart: datesHelper.yesterday(),
    SearchTimeEnd: datesHelper.today(),
  },
  endpointDescription:
    "Search highway alerts by route, region, time range, and milepost.",
} satisfies EndpointMeta<SearchAlertsInput, Alert[]>;

/**
 * Fetch function for searching highway alerts by route, region, time range, and milepost
 */
export const searchAlerts: FetchFactory<SearchAlertsInput, Alert[]> =
  createFetchFunction({
    api: wsdotHighwayAlertsApiMeta,
    endpoint: searchAlertsMeta,
  });

/**
 * React Query hook for searching highway alerts by route, region, time range, and milepost
 */
export const useSearchAlerts: HookFactory<SearchAlertsInput, Alert[]> =
  createHook({
    apiName: wsdotHighwayAlertsApiMeta.name,
    endpointName: searchAlertsMeta.functionName,
    fetchFn: searchAlerts,
    cacheStrategy: highwayAlertsGroup.cacheStrategy,
  });
