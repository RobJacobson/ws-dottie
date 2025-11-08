import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { highwayAlertsGroup } from "./highwayAlerts.endpoints";
import type {
  AlertByIdInput,
  AlertsByMapAreaInput,
  AlertsByRegionIDInput,
  AlertsInput,
  SearchAlertsInput,
} from "./highwayAlerts.input";
import type { Alert } from "./highwayAlerts.output";

const fetchFunctions = createFetchFunctions(
  wsdotHighwayAlertsApi,
  highwayAlertsGroup
);

export const fetchAlerts: (
  params?: FetchFunctionParams<AlertsInput>
) => Promise<Alert[]> = fetchFunctions.fetchAlerts;

export const fetchAlertById: (
  params?: FetchFunctionParams<AlertByIdInput>
) => Promise<Alert> = fetchFunctions.fetchAlertById;

export const fetchAlertsByRegionId: (
  params?: FetchFunctionParams<AlertsByRegionIDInput>
) => Promise<Alert[]> = fetchFunctions.fetchAlertsByRegionId;

export const fetchAlertsByMapArea: (
  params?: FetchFunctionParams<AlertsByMapAreaInput>
) => Promise<Alert[]> = fetchFunctions.fetchAlertsByMapArea;

export const searchAlerts: (
  params?: FetchFunctionParams<SearchAlertsInput>
) => Promise<Alert[]> = fetchFunctions.searchAlerts;
