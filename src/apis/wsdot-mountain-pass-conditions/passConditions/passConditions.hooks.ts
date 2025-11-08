import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotMountainPassConditionsApi } from "../apiDefinition";
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
