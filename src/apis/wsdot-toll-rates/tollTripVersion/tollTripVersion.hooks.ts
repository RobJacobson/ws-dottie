import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { tollTripVersionResource } from "./tollTripVersion.endpoints";
import * as fetchFunctions from "./tollTripVersion.fetch";
import type { TollTripVersionInput } from "./tollTripVersion.input";
import type { TollTripVersion } from "./tollTripVersion.output";

const hooks = createHooks(
  wsdotTollRatesApi,
  tollTripVersionResource,
  fetchFunctions
);

export const useTollTripVersion: (
  params?: FetchFunctionParams<TollTripVersionInput>,
  options?: QueryHookOptions<TollTripVersion>
) => UseQueryResult<TollTripVersion, Error> = hooks.useTollTripVersion;
