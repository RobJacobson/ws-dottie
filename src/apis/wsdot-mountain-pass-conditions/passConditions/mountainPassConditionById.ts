import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotMountainPassConditionsApiMeta } from "../apiMeta";
import { passConditionsGroup } from "./shared/passConditions.endpoints";
import {
  type MountainPassConditionByIdInput,
  mountainPassConditionByIdInputSchema,
} from "./shared/passConditions.input";
import {
  type PassCondition,
  passConditionSchema,
} from "./shared/passConditions.output";

/**
 * Metadata for the fetchMountainPassConditionById endpoint
 */
export const mountainPassConditionByIdMeta = {
  functionName: "fetchMountainPassConditionById",
  endpoint: "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
  inputSchema: mountainPassConditionByIdInputSchema,
  outputSchema: passConditionSchema,
  sampleParams: { PassConditionID: 12 },
  endpointDescription:
    "Get current conditions for a specific mountain pass by ID.",
} satisfies EndpointMeta<MountainPassConditionByIdInput, PassCondition>;

/**
 * Fetch function for retrieving current conditions for a specific mountain pass by ID
 */
export const fetchMountainPassConditionById: FetchFactory<
  MountainPassConditionByIdInput,
  PassCondition
> = createFetchFunction({
  api: wsdotMountainPassConditionsApiMeta,
  endpoint: mountainPassConditionByIdMeta,
});

/**
 * React Query hook for retrieving current conditions for a specific mountain pass by ID
 */
export const useMountainPassConditionById: HookFactory<
  MountainPassConditionByIdInput,
  PassCondition
> = createHook({
  apiName: wsdotMountainPassConditionsApiMeta.name,
  endpointName: mountainPassConditionByIdMeta.functionName,
  fetchFn: fetchMountainPassConditionById,
  cacheStrategy: passConditionsGroup.cacheStrategy,
});
