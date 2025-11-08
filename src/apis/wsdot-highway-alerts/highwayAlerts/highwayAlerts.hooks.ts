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

export const useAlerts: (
  params?: AlertsInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useAlerts;

export const useAlertById: (
  params?: AlertByIdInput,
  options?: QueryHookOptions<Alert>
) => UseQueryResult<Alert, Error> = hooks.useAlertById;

export const useAlertsByRegionId: (
  params?: AlertsByRegionIDInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useAlertsByRegionId;

export const useAlertsByMapArea: (
  params?: AlertsByMapAreaInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useAlertsByMapArea;

export const useSearchAlerts: (
  params?: SearchAlertsInput,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = hooks.useSearchAlerts;
