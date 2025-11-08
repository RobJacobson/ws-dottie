import type { UseQueryResult } from "@tanstack/react-query";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { fareLineItemsGroup } from "./fareLineItems.endpoints";
import * as fetchFunctions from "./fareLineItems.fetch";
import type {
  FareLineItemsBasicInput,
  FareLineItemsByTripDateAndTerminalsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems.input";
import type { LineItem, LineItemVerbose } from "./fareLineItems.output";

const hooks = createHooks(wsfFaresApi, fareLineItemsGroup, fetchFunctions);

export const useFareLineItemsByTripDateAndTerminals: (
  params?: FetchFunctionParams<FareLineItemsByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error> =
  hooks.useFareLineItemsByTripDateAndTerminals;

export const useFareLineItemsBasic: (
  params?: FetchFunctionParams<FareLineItemsBasicInput>,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error> = hooks.useFareLineItemsBasic;

export const useFareLineItemsVerbose: (
  params?: FetchFunctionParams<FareLineItemsVerboseInput>,
  options?: QueryHookOptions<LineItemVerbose>
) => UseQueryResult<LineItemVerbose, Error> = hooks.useFareLineItemsVerbose;
