import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { alertAreasGroup } from "./alertAreas.endpoints";
import type { MapAreasInput } from "./alertAreas.input";
import type { Area } from "./alertAreas.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotHighwayAlertsApi,
  alertAreasGroup
);

export const fetchMapAreas = fetchFunctions.fetchMapAreas as (
  params?: FetchFunctionParams<MapAreasInput>
) => Promise<Area[]>;
