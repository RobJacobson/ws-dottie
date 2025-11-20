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
  type FareLineItemsBasicInput,
  fareLineItemsBasicInputSchema,
} from "./shared/fareLineItems.input";
import { type LineItem, lineItemSchema } from "./shared/fareLineItems.output";

/**
 * Metadata for the fetchFareLineItemsBasic endpoint
 */
export const fareLineItemsBasicMeta = {
  functionName: "fetchFareLineItemsBasic",
  endpoint:
    "/fareLineItemsBasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
  inputSchema: fareLineItemsBasicInputSchema,
  outputSchema: lineItemSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
    RoundTrip: false,
  },
  endpointDescription:
    "List popular fare line items for a terminal combination.",
} satisfies EndpointMeta<FareLineItemsBasicInput, LineItem[]>;

/**
 * Fetch function for retrieving popular fare line items for a terminal combination
 */
export const fetchFareLineItemsBasic: FetchFactory<
  FareLineItemsBasicInput,
  LineItem[]
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsBasicMeta,
});

/**
 * React Query hook for retrieving popular fare line items for a terminal combination
 */
export const useFareLineItemsBasic: HookFactory<
  FareLineItemsBasicInput,
  LineItem[]
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: fareLineItemsBasicMeta.functionName,
  fetchFn: fetchFareLineItemsBasic,
  cacheStrategy: fareLineItemsGroup.cacheStrategy,
});
