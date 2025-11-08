import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { fareLineItemsGroup } from "./fareLineItems.endpoints";
import type {
  FareLineItemsBasicInput,
  FareLineItemsByTripDateAndTerminalsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems.input";
import type { LineItem, LineItemVerbose } from "./fareLineItems.output";

const fetchFunctions = createFetchFunctions(wsfFaresApi, fareLineItemsGroup);

export const fetchFareLineItemsByTripDateAndTerminals: (
  params?: FetchFunctionParams<FareLineItemsByTripDateAndTerminalsInput>
) => Promise<LineItem[]> =
  fetchFunctions.fetchFareLineItemsByTripDateAndTerminals;

export const fetchFareLineItemsBasic: (
  params?: FetchFunctionParams<FareLineItemsBasicInput>
) => Promise<LineItem[]> = fetchFunctions.fetchFareLineItemsBasic;

export const fetchFareLineItemsVerbose: (
  params?: FetchFunctionParams<FareLineItemsVerboseInput>
) => Promise<LineItemVerbose> = fetchFunctions.fetchFareLineItemsVerbose;
