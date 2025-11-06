import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollRatesResource } from "./tollRates.endpoints";
import * as fetchFunctions from "./tollRates.fetch";
import type { TollRatesInput } from "./tollRates.input";
import type { TollRate } from "./tollRates.output";

const hooks = createEndpointGroupHooks(
  wsdotTollRatesApi,
  tollRatesResource,
  fetchFunctions
);

export const useTollRates = hooks.useTollRates as (
  params?: TollRatesInput,
  options?: QueryHookOptions<TollRate[]>
) => UseQueryResult<TollRate[], Error>;
