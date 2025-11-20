import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import { fareLineItemsGroup } from "./shared/fareLineItems.endpoints";
import {
  type FareLineItemsVerboseInput,
  fareLineItemsVerboseInputSchema,
} from "./shared/fareLineItems.input";
import {
  type LineItemVerbose,
  lineItemVerboseSchema,
} from "./shared/fareLineItems.output";

/**
 * Metadata for the fetchFareLineItemsVerbose endpoint
 */
export const fareLineItemsVerboseMeta = {
  functionName: "fetchFareLineItemsVerbose",
  endpoint: "/fareLineItemsVerbose/{TripDate}",
  inputSchema: fareLineItemsVerboseInputSchema,
  outputSchema: lineItemVerboseSchema,
  sampleParams: { TripDate: datesHelper.today() },
  endpointDescription:
    "Get all fare line items for all terminal combinations on a trip date.",
} satisfies EndpointMeta<FareLineItemsVerboseInput, LineItemVerbose>;

/**
 * Fetch function for retrieving all fare line items for all terminal combinations on a trip date
 */
export const fetchFareLineItemsVerbose: FetchFactory<
  FareLineItemsVerboseInput,
  LineItemVerbose
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsVerboseMeta,
});

/**
 * React Query hook for retrieving all fare line items for all terminal combinations on a trip date
 */
export const useFareLineItemsVerbose: HookFactory<
  FareLineItemsVerboseInput,
  LineItemVerbose
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: fareLineItemsVerboseMeta.functionName,
  fetchFn: fetchFareLineItemsVerbose,
  cacheStrategy: fareLineItemsGroup.cacheStrategy,
});
