import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
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
