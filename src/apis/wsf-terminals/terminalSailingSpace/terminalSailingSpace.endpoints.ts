import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  terminalSailingSpaceByTerminalIdInputSchema,
  terminalSailingSpaceInputSchema,
} from "./terminalSailingSpace.input";
import { terminalSailingSpaceSchema } from "./terminalSailingSpace.output";

const group = defineEndpointGroup({
  api: wsfTerminalsApi,
  name: "terminal-sailing-space",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Contains terminal condition data including the number of drive-up and reservation spaces available for select departures. This real-time information helps travelers plan their ferry trips and understand space availability.",
    businessContext: "",
  },
});

export const fetchTerminalSailingSpace = defineEndpoint({
  group,
  functionName: "fetchTerminalSailingSpace",
  definition: {
    endpoint: "/terminalSailingSpace",
    inputSchema: terminalSailingSpaceInputSchema,
    outputSchema: terminalSailingSpaceSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple TerminalSailingSpace objects for all terminals.",
  },
});

export const fetchTerminalSailingSpaceByTerminalId = defineEndpoint({
  group,
  functionName: "fetchTerminalSailingSpaceByTerminalId",
  definition: {
    endpoint: "/terminalSailingSpace/{TerminalID}",
    inputSchema: terminalSailingSpaceByTerminalIdInputSchema,
    outputSchema: terminalSailingSpaceSchema,
    sampleParams: { TerminalID: 7 },
    endpointDescription:
      "Returns TerminalSailingSpace data for the terminal with the given identifier.",
  },
});

export const terminalSailingSpaceResource = group.descriptor;
