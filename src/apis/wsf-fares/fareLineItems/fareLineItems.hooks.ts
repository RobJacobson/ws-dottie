import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useFareLineItemsByTripDateAndTerminals =
  hooks.useFareLineItemsByTripDateAndTerminals as (
    params?: FareLineItemsByTripDateAndTerminalsInput,
    options?: QueryHookOptions<LineItem[]>
  ) => UseQueryResult<LineItem[], Error>;

export const useFareLineItemsBasic = hooks.useFareLineItemsBasic as (
  params?: FareLineItemsBasicInput,
  options?: QueryHookOptions<LineItem[]>
) => UseQueryResult<LineItem[], Error>;

export const useFareLineItemsVerbose = hooks.useFareLineItemsVerbose as (
  params?: FareLineItemsVerboseInput,
  options?: QueryHookOptions<LineItemVerbose>
) => UseQueryResult<LineItemVerbose, Error>;
