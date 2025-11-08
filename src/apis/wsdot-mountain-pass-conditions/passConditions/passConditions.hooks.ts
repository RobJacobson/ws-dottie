import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotMountainPassConditionsApi } from "@/apis/wsdot-mountain-pass-conditions/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { passConditionsGroup } from "./passConditions.endpoints";
import * as fetchFunctions from "./passConditions.fetch";
import type {
  MountainPassConditionByIdInput,
  MountainPassConditionsInput,
} from "./passConditions.input";
import type { PassCondition } from "./passConditions.output";

const hooks = createHooks(
  wsdotMountainPassConditionsApi,
  passConditionsGroup,
  fetchFunctions
);

export const useMountainPassConditionById: (
  params?: FetchFunctionParams<MountainPassConditionByIdInput>,
  options?: QueryHookOptions<PassCondition>
) => UseQueryResult<PassCondition, Error> = hooks.useMountainPassConditionById;

export const useMountainPassConditions: (
  params?: FetchFunctionParams<MountainPassConditionsInput>,
  options?: QueryHookOptions<PassCondition[]>
) => UseQueryResult<PassCondition[], Error> = hooks.useMountainPassConditions;
