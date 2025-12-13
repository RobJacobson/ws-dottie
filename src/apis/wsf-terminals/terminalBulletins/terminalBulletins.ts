import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalBulletinsInput,
  terminalBulletinsInputSchema,
} from "./shared/terminalBulletins.input";
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./shared/terminalBulletins.output";

/**
 * Metadata for the fetchTerminalBulletins endpoint
 */
export const terminalBulletinsMeta = {
  functionName: "fetchTerminalBulletins",
  endpoint: "/terminalBulletins",
  inputSchema: terminalBulletinsInputSchema,
  outputSchema: terminalBulletinSchema.array(),
  sampleParams: {},
  endpointDescription: "List bulletins and alerts for all terminals.",
  toolDescription: {
    purpose:
      "List alerts, announcements, and service bulletins for all terminals in the WSF system.",
    useWhen: [
      "checking for terminal-specific alerts and announcements",
      "building notification systems for terminal updates",
      "getting comprehensive bulletin overview across all terminals",
    ],
    avoidWhen: [
      "you only need bulletins for one terminal (prefer fetchTerminalBulletinsByTerminalId)",
      "you're not interested in bulletin content (prefer lighter endpoints)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per terminal",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "Bulletins array: contains zero or more bulletin objects per terminal",
      "Bulletin content: BulletinTitle, BulletinText (HTML-formatted, can be lengthy), BulletinSortSeq",
      "Bulletin metadata: BulletinLastUpdated (timestamp), BulletinLastUpdatedSortable (legacy format)",
      "Large text: BulletinText contains HTML content that can be substantial",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalBulletinsByTerminalId (for single terminal bulletins)",
    ],
  },
} satisfies EndpointMeta<TerminalBulletinsInput, TerminalBulletin[]>;

/**
 * Factory result for terminal bulletins
 */
const terminalBulletinsFactory = createFetchAndHook<
  TerminalBulletinsInput,
  TerminalBulletin[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBulletinsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBulletins.endpoints").terminalBulletinsGroup,
});

/**
 * Fetch function and React Query hook for retrieving bulletins and alerts for all terminals
 */
export const { fetch: fetchTerminalBulletins, hook: useTerminalBulletins } =
  terminalBulletinsFactory;
