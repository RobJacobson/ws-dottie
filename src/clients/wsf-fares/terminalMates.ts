import { z } from "zod";

import {
  type TerminalMate,
  terminalMateSchema,
} from "@/schemas/wsf-fares/terminalMate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalMates */
const faresTerminalMatesInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  TerminalID: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalMates */
export const getFaresTerminalMatesMeta: EndpointDefinition<
  FaresTerminalMatesInput,
  TerminalMate[]
> = {
  api: "wsf-fares",
  function: "terminalMates",
  endpoint: "/ferries/api/fares/rest/terminalmates/{TripDate}/{TerminalID}",
  inputSchema: faresTerminalMatesInput,
  outputSchema: z.array(terminalMateSchema),
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalMatesInput = z.infer<typeof faresTerminalMatesInput>;
