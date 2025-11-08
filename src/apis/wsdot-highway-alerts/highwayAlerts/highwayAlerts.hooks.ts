import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import { highwayAlertsGroup } from "./highwayAlerts.endpoints";
import * as fetchFunctions from "./highwayAlerts.fetch";
import type {
  AlertByIdInput,
  AlertsByMapAreaInput,
  AlertsByRegionIDInput,
  AlertsInput,
  SearchAlertsInput,
} from "./highwayAlerts.input";
import type { Alert } from "./highwayAlerts.output";

const hooks = createHooks(
  wsdotHighwayAlertsApi,
  highwayAlertsGroup,
  fetchFunctions
);

export const useAlerts: (
  params?: FetchFunctionParams<AlertsInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useAlerts;

export const useAlertById: (
  params?: FetchFunctionParams<AlertByIdInput>,
  options?: QueryHookOptions<Alert>
) => UseQueryResult<Alert, Error> = hooks.useAlertById;

export const useAlertsByRegionId: (
  params?: FetchFunctionParams<AlertsByRegionIDInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useAlertsByRegionId;

export const useAlertsByMapArea: (
  params?: FetchFunctionParams<AlertsByMapAreaInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useAlertsByMapArea;

export const useSearchAlerts: (
  params?: FetchFunctionParams<SearchAlertsInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useSearchAlerts;
