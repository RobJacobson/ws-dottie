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
  toolDescription: {
    purpose:
      "Get complete fare line item data for all terminal combinations on a trip date.",
    useWhen: [
      "building comprehensive fare reference for all routes",
      "analyzing fare structures across the entire terminal network",
      "creating fare calculation engines for multiple destinations",
    ],
    avoidWhen: [
      "you only need fares for one route (prefer fetchFareLineItemsBasic or fetchFareLineItemsByTripDateAndTerminals)",
    ],
    inputsHighlights:
      "TripDate in YYYY-MM-DD format (from fetchFaresValidDateRange)",
    returns: "object — comprehensive fare data for all terminal pairs",
    outputHighlights: [
      "TerminalComboVerbose: array of all terminal combinations with collection info",
      "LineItemLookup: cross-reference mappings between terminals and fare arrays",
      "LineItems: one-way fare component arrays for each terminal pair",
      "RoundTripLineItems: round-trip fare component arrays for each terminal pair",
      "large payload containing all fare structures for the date",
    ],
    chaining: [
      "fetchFaresValidDateRange → validate TripDate → call fetchFareLineItemsVerbose",
      "fetchFareLineItemsVerbose → lookup fares by terminal indices → calculate custom totals",
    ],
  },
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
