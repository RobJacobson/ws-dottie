import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselBasicsInput,
  vesselBasicsInputSchema,
} from "./shared/vesselBasics.input";
import {
  type VesselBasic,
  vesselBasicSchema,
} from "./shared/vesselBasics.output";

/**
 * Metadata for the fetchVesselBasics endpoint
 */
export const vesselBasicsMeta = {
  functionName: "fetchVesselBasics",
  endpoint: "/vesselBasics",
  inputSchema: vesselBasicsInputSchema,
  outputSchema: vesselBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all vessels in the fleet.",
} satisfies EndpointMeta<VesselBasicsInput, VesselBasic[]>;

/**
 * Factory result for vessel basics
 */
const vesselBasicsFactory = createFetchAndHook<
  VesselBasicsInput,
  VesselBasic[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselBasicsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselBasics.endpoints").vesselBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for all vessels in the fleet
 */
export const { fetch: fetchVesselBasics, hook: useVesselBasics } =
  vesselBasicsFactory;
