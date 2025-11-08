import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

export const useTollRates: (
  params?: TollRatesInput,
  options?: QueryHookOptions<TollRate[]>
) => UseQueryResult<TollRate[], Error> = hooks.useTollRates;
