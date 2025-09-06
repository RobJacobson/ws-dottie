import { z } from "zod";
import { terminalBasicsSchema } from "./terminalBasics.zod";
import { terminalBulletinsSchema } from "./terminalBulletins.zod";
import { terminalLocationSchema } from "./terminalLocation.zod";
import { terminalTransportsSchema } from "./terminalTransports.zod";
import { terminalWaitTimesSchema } from "./terminalWaitTimes.zod";

/**
 * Terminal verbose schema for WSF Terminals API
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should
 * be used if you need to reduce the "chattiness" of your application and don't mind
 * receiving a larger payload of data. The results include and expand on what's already
 * available through the following operations:
 *
 * - `/terminalbasics`
 * - `/terminalbasics/{TerminalID}`
 * - `/terminalbulletins`
 * - `/terminalbulletins/{TerminalID}`
 * - `/terminallocations`
 * - `/terminallocations/{TerminalID}`
 * - `/terminaltransports`
 * - `/terminaltransports/{TerminalID}`
 * - `/terminalwaittimes`
 * - `/terminalwaittimes/{TerminalID}`
 *
 * TerminalID, or unique terminal identifier, may be optionally passed to retrieve a
 * specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed
 * as part of the URL string.
 */
export const terminalVerboseSchema = terminalBasicsSchema
  .merge(terminalBulletinsSchema)
  .merge(terminalLocationSchema)
  .merge(terminalTransportsSchema)
  .merge(terminalWaitTimesSchema)
  .extend({
    /** An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares. */
    RealtimeIntroMsg: z
      .string()
      .nullable()
      .describe(
        "An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares."
      ),
  });

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;

export const terminalVerboseArraySchema = z.array(terminalVerboseSchema);
export type TerminalVerboseArray = z.infer<typeof terminalVerboseArraySchema>;
