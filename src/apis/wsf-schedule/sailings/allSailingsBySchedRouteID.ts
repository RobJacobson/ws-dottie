import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { sailingsGroup } from "./shared/sailings.endpoints";
import {
  type AllSailingsBySchedRouteIDInput,
  allSailingsBySchedRouteIDInputSchema,
} from "./shared/sailings.input";
import { type Sailing, sailingSchema } from "./shared/sailings.output";

/**
 * Metadata for the fetchAllSailingsBySchedRouteID endpoint
 */
export const allSailingsBySchedRouteIDMeta = {
  functionName: "fetchAllSailingsBySchedRouteID",
  endpoint: "/allsailings/{SchedRouteID}",
  inputSchema: allSailingsBySchedRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription:
    "List all sailings for scheduled route including inactive sailings.",
} satisfies EndpointMeta<AllSailingsBySchedRouteIDInput, Sailing[]>;

/**
 * Fetch function for retrieving all sailings for scheduled route including inactive sailings
 */
export const fetchAllSailingsBySchedRouteID: (
  params?: FetchFunctionParams<AllSailingsBySchedRouteIDInput>
) => Promise<Sailing[]> = createFetchFunction(
  apis.wsfSchedule,
  sailingsGroup,
  allSailingsBySchedRouteIDMeta
);

/**
 * React Query hook for retrieving all sailings for scheduled route including inactive sailings
 */
export const useAllSailingsBySchedRouteID: (
  params?: FetchFunctionParams<AllSailingsBySchedRouteIDInput>,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error> = createHook(
  apis.wsfSchedule,
  sailingsGroup,
  allSailingsBySchedRouteIDMeta
);
