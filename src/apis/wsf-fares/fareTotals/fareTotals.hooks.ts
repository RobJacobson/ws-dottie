import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfFaresApi } from "../apiDefinition";
import { fareTotalsGroup } from "./fareTotals.endpoints";
import * as fetchFunctions from "./fareTotals.fetch";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";

const hooks = createHooks(wsfFaresApi, fareTotalsGroup, fetchFunctions);

export const useFareTotalsByTripDateAndRoute: (
  params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>,
  options?: QueryHookOptions<FareTotal[]>
) => UseQueryResult<FareTotal[], Error> = hooks.useFareTotalsByTripDateAndRoute;
