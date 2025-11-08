import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollRatesResource } from "./tollRates.endpoints";
import * as fetchFunctions from "./tollRates.fetch";
import type { TollRatesInput } from "./tollRates.input";
import type { TollRate } from "./tollRates.output";

const hooks = createHooks(wsdotTollRatesApi, tollRatesResource, fetchFunctions);

export const useTollRates: (
  params?: FetchFunctionParams<TollRatesInput>,
  options?: QueryHookOptions<TollRate[]>
) => UseQueryResult<TollRate[], Error> = hooks.useTollRates;
