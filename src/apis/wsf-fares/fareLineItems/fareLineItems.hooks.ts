import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { fareLineItemsGroup } from "./fareLineItems.endpoints";
import * as fetchFunctions from "./fareLineItems.fetch";
import type {
  FareLineItemsBasicInput,
  FareLineItemsByTripDateAndTerminalsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems.input";
import type { LineItem, LineItemVerbose } from "./fareLineItems.output";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  fareLineItemsGroup,
  fetchFunctions
);

export const useFareLineItemsByTripDateAndTerminals: (
  params?: FareLineItemsByTripDateAndTerminalsInput,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error> = hooks.useFareLineItemsByTripDateAndTerminals;

export const useFareLineItemsBasic: (
  params?: FareLineItemsBasicInput,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error> = hooks.useFareLineItemsBasic;

export const useFareLineItemsVerbose: (
  params?: FareLineItemsVerboseInput,
  options?: QueryHookOptions<LineItemVerbose>
) => UseQueryResult<LineItemVerbose, Error> = hooks.useFareLineItemsVerbose;
