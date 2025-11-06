import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { fareTotalsGroup } from "./fareTotals.endpoints";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  fareTotalsGroup
);

export const fetchFareTotalsByTripDateAndRoute =
  fetchFunctions.fetchFareTotalsByTripDateAndRoute as (
    params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>
  ) => Promise<FareTotal[]>;
