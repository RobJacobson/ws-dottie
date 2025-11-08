import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { tollTripInfoResource } from "./tollTripInfo.endpoints";
import * as fetchFunctions from "./tollTripInfo.fetch";
import type { TollTripInfoInput } from "./tollTripInfo.input";
import type { TollTripInfo } from "./tollTripInfo.output";

const hooks = createHooks(
  wsdotTollRatesApi,
  tollTripInfoResource,
  fetchFunctions
);

export const useTollTripInfo: (
  params?: FetchFunctionParams<TollTripInfoInput>,
  options?: QueryHookOptions<TollTripInfo[]>
) => UseQueryResult<TollTripInfo[], Error> = hooks.useTollTripInfo;
