import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselHistoriesInput,
  vesselHistoriesInputSchema,
} from "./shared/vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./shared/vesselHistories.output";

/**
 * Metadata for the fetchVesselHistories endpoint
 */
export const vesselHistoriesMeta = {
  functionName: "fetchVesselHistories",
  endpoint: "/vesselHistory",
  inputSchema: vesselHistoriesInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {},
  endpointDescription: "List historical sailing records for all vessels.",
} satisfies EndpointMeta<VesselHistoriesInput, VesselHistory[]>;

/**
 * Factory result for vessel histories
 */
const vesselHistoriesFactory = createFetchAndHook<
  VesselHistoriesInput,
  VesselHistory[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselHistoriesMeta,
  getEndpointGroup: () =>
    require("./shared/vesselHistories.endpoints").vesselHistoriesGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical sailing records for all vessels
 */
export const { fetch: fetchVesselHistories, hook: useVesselHistories } =
  vesselHistoriesFactory;
