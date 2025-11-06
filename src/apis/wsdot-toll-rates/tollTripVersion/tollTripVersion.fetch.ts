import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripVersionResource } from "./tollTripVersion.endpoints";
import type { TollTripVersionInput } from "./tollTripVersion.input";
import type { TollTripVersion } from "./tollTripVersion.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTollRatesApi,
  tollTripVersionResource
);

export const fetchTollTripVersion = fetchFunctions.fetchTollTripVersion as (
  params?: FetchFunctionParams<TollTripVersionInput>
) => Promise<TollTripVersion>;
