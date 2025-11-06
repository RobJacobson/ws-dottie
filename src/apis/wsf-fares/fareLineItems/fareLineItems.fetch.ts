import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { fareLineItemsGroup } from "./fareLineItems.endpoints";
import type {
  FareLineItemsBasicInput,
  FareLineItemsByTripDateAndTerminalsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems.input";
import type { LineItem, LineItemVerbose } from "./fareLineItems.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  fareLineItemsGroup
);

export const fetchFareLineItemsByTripDateAndTerminals =
  fetchFunctions.fetchFareLineItemsByTripDateAndTerminals as (
    params?: FetchFunctionParams<FareLineItemsByTripDateAndTerminalsInput>
  ) => Promise<LineItem[]>;

export const fetchFareLineItemsBasic =
  fetchFunctions.fetchFareLineItemsBasic as (
    params?: FetchFunctionParams<FareLineItemsBasicInput>
  ) => Promise<LineItem[]>;

export const fetchFareLineItemsVerbose =
  fetchFunctions.fetchFareLineItemsVerbose as (
    params?: FetchFunctionParams<FareLineItemsVerboseInput>
  ) => Promise<LineItemVerbose>;
