import type { UseQueryResult } from "@tanstack/react-query";
import { wsfFaresApi } from "../api";
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
export const fetchFareLineItemsVerbose: (
  params?: FetchFunctionParams<FareLineItemsVerboseInput>
) => Promise<LineItemVerbose> = createFetchFunction(
  wsfFaresApi,
  fareLineItemsGroup,
  fareLineItemsVerboseMeta
);

/**
 * React Query hook for retrieving all fare line items for all terminal combinations on a trip date
 */
export const useFareLineItemsVerbose: (
  params?: FetchFunctionParams<FareLineItemsVerboseInput>,
  options?: QueryHookOptions<LineItemVerbose>
) => UseQueryResult<LineItemVerbose, Error> = createHook(
  wsfFaresApi,
  fareLineItemsGroup,
  fareLineItemsVerboseMeta
);
