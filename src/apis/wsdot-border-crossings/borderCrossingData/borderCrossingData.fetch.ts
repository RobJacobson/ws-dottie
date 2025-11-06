import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotBorderCrossingsApi } from "../apiDefinition";
import { borderCrossingDataResource } from "./borderCrossingData.endpoints";
import type { BorderCrossingsInput } from "./borderCrossingData.input";
import type { BorderCrossing } from "./borderCrossingData.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotBorderCrossingsApi,
  borderCrossingDataResource
);

export const fetchBorderCrossings = fetchFunctions.fetchBorderCrossings as (
  params?: FetchFunctionParams<BorderCrossingsInput>
) => Promise<BorderCrossing[]>;
