import { wsdotTollRatesApi } from "@/apis/wsdot-toll-rates/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { tollTripVersionResource } from "./tollTripVersion.endpoints";
import type { TollTripVersionInput } from "./tollTripVersion.input";
import type { TollTripVersion } from "./tollTripVersion.output";

const fetchFunctions = createFetchFunctions(
  wsdotTollRatesApi,
  tollTripVersionResource
);

export const fetchTollTripVersion: (
  params?: FetchFunctionParams<TollTripVersionInput>
) => Promise<TollTripVersion> = fetchFunctions.fetchTollTripVersion;
