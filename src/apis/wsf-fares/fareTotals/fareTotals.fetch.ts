import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { fareTotalsGroup } from "./fareTotals.endpoints";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";

const fetchFunctions = createFetchFunctions(wsfFaresApi, fareTotalsGroup);

export const fetchFareTotalsByTripDateAndRoute: (
  params?: FetchFunctionParams<FareTotalsByTripDateAndRouteInput>
) => Promise<FareTotal[]> = fetchFunctions.fetchFareTotalsByTripDateAndRoute;
