import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalBasicsByIdInputSchema,
  terminalBasicsInputSchema,
} from "./terminalBasics.input";
import { terminalBasicSchema } from "./terminalBasics.output";

export const terminalBasicsGroup: EndpointGroup = {
  name: "terminal-basics",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Essential terminal details including identification, amenities, and regional assignments.",
    description:
      "Basic terminal information for Washington State Ferry terminals including IDs, names, abbreviations, amenities (overhead passenger loading, elevator, waiting room, food service, restrooms), and sort order. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal lists with basic identification and amenities.",
      "Plan ferry trips with accessibility and facility information.",
      "Filter terminals by region or amenities.",
    ],
  },
};

export const fetchTerminalBasics = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalBasicsGroup,
  functionName: "fetchTerminalBasics",
  endpoint: "/terminalBasics",
  inputSchema: terminalBasicsInputSchema,
  outputSchema: terminalBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all terminals.",
});

export const fetchTerminalBasicsByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalBasicsGroup,
  functionName: "fetchTerminalBasicsByTerminalId",
  endpoint: "/terminalBasics/{TerminalID}",
  inputSchema: terminalBasicsByIdInputSchema,
  outputSchema: terminalBasicSchema,
  sampleParams: { TerminalID: 1 },
  endpointDescription: "Get basic information for a specific terminal by ID.",
});
