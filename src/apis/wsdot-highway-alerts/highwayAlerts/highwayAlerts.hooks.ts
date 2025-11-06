import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
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

const hooks = createEndpointGroupHooks(
  wsdotHighwayAlertsApi,
  highwayAlertsGroup,
  fetchFunctions
);

export const useAlerts = hooks.useAlerts as (
  params?: AlertsInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error>;

export const useAlertById = hooks.useAlertById as (
  params?: AlertByIdInput,
  options?: QueryHookOptions<Alert>
) => UseQueryResult<Alert, Error>;

export const useAlertsByRegionId = hooks.useAlertsByRegionId as (
  params?: AlertsByRegionIDInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error>;

export const useAlertsByMapArea = hooks.useAlertsByMapArea as (
  params?: AlertsByMapAreaInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error>;

export const useSearchAlerts = hooks.useSearchAlerts as (
  params?: SearchAlertsInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error>;
