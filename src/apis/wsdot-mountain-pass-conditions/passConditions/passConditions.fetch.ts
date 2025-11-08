import { wsdotMountainPassConditionsApi } from "@/apis/wsdot-mountain-pass-conditions/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { passConditionsGroup } from "./passConditions.endpoints";
import type {
  MountainPassConditionByIdInput,
  MountainPassConditionsInput,
} from "./passConditions.input";
import type { PassCondition } from "./passConditions.output";

const fetchFunctions = createFetchFunctions(
  wsdotMountainPassConditionsApi,
  passConditionsGroup
);

export const fetchMountainPassConditionById: (
  params?: FetchFunctionParams<MountainPassConditionByIdInput>
) => Promise<PassCondition> = fetchFunctions.fetchMountainPassConditionById;

export const fetchMountainPassConditions: (
  params?: FetchFunctionParams<MountainPassConditionsInput>
) => Promise<PassCondition[]> = fetchFunctions.fetchMountainPassConditions;
