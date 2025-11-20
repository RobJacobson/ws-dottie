import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchAllSailingsBySchedRouteID: FetchFactory<
  AllSailingsBySchedRouteIDInput,
  Sailing[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: allSailingsBySchedRouteIDMeta,
});

/**
 * React Query hook for retrieving all sailings for scheduled route including inactive sailings
 */
export const useAllSailingsBySchedRouteID: HookFactory<
  AllSailingsBySchedRouteIDInput,
  Sailing[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: allSailingsBySchedRouteIDMeta.functionName,
  fetchFn: fetchAllSailingsBySchedRouteID,
  cacheStrategy: sailingsGroup.cacheStrategy,
});
