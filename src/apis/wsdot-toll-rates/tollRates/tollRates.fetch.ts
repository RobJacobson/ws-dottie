import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import { tollRatesResource } from "./tollRates.endpoints";
import type { TollRatesInput } from "./tollRates.input";
import type { TollRate } from "./tollRates.output";

const fetchFunctions = createFetchFunctions(
  wsdotTollRatesApi,
  tollRatesResource
);

export const fetchTollRates: (
  params?: FetchFunctionParams<TollRatesInput>
) => Promise<TollRate[]> = fetchFunctions.fetchTollRates;
