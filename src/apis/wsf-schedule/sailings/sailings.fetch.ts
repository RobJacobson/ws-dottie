import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { sailingsResource } from "./sailings.endpoints";
import type {
  AllSailingsBySchedRouteIDInput,
  SailingsByRouteIDInput,
} from "./sailings.input";
import type { Sailing } from "./sailings.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  sailingsResource
);

export const fetchAllSailingsBySchedRouteID: (
  params?: FetchFunctionParams<AllSailingsBySchedRouteIDInput>
) => Promise<Sailing[]> = fetchFunctions.fetchAllSailingsBySchedRouteID;

export const fetchSailingsByRouteID: (
  params?: FetchFunctionParams<SailingsByRouteIDInput>
) => Promise<Sailing[]> = fetchFunctions.fetchSailingsByRouteID;
