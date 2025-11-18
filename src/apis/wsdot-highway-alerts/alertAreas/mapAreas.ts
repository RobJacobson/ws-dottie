import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { alertAreasGroup } from "./shared/alertAreas.endpoints";
import {
  type MapAreasInput,
  mapAreasInputSchema,
} from "./shared/alertAreas.input";
import { type Area, areaSchema } from "./shared/alertAreas.output";

/**
 * Metadata for the fetchMapAreas endpoint
 */
export const mapAreasMeta = {
  functionName: "fetchMapAreas",
  endpoint: "/getMapAreasAsJson",
  inputSchema: mapAreasInputSchema,
  outputSchema: areaSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List all available geographic map areas for filtering alerts.",
} satisfies EndpointMeta<MapAreasInput, Area[]>;

/**
 * Fetch function for retrieving all available geographic map areas for filtering alerts
 */
export const fetchMapAreas: (
  params?: FetchFunctionParams<MapAreasInput>
) => Promise<Area[]> = createFetchFunction(
  apis.wsdotHighwayAlerts,
  alertAreasGroup,
  mapAreasMeta
);

/**
 * React Query hook for retrieving all available geographic map areas for filtering alerts
 */
export const useMapAreas: (
  params?: FetchFunctionParams<MapAreasInput>,
  options?: QueryHookOptions<Area[]>
) => UseQueryResult<Area[], Error> = createHook(
  apis.wsdotHighwayAlerts,
  alertAreasGroup,
  mapAreasMeta
);
