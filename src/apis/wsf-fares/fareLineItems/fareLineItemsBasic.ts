import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
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
 * Factory result for fare line items basic
 */
const fareLineItemsBasicFactory = createFetchAndHook<
  FareLineItemsBasicInput,
  LineItem[]
>({
  api: wsfFaresApiMeta,
  endpoint: fareLineItemsBasicMeta,
  getEndpointGroup: () =>
    require("./shared/fareLineItems.endpoints").fareLineItemsGroup,
});

/**
 * Fetch function and React Query hook for retrieving popular fare line items for a terminal combination
 */
export const { fetch: fetchFareLineItemsBasic, hook: useFareLineItemsBasic } =
  fareLineItemsBasicFactory;
