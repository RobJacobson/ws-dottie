import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripVersionResource } from "./tollTripVersion.endpoints";
import * as fetchFunctions from "./tollTripVersion.fetch";
import type { TollTripVersionInput } from "./tollTripVersion.input";
import type { TollTripVersion } from "./tollTripVersion.output";

const hooks = createEndpointGroupHooks(
  wsdotTollRatesApi,
  tollTripVersionResource,
  fetchFunctions
);

export const useTollTripVersion = hooks.useTollTripVersion as (
  params?: TollTripVersionInput,
  options?: QueryHookOptions<TollTripVersion>
) => UseQueryResult<TollTripVersion, Error>;
