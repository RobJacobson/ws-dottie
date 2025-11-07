import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotMountainPassConditionsApi } from "../apiDefinition";
import { passConditionsGroup } from "./passConditions.endpoints";
import type {
  MountainPassConditionByIdInput,
  MountainPassConditionsInput,
} from "./passConditions.input";
import type { PassCondition } from "./passConditions.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotMountainPassConditionsApi,
  passConditionsGroup
);

export const fetchMountainPassConditionById: (
  params?: FetchFunctionParams<MountainPassConditionByIdInput>
) => Promise<PassCondition> = fetchFunctions.fetchMountainPassConditionById;

export const fetchMountainPassConditions: (
  params?: FetchFunctionParams<MountainPassConditionsInput>
) => Promise<PassCondition[]> = fetchFunctions.fetchMountainPassConditions;
