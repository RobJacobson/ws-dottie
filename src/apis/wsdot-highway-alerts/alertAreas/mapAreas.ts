import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
 * Factory result for map areas
 */
const mapAreasFactory = createFetchAndHook<MapAreasInput, Area[]>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: mapAreasMeta,
  getEndpointGroup: () =>
    require("./shared/alertAreas.endpoints").alertAreasGroup,
});

/**
 * Fetch function and React Query hook for retrieving all available geographic map areas for filtering alerts
 */
export const { fetch: fetchMapAreas, hook: useMapAreas } = mapAreasFactory;
