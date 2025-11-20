import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
export const fetchMapAreas: FetchFactory<MapAreasInput, Area[]> =
  createFetchFunction({
    api: wsdotHighwayAlertsApiMeta,
    endpoint: mapAreasMeta,
  });

/**
 * React Query hook for retrieving all available geographic map areas for filtering alerts
 */
export const useMapAreas: HookFactory<MapAreasInput, Area[]> = createHook({
  apiName: wsdotHighwayAlertsApiMeta.name,
  endpointName: mapAreasMeta.functionName,
  fetchFn: fetchMapAreas,
  cacheStrategy: alertAreasGroup.cacheStrategy,
});
