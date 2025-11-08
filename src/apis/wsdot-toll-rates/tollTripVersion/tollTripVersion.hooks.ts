import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
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
