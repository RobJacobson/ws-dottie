import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { fareTotalsGroup } from "./fareTotals.endpoints";
import * as fetchFunctions from "./fareTotals.fetch";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  fareTotalsGroup,
  fetchFunctions
);

export const useFareTotalsByTripDateAndRoute: (
  params?: FareTotalsByTripDateAndRouteInput,
  options?: QueryHookOptions<FareTotal[]>
) => UseQueryResult<FareTotal[], Error> = hooks.useFareTotalsByTripDateAndRoute;
