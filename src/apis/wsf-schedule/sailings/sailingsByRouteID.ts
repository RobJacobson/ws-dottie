import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for sailings by route ID
 */
const sailingsByRouteIDFactory = createFetchAndHook<
  SailingsByRouteIDInput,
  Sailing[]
>({
  api: wsfScheduleApiMeta,
  endpoint: sailingsByRouteIDMeta,
  getEndpointGroup: () => require("./shared/sailings.endpoints").sailingsGroup,
});

/**
 * Fetch function and React Query hook for retrieving active sailings for specified scheduled route
 */
export const { fetch: fetchSailingsByRouteID, hook: useSailingsByRouteID } =
  sailingsByRouteIDFactory;
