import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotHighwayAlertsApi,
  highwayAlertsGroup
);

export const fetchAlerts = fetchFunctions.fetchAlerts as (
  params?: FetchFunctionParams<AlertsInput>
) => Promise<Alert[]>;

export const fetchAlertById = fetchFunctions.fetchAlertById as (
  params?: FetchFunctionParams<AlertByIdInput>
) => Promise<Alert>;

export const fetchAlertsByRegionId = fetchFunctions.fetchAlertsByRegionId as (
  params?: FetchFunctionParams<AlertsByRegionIDInput>
) => Promise<Alert[]>;

export const fetchAlertsByMapArea = fetchFunctions.fetchAlertsByMapArea as (
  params?: FetchFunctionParams<AlertsByMapAreaInput>
) => Promise<Alert[]>;

export const searchAlerts = fetchFunctions.searchAlerts as (
  params?: FetchFunctionParams<SearchAlertsInput>
) => Promise<Alert[]>;
