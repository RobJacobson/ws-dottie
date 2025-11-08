import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import { fareTotalsGroup } from "./fareTotals.endpoints";
import * as fetchFunctions from "./fareTotals.fetch";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";

const hooks = createHooks(wsfFaresApi, fareTotalsGroup, fetchFunctions);

export const useFareTotalsByTripDateAndRoute: (
  params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>,
  options?: QueryHookOptions<FareTotal[]>
) => UseQueryResult<FareTotal[], Error> = hooks.useFareTotalsByTripDateAndRoute;
