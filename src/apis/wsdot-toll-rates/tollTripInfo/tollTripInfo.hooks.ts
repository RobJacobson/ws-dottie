import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
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
