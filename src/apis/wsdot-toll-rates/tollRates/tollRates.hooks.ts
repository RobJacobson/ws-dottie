import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { tollRatesResource } from "./tollRates.endpoints";
import * as fetchFunctions from "./tollRates.fetch";
import type { TollRatesInput } from "./tollRates.input";
import type { TollRate } from "./tollRates.output";

const hooks = createHooks(wsdotTollRatesApi, tollRatesResource, fetchFunctions);

export const useTollRates: (
  params?: FetchFunctionParams<TollRatesInput>,
  options?: QueryHookOptions<TollRate[]>
) => UseQueryResult<TollRate[], Error> = hooks.useTollRates;
