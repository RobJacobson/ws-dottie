import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotBorderCrossingsApi } from "../apiDefinition";
import { borderCrossingDataResource } from "./borderCrossingData.endpoints";
import * as fetchFunctions from "./borderCrossingData.fetch";
import type { BorderCrossingsInput } from "./borderCrossingData.input";
import type { BorderCrossing } from "./borderCrossingData.output";

const hooks = createHooks(
  wsdotBorderCrossingsApi,
  borderCrossingDataResource,
  fetchFunctions
);

export const useBorderCrossings: (
  params?: FetchFunctionParams<BorderCrossingsInput>,
  options?: QueryHookOptions<BorderCrossing[]>
) => UseQueryResult<BorderCrossing[], Error> = hooks.useBorderCrossings;
