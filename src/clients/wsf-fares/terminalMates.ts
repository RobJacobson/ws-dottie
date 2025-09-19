import { z } from "zod";

import {
  type TerminalMate,
  terminalMateSchema,
} from "@/schemas/wsf-fares/terminalMate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalMates */
const faresTerminalMatesInput = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalMates */
export const getFaresTerminalMatesMeta: EndpointDefinition<
  FaresTerminalMatesInput,
  TerminalMate[]
> = {
  id: "wsf-fares/terminalMates",
  endpoint: "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: faresTerminalMatesInput,
  outputSchema: z.array(terminalMateSchema),
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalMatesInput = z.infer<typeof faresTerminalMatesInput>;
