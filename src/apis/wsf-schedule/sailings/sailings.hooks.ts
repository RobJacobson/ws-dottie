import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { sailingsResource } from "./sailings.endpoints";
import * as fetchFunctions from "./sailings.fetch";
import type {
  AllSailingsBySchedRouteIDInput,
  SailingsByRouteIDInput,
} from "./sailings.input";
import type { Sailing } from "./sailings.output";

const hooks = createHooks(wsfScheduleApi, sailingsResource, fetchFunctions);

export const useAllSailingsBySchedRouteID: (
  params?: FetchFunctionParams<AllSailingsBySchedRouteIDInput>,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error> = hooks.useAllSailingsBySchedRouteID;

export const useSailingsByRouteID: (
  params?: FetchFunctionParams<SailingsByRouteIDInput>,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error> = hooks.useSailingsByRouteID;
