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

export const fetchAllSailingsBySchedRouteID =
  fetchFunctions.fetchAllSailingsBySchedRouteID as (
    params?: FetchFunctionParams<AllSailingsBySchedRouteIDInput>
  ) => Promise<Sailing[]>;

export const fetchSailingsByRouteID = fetchFunctions.fetchSailingsByRouteID as (
  params?: FetchFunctionParams<SailingsByRouteIDInput>
) => Promise<Sailing[]>;
