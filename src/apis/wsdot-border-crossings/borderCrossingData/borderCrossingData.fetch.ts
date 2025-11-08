import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotBorderCrossingsApi } from "../apiDefinition";
import { borderCrossingDataResource } from "./borderCrossingData.endpoints";
import type { BorderCrossingsInput } from "./borderCrossingData.input";
import type { BorderCrossing } from "./borderCrossingData.output";

const fetchFunctions = createFetchFunctions(
  wsdotBorderCrossingsApi,
  borderCrossingDataResource
);

export const fetchBorderCrossings: (
  params?: FetchFunctionParams<BorderCrossingsInput>
) => Promise<BorderCrossing[]> = fetchFunctions.fetchBorderCrossings;
