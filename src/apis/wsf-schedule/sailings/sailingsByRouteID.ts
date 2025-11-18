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
export const fetchSailingsByRouteID: (
  params?: FetchFunctionParams<SailingsByRouteIDInput>
) => Promise<Sailing[]> = createFetchFunction(
  apis.wsfSchedule,
  sailingsGroup,
  sailingsByRouteIDMeta
);

/**
 * React Query hook for retrieving active sailings for specified scheduled route
 */
export const useSailingsByRouteID: (
  params?: FetchFunctionParams<SailingsByRouteIDInput>,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error> = createHook(
  apis.wsfSchedule,
  sailingsGroup,
  sailingsByRouteIDMeta
);
