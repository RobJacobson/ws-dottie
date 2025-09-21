import { z } from "zod";

import {
  scheduleTerminalComboSchema,
  type TerminalCombo,
} from "@/schemas/wsf-fares/terminalCombo.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalCombo */
const faresTerminalComboInput = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalCombo */
export const getFaresTerminalComboMeta: EndpointDefinition<
  FaresTerminalComboInput,
  TerminalCombo
> = {
  id: "wsf-fares/terminalCombo",
  endpoint:
    "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: faresTerminalComboInput,
  outputSchema: scheduleTerminalComboSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalComboInput = z.infer<typeof faresTerminalComboInput>;
