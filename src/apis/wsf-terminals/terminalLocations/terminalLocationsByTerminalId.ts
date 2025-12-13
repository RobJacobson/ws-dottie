import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalLocationsByIdInput,
  terminalLocationsByIdInputSchema,
} from "./shared/terminalLocations.input";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "./shared/terminalLocations.output";

/**
 * Metadata for the fetchTerminalLocationsByTerminalId endpoint
 */
export const terminalLocationsByTerminalIdMeta = {
  functionName: "fetchTerminalLocationsByTerminalId",
  endpoint: "/terminalLocations/{TerminalID}",
  inputSchema: terminalLocationsByIdInputSchema,
  outputSchema: terminalLocationSchema,
  sampleParams: { TerminalID: 5 },
  endpointDescription:
    "Get location information for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get detailed geographical and address information for a single terminal by its TerminalID.",
    useWhen: [
      "getting coordinates and directions for a specific terminal",
      "enriching terminal details with location data",
      "minimizing payload when you only need one terminal's location",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you need locations for multiple terminals (prefer fetchTerminalLocations)",
    ],
    inputs: ["TerminalID: from fetchTerminalBasics → TerminalID"],
    returns: "object — one terminal with detailed location data",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "Coordinates: Latitude, Longitude in decimal degrees",
      "Address: AddressLineOne, AddressLineTwo, City, State, ZipCode, Country",
      "Navigation: MapLink (map URL), Directions (HTML-formatted driving directions)",
      "GIS data: DispGISZoomLoc array with coordinates for different map zoom levels",
      "Large text: Directions contains substantial HTML content with detailed instructions",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalLocationsByTerminalId",
    ],
  },
} satisfies EndpointMeta<TerminalLocationsByIdInput, TerminalLocation>;

/**
 * Factory result for terminal locations by terminal ID
 */
const terminalLocationsByTerminalIdFactory = createFetchAndHook<
  TerminalLocationsByIdInput,
  TerminalLocation
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalLocationsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalLocations.endpoints").terminalLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving location information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalLocationsByTerminalId,
  hook: useTerminalLocationsByTerminalId,
} = terminalLocationsByTerminalIdFactory;
