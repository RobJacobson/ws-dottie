import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotTollRatesApi } from "../apiDefinition";
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
