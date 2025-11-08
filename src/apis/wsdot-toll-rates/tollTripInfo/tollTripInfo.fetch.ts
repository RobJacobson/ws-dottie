import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
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
