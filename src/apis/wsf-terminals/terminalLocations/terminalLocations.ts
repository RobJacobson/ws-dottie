import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalLocationsInput,
  terminalLocationsInputSchema,
} from "./shared/terminalLocations.input";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "./shared/terminalLocations.output";

/**
 * Metadata for the fetchTerminalLocations endpoint
 */
export const terminalLocationsMeta = {
  functionName: "fetchTerminalLocations",
  endpoint: "/terminalLocations",
  inputSchema: terminalLocationsInputSchema,
  outputSchema: terminalLocationSchema.array(),
  sampleParams: {},
  endpointDescription: "List location information for all terminals.",
  toolDescription: {
    purpose:
      "List detailed geographical and address information for all terminals in the WSF system.",
    useWhen: [
      "building maps or location-based interfaces",
      "getting terminal coordinates for geolocation features",
      "needing complete address and directions for all terminals",
    ],
    avoidWhen: [
      "you only need one terminal's location (prefer fetchTerminalLocationsByTerminalId)",
      "you don't need detailed location data (prefer lighter endpoints)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per terminal",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "Coordinates: Latitude, Longitude in decimal degrees",
      "Address: AddressLineOne, AddressLineTwo, City, State, ZipCode, Country",
      "Navigation: MapLink (Google Maps URL), Directions (HTML-formatted driving directions)",
      "GIS data: DispGISZoomLoc array with coordinates for different map zoom levels (can be lengthy)",
      "Large text: Directions contains substantial HTML content with detailed instructions",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalLocationsByTerminalId (for single terminal location)",
    ],
  },
} satisfies EndpointMeta<TerminalLocationsInput, TerminalLocation[]>;

/**
 * Factory result for terminal locations
 */
const terminalLocationsFactory = createFetchAndHook<
  TerminalLocationsInput,
  TerminalLocation[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalLocationsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalLocations.endpoints").terminalLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving location information for all terminals
 */
export const { fetch: fetchTerminalLocations, hook: useTerminalLocations } =
  terminalLocationsFactory;
