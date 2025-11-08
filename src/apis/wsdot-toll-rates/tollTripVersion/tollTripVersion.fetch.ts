import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotTollRatesApi } from "../apiDefinition";
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
