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
  type SailingsByRouteIDInput,
  sailingsByRouteIDInputSchema,
} from "./shared/sailings.input";
import { type Sailing, sailingSchema } from "./shared/sailings.output";

/**
 * Metadata for the fetchSailingsByRouteID endpoint
 */
export const sailingsByRouteIDMeta = {
  functionName: "fetchSailingsByRouteID",
  endpoint: "/sailings/{SchedRouteID}",
  inputSchema: sailingsByRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription: "List active sailings for specified scheduled route.",
} satisfies EndpointMeta<SailingsByRouteIDInput, Sailing[]>;

/**
 * Fetch function for retrieving active sailings for specified scheduled route
 */
export const fetchSailingsByRouteID: FetchFactory<
  SailingsByRouteIDInput,
  Sailing[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: sailingsByRouteIDMeta,
});

/**
 * React Query hook for retrieving active sailings for specified scheduled route
 */
export const useSailingsByRouteID: HookFactory<
  SailingsByRouteIDInput,
  Sailing[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: sailingsByRouteIDMeta.functionName,
  fetchFn: fetchSailingsByRouteID,
  cacheStrategy: sailingsGroup.cacheStrategy,
});
