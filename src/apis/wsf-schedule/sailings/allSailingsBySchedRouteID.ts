import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for all sailings by scheduled route ID
 */
const allSailingsBySchedRouteIDFactory = createFetchAndHook<
  AllSailingsBySchedRouteIDInput,
  Sailing[]
>({
  api: wsfScheduleApiMeta,
  endpoint: allSailingsBySchedRouteIDMeta,
  getEndpointGroup: () => require("./shared/sailings.endpoints").sailingsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all sailings for scheduled route including inactive sailings
 */
export const {
  fetch: fetchAllSailingsBySchedRouteID,
  hook: useAllSailingsBySchedRouteID,
} = allSailingsBySchedRouteIDFactory;
