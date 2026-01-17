import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalTransportsByTerminalIdInput,
  terminalTransportsByTerminalIdInputSchema,
} from "./shared/terminalTransports.input";
import {
  type TerminalTransport,
  terminalTransportSchema,
} from "./shared/terminalTransports.output";

/**
 * Metadata for the fetchTerminalTransportsByTerminalId endpoint
 */
export const terminalTransportsByTerminalIdMeta = {
  functionName: "fetchTerminalTransportsByTerminalId",
  endpoint: "/terminalTransports/{TerminalID}",
  inputSchema: terminalTransportsByTerminalIdInputSchema,
  outputSchema: terminalTransportSchema,
  sampleParams: { TerminalID: 10 },
  endpointDescription:
    "Get transportation information for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get comprehensive transportation and commuter information for a single terminal by its TerminalID.",
    useWhen: [
      "getting detailed parking rates and directions for a specific terminal",
      "finding airport shuttle and transit connections for your destination",
      "accessing vehicle-specific travel tips for a particular terminal",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you need transport info for multiple terminals (prefer fetchTerminalTransports)",
    ],
    inputs: ["TerminalID: from fetchTerminalBasics → TerminalID"],
    returns: "object — one terminal with detailed transport info",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "Parking: ParkingInfo (HTML rates/details), ParkingShuttleInfo (shuttle services)",
      "Airport: AirportInfo (directions), AirportShuttleInfo (shuttle services)",
      "Vehicle tips: MotorcycleInfo, TruckInfo, BikeInfo (HTML-formatted travel tips)",
      "Transit: TrainInfo, TaxiInfo, HovInfo (carpool/vanpool details)",
      "TransitLinks array: transit agency URLs and names for public transportation",
      "Large text: extensive HTML content for parking rates, directions, and vehicle tips",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalTransportsByTerminalId",
    ],
  },
} satisfies EndpointMeta<
  TerminalTransportsByTerminalIdInput,
  TerminalTransport
>;

/**
 * Factory result for terminal transports by terminal ID
 */
const terminalTransportsByTerminalIdFactory = createFetchAndHook<
  TerminalTransportsByTerminalIdInput,
  TerminalTransport
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalTransportsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalTransports.endpoints").terminalTransportsGroup,
});

/**
 * Fetch function and React Query hook for retrieving transportation information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalTransportsByTerminalId,
  hook: useTerminalTransportsByTerminalId,
} = terminalTransportsByTerminalIdFactory;
