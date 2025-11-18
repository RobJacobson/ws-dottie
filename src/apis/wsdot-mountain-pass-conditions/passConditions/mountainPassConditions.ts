import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotMountainPassConditionsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchMountainPassConditions: (
  params?: FetchFunctionParams<MountainPassConditionsInput>
) => Promise<PassCondition[]> = createFetchFunction(
  wsdotMountainPassConditionsApi,
  passConditionsGroup,
  mountainPassConditionsMeta
);

/**
 * React Query hook for retrieving current conditions for all monitored mountain passes
 */
export const useMountainPassConditions: (
  params?: FetchFunctionParams<MountainPassConditionsInput>,
  options?: QueryHookOptions<PassCondition[]>
) => UseQueryResult<PassCondition[], Error> = createHook(
  wsdotMountainPassConditionsApi,
  passConditionsGroup,
  mountainPassConditionsMeta
);
