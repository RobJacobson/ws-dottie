import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
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
export const searchAlerts: (
  params?: FetchFunctionParams<SearchAlertsInput>
) => Promise<Alert[]> = createFetchFunction(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  searchAlertsMeta
);

/**
 * React Query hook for searching highway alerts by route, region, time range, and milepost
 */
export const useSearchAlerts: (
  params?: FetchFunctionParams<SearchAlertsInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = createHook(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  searchAlertsMeta
);
