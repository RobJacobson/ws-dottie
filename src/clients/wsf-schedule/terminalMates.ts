import { z } from "zod";

import type { TerminalMatesForTerminal } from "@/schemas/wsf-schedule/terminalMatesForTerminal.zod";
import { terminalMatesForTerminalsSchema } from "@/schemas/wsf-schedule/terminalMatesForTerminal.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalMates */
const terminalMatesInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  TerminalID: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalMates */
export const getTerminalMatesMeta: EndpointDefinition<
  TerminalMatesInput,
  TerminalMatesForTerminal[]
> = {
  api: "wsf-schedule",
  function: "terminalMates",
  endpoint: "/ferries/api/schedule/rest/terminalmates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInput,
  outputSchema: terminalMatesForTerminalsSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalMatesInput = z.infer<typeof terminalMatesInput>;
