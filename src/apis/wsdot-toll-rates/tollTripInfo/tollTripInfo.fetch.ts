import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripInfoResource } from "./tollTripInfo.endpoints";
import type { TollTripInfoInput } from "./tollTripInfo.input";
import type { TollTripInfo } from "./tollTripInfo.output";

const fetchFunctions = createFetchFunctions(
  wsdotTollRatesApi,
  tollTripInfoResource
);

export const fetchTollTripInfo: (
  params?: FetchFunctionParams<TollTripInfoInput>
) => Promise<TollTripInfo[]> = fetchFunctions.fetchTollTripInfo;
