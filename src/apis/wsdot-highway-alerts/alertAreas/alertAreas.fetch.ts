import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
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
