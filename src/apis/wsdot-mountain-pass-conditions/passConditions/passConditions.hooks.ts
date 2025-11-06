import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotMountainPassConditionsApi } from "../apiDefinition";
import { passConditionsGroup } from "./passConditions.endpoints";
import * as fetchFunctions from "./passConditions.fetch";
import type {
  MountainPassConditionByIdInput,
  MountainPassConditionsInput,
} from "./passConditions.input";
import type { PassCondition } from "./passConditions.output";

const hooks = createEndpointGroupHooks(
  wsdotMountainPassConditionsApi,
  passConditionsGroup,
  fetchFunctions
);

export const useMountainPassConditionById =
  hooks.useMountainPassConditionById as (
    params?: MountainPassConditionByIdInput,
    options?: QueryHookOptions<PassCondition>
  ) => UseQueryResult<PassCondition, Error>;

export const useMountainPassConditions = hooks.useMountainPassConditions as (
  params?: MountainPassConditionsInput,
  options?: QueryHookOptions<PassCondition[]>
) => UseQueryResult<PassCondition[], Error>;
