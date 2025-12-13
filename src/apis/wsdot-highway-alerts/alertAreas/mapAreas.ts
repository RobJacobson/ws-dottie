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
  toolDescription: {
    purpose:
      "List all available geographic map areas for filtering highway alerts by region.",
    useWhen: [
      "discovering available map area codes for filtering alerts",
      "building regional filter interfaces",
      "obtaining valid area identifiers for alert queries",
    ],
    inputsHighlights: "none",
    returns: "array — one item per map area",
    outputHighlights: [
      "IDs: MapArea (region code like 'L2PS' for Puget Sound)",
      "Names: MapAreaDescription (display name like 'Puget Sound')",
      "Coverage: includes statewide regions and local camera areas",
      "Count: ~45 areas total",
      "Null handling: both fields may be null in rare cases",
    ],
    chaining: [
      "fetchMapAreas → extract MapArea → call fetchAlertsByMapArea with { MapArea: ... }",
    ],
  },
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
