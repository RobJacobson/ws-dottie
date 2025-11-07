import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollRatesResource } from "./tollRates.endpoints";
import type { TollRatesInput } from "./tollRates.input";
import type { TollRate } from "./tollRates.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTollRatesApi,
  tollRatesResource
);

export const fetchTollRates: (
  params?: FetchFunctionParams<TollRatesInput>
) => Promise<TollRate[]> = fetchFunctions.fetchTollRates;
