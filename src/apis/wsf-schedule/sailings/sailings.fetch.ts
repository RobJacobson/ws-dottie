import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { sailingsResource } from "./sailings.endpoints";
import type {
  AllSailingsBySchedRouteIDInput,
  SailingsByRouteIDInput,
} from "./sailings.input";
import type { Sailing } from "./sailings.output";

const fetchFunctions = createFetchFunctions(wsfScheduleApi, sailingsResource);

export const fetchAllSailingsBySchedRouteID: (
  params?: FetchFunctionParams<AllSailingsBySchedRouteIDInput>
) => Promise<Sailing[]> = fetchFunctions.fetchAllSailingsBySchedRouteID;

export const fetchSailingsByRouteID: (
  params?: FetchFunctionParams<SailingsByRouteIDInput>
) => Promise<Sailing[]> = fetchFunctions.fetchSailingsByRouteID;
