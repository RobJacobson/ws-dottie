import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { alertAreasGroup } from "./alertAreas.endpoints";
import type { MapAreasInput } from "./alertAreas.input";
import type { Area } from "./alertAreas.output";

const fetchFunctions = createFetchFunctions(
  wsdotHighwayAlertsApi,
  alertAreasGroup
);

export const fetchMapAreas: (
  params?: FetchFunctionParams<MapAreasInput>
) => Promise<Area[]> = fetchFunctions.fetchMapAreas;
