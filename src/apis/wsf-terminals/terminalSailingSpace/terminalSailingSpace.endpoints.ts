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
    resourceDescription:
      "Contains terminal condition data including the number of drive-up and reservation spaces available for select departures. This real-time information helps travelers plan their ferry trips and understand space availability.",
    businessContext: "",
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
  endpointDescription:
    "Returns multiple TerminalSailingSpace objects for all terminals.",
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
    "Returns TerminalSailingSpace data for the terminal with the given identifier.",
});
