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
  type MountainPassConditionsInput,
  mountainPassConditionsInputSchema,
} from "./shared/passConditions.input";
import {
  type PassCondition,
  passConditionSchema,
} from "./shared/passConditions.output";

/**
 * Metadata for the fetchMountainPassConditions endpoint
 */
export const mountainPassConditionsMeta = {
  functionName: "fetchMountainPassConditions",
  endpoint: "/getMountainPassConditionsAsJson",
  inputSchema: mountainPassConditionsInputSchema,
  outputSchema: passConditionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current conditions for all monitored mountain passes.",
} satisfies EndpointMeta<MountainPassConditionsInput, PassCondition[]>;

/**
 * Fetch function for retrieving current conditions for all monitored mountain passes
 */
export const fetchMountainPassConditions: FetchFactory<
  MountainPassConditionsInput,
  PassCondition[]
> = createFetchFunction({
  api: wsdotMountainPassConditionsApiMeta,
  endpoint: mountainPassConditionsMeta,
});

/**
 * React Query hook for retrieving current conditions for all monitored mountain passes
 */
export const useMountainPassConditions: HookFactory<
  MountainPassConditionsInput,
  PassCondition[]
> = createHook({
  apiName: wsdotMountainPassConditionsApiMeta.name,
  endpointName: mountainPassConditionsMeta.functionName,
  fetchFn: fetchMountainPassConditions,
  cacheStrategy: passConditionsGroup.cacheStrategy,
});
