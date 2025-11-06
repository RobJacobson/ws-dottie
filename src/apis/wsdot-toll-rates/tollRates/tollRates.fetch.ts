import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollRatesResource } from "./tollRates.endpoints";
import type { TollRatesInput } from "./tollRates.input";
import type { TollRate } from "./tollRates.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTollRatesApi,
  tollRatesResource
);

export const fetchTollRates = fetchFunctions.fetchTollRates as (
  params?: FetchFunctionParams<TollRatesInput>
) => Promise<TollRate[]>;
