import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotBorderCrossingsApi } from "../apiDefinition";
import { borderCrossingDataResource } from "./borderCrossingData.endpoints";
import * as fetchFunctions from "./borderCrossingData.fetch";
import type { BorderCrossingsInput } from "./borderCrossingData.input";
import type { BorderCrossing } from "./borderCrossingData.output";

const hooks = createEndpointGroupHooks(
  wsdotBorderCrossingsApi,
  borderCrossingDataResource,
  fetchFunctions
);

export const useBorderCrossings: (
  params?: BorderCrossingsInput,
  options?: QueryHookOptions<BorderCrossing[]>
) => UseQueryResult<BorderCrossing[], Error> = hooks.useBorderCrossings;
