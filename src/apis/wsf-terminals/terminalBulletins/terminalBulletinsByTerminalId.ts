import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalBulletinsByIdInput,
  terminalBulletinsByIdInputSchema,
} from "./shared/terminalBulletins.input";
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./shared/terminalBulletins.output";

/**
 * Metadata for the fetchTerminalBulletinsByTerminalId endpoint
 */
export const terminalBulletinsByTerminalIdMeta = {
  functionName: "fetchTerminalBulletinsByTerminalId",
  endpoint: "/terminalBulletins/{TerminalID}",
  inputSchema: terminalBulletinsByIdInputSchema,
  outputSchema: terminalBulletinSchema,
  sampleParams: { TerminalID: 3 },
  endpointDescription:
    "Get bulletins and alerts for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get alerts, announcements, and service bulletins for a single terminal by its TerminalID.",
    useWhen: [
      "checking for alerts at a specific terminal you're interested in",
      "enriching terminal details with current bulletins",
      "minimizing payload when you only need one terminal's bulletins",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you need bulletins for multiple terminals (prefer fetchTerminalBulletins)",
    ],
    inputsHighlights:
      "TerminalID (get it from fetchTerminalBasics → TerminalID)",
    returns: "object — one terminal with its bulletins",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "Bulletins array: zero or more bulletin objects for this terminal",
      "Bulletin content: BulletinTitle, BulletinText (HTML-formatted), BulletinSortSeq",
      "Bulletin metadata: BulletinLastUpdated (timestamp), BulletinLastUpdatedSortable",
      "Large text: BulletinText contains HTML content that can be substantial",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalBulletinsByTerminalId",
    ],
  },
} satisfies EndpointMeta<TerminalBulletinsByIdInput, TerminalBulletin>;

/**
 * Factory result for terminal bulletins by terminal ID
 */
const terminalBulletinsByTerminalIdFactory = createFetchAndHook<
  TerminalBulletinsByIdInput,
  TerminalBulletin
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBulletinsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBulletins.endpoints").terminalBulletinsGroup,
});

/**
 * Fetch function and React Query hook for retrieving bulletins and alerts for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalBulletinsByTerminalId,
  hook: useTerminalBulletinsByTerminalId,
} = terminalBulletinsByTerminalIdFactory;
