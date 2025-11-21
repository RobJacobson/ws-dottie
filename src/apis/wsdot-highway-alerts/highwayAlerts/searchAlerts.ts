import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
 * Factory result for search alerts
 */
const searchAlertsFactory = createFetchAndHook<SearchAlertsInput, Alert[]>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: searchAlertsMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for searching highway alerts by route, region, time range, and milepost
 */
export const { fetch: searchAlerts, hook: useSearchAlerts } =
  searchAlertsFactory;
