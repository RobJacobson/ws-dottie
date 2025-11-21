import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
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
 * Factory result for fare line items verbose
 */
const fareLineItemsVerboseFactory = createFetchAndHook<
  FareLineItemsVerboseInput,
  LineItemVerbose
>({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsVerboseMeta,
  getEndpointGroup: () =>
    require("./shared/fareLineItems.endpoints").fareLineItemsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all fare line items for all terminal combinations on a trip date
 */
export const {
  fetch: fetchFareLineItemsVerbose,
  hook: useFareLineItemsVerbose,
} = fareLineItemsVerboseFactory;
