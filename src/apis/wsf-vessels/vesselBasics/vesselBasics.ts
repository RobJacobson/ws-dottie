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
} from "@/shared/factories/metaEndpointFactory";
import { vesselBasicsGroup } from "./shared/vesselBasics.endpoints";
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
 * Fetch function for retrieving basic information for all vessels in the fleet
 */
export const fetchVesselBasics: (
  params?: FetchFunctionParams<VesselBasicsInput>
) => Promise<VesselBasic[]> = createFetchFunction(
  apis.wsfVessels,
  vesselBasicsGroup,
  vesselBasicsMeta
);

/**
 * React Query hook for retrieving basic information for all vessels in the fleet
 */
export const useVesselBasics: (
  params?: FetchFunctionParams<VesselBasicsInput>,
  options?: QueryHookOptions<VesselBasic[]>
) => UseQueryResult<VesselBasic[], Error> = createHook(
  apis.wsfVessels,
  vesselBasicsGroup,
  vesselBasicsMeta
);
