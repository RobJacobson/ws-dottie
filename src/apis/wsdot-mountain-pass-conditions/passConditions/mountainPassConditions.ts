import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotMountainPassConditionsApiMeta } from "../apiMeta";
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
 * Factory result for mountain pass conditions
 */
const mountainPassConditionsFactory = createFetchAndHook<
  MountainPassConditionsInput,
  PassCondition[]
>({
  api: wsdotMountainPassConditionsApiMeta,
  endpoint: mountainPassConditionsMeta,
  getEndpointGroup: () =>
    require("./shared/passConditions.endpoints").passConditionsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current conditions for all monitored mountain passes
 */
export const {
  fetch: fetchMountainPassConditions,
  hook: useMountainPassConditions,
} = mountainPassConditionsFactory;
