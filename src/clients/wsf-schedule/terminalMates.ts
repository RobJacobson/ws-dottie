import { z } from "zod";

import type { TerminalMatesForTerminal } from "@/schemas/wsf-schedule/terminalMatesForTerminal.zod";
import { terminalMatesForTerminalsSchema } from "@/schemas/wsf-schedule/terminalMatesForTerminal.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalMates */
const terminalMatesInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  terminalId: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalMates */
export const getTerminalMatesMeta: EndpointDefinition<
  TerminalMatesInput,
  TerminalMatesForTerminal[]
> = {
  id: "wsf-schedule:terminalMates",
  endpoint: "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: terminalMatesInput,
  outputSchema: terminalMatesForTerminalsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalMatesInput = z.infer<typeof terminalMatesInput>;
