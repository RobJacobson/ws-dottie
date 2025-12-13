import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalTransportsInput,
  terminalTransportsInputSchema,
} from "./shared/terminalTransports.input";
import {
  type TerminalTransport,
  terminalTransportSchema,
} from "./shared/terminalTransports.output";

/**
 * Metadata for the fetchTerminalTransports endpoint
 */
export const terminalTransportsMeta = {
  functionName: "fetchTerminalTransports",
  endpoint: "/terminalTransports",
  inputSchema: terminalTransportsInputSchema,
  outputSchema: terminalTransportSchema.array(),
  sampleParams: {},
  endpointDescription: "List transportation information for all terminals.",
  toolDescription: {
    purpose:
      "List comprehensive transportation and commuter information for all terminals in the WSF system.",
    useWhen: [
      "getting parking details and rates for all terminals",
      "finding airport shuttle and transit connection information",
      "accessing vehicle-specific travel tips (motorcycles, trucks, bikes, HOV)",
    ],
    avoidWhen: [
      "you only need transport info for one terminal (prefer fetchTerminalTransportsByTerminalId)",
      "you don't need detailed commuter information (prefer lighter endpoints)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per terminal",
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
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalTransportsByTerminalId (for single terminal transport info)",
    ],
  },
} satisfies EndpointMeta<TerminalTransportsInput, TerminalTransport[]>;

/**
 * Factory result for terminal transports
 */
const terminalTransportsFactory = createFetchAndHook<
  TerminalTransportsInput,
  TerminalTransport[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalTransportsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalTransports.endpoints").terminalTransportsGroup,
});

/**
 * Fetch function and React Query hook for retrieving transportation information for all terminals
 */
export const { fetch: fetchTerminalTransports, hook: useTerminalTransports } =
  terminalTransportsFactory;
