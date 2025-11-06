import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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
