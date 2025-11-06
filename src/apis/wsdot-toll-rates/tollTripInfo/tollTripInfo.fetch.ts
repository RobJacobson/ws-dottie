import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripInfoResource } from "./tollTripInfo.endpoints";
import type { TollTripInfoInput } from "./tollTripInfo.input";
import type { TollTripInfo } from "./tollTripInfo.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTollRatesApi,
  tollTripInfoResource
);

export const fetchTollTripInfo = fetchFunctions.fetchTollTripInfo as (
  params?: FetchFunctionParams<TollTripInfoInput>
) => Promise<TollTripInfo[]>;
