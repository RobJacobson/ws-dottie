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
export const fetchMountainPassConditionById: (
  params?: FetchFunctionParams<MountainPassConditionByIdInput>
) => Promise<PassCondition> = createFetchFunction(
  wsdotMountainPassConditionsApi,
  passConditionsGroup,
  mountainPassConditionByIdMeta
);

/**
 * React Query hook for retrieving current conditions for a specific mountain pass by ID
 */
export const useMountainPassConditionById: (
  params?: FetchFunctionParams<MountainPassConditionByIdInput>,
  options?: QueryHookOptions<PassCondition>
) => UseQueryResult<PassCondition, Error> = createHook(
  wsdotMountainPassConditionsApi,
  passConditionsGroup,
  mountainPassConditionByIdMeta
);
