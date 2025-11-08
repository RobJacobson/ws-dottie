import { wsdotBorderCrossingsApi } from "@/apis/wsdot-border-crossings/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
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
