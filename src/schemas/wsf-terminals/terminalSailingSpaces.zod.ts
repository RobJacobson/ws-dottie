import { z } from "zod";
import { terminalSailingSpaceSchema } from "./terminalSailingSpace.zod";

/**
 * Array of terminal sailing spaces
 *
 * Terminal condition data (the number of drive-up and reservation spaces available for select departures).
 */
export const terminalSailingSpacesSchema = z
  .array(terminalSailingSpaceSchema)
  .describe(
    "Terminal condition data (the number of drive-up and reservation spaces available for select departures)."
  );

export type TerminalSailingSpaces = z.infer<typeof terminalSailingSpacesSchema>;
