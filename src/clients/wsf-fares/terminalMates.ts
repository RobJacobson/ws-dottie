import { z } from "zod";

import {
  type TerminalMate,
  terminalMateSchema,
} from "@/schemas/wsf-fares/terminalMate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalMates */
const faresTerminalMatesInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  terminalId: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalMates */
export const getFaresTerminalMatesMeta: EndpointDefinition<
  FaresTerminalMatesInput,
  TerminalMate[]
> = {
  api: "wsf-fares",
  function: "terminalMates",
  endpoint: "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: faresTerminalMatesInput,
  outputSchema: z.array(terminalMateSchema),
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalMatesInput = z.infer<typeof faresTerminalMatesInput>;
