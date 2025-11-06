import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripInfoResource } from "./tollTripInfo.endpoints";
import * as fetchFunctions from "./tollTripInfo.fetch";
import type { TollTripInfoInput } from "./tollTripInfo.input";
import type { TollTripInfo } from "./tollTripInfo.output";

const hooks = createEndpointGroupHooks(
  wsdotTollRatesApi,
  tollTripInfoResource,
  fetchFunctions
);

export const useTollTripInfo = hooks.useTollTripInfo as (
  params?: TollTripInfoInput,
  options?: QueryHookOptions<TollTripInfo[]>
) => UseQueryResult<TollTripInfo[], Error>;
