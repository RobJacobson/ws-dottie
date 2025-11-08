import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfFaresApi } from "../apiDefinition";
import { fareTotalsGroup } from "./fareTotals.endpoints";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";

const fetchFunctions = createFetchFunctions(wsfFaresApi, fareTotalsGroup);

export const fetchFareTotalsByTripDateAndRoute: (
  params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>
) => Promise<FareTotal[]> = fetchFunctions.fetchFareTotalsByTripDateAndRoute;
