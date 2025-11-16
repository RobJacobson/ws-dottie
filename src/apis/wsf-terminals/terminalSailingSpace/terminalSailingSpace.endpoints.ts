import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalSailingSpaceByTerminalIdInputSchema,
  terminalSailingSpaceInputSchema,
} from "./terminalSailingSpace.input";
import { terminalSailingSpaceSchema } from "./terminalSailingSpace.output";

export const terminalSailingSpaceGroup: EndpointGroup = {
  name: "terminal-sailing-space",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Real-time sailing space availability for upcoming departures.",
    description:
      "Terminal condition data including drive-up and reservation spaces available for select departures, vessel information, and cancellation status. Data changes frequently (potentially every 5 seconds). Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group. Do not cache results for extended periods.",
    useCases: [
      "Display real-time space availability for upcoming sailings.",
      "Show drive-up and reservation space counts with color indicators.",
      "Monitor vessel assignments and departure cancellations.",
    ],
  },
};

export const fetchTerminalSailingSpace = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalSailingSpaceGroup,
  functionName: "fetchTerminalSailingSpace",
  endpoint: "/terminalSailingSpace",
  inputSchema: terminalSailingSpaceInputSchema,
  outputSchema: terminalSailingSpaceSchema.array(),
  sampleParams: {},
  endpointDescription: "List sailing space availability for all terminals.",
});

export const fetchTerminalSailingSpaceByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalSailingSpaceGroup,
  functionName: "fetchTerminalSailingSpaceByTerminalId",
  endpoint: "/terminalSailingSpace/{TerminalID}",
  inputSchema: terminalSailingSpaceByTerminalIdInputSchema,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { TerminalID: 7 },
  endpointDescription:
    "Get sailing space availability for a specific terminal by ID.",
});
