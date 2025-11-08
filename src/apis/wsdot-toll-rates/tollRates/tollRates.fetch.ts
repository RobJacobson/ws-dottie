import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotTollRatesApi } from "../apiDefinition";
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
