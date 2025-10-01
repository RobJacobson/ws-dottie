import { z } from "zod";

import {
  scheduleTerminalComboSchema,
  type TerminalCombo,
} from "@/schemas/wsf-fares/terminalCombo.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalCombo */
const faresTerminalComboInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  DepartingTerminalID: z.number().int().positive(),
  ArrivingTerminalID: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalCombo */
export const getFaresTerminalComboMeta: EndpointDefinition<
  FaresTerminalComboInput,
  TerminalCombo
> = {
  api: "wsf-fares",
  function: "terminalCombo",
  endpoint:
    "/ferries/api/fares/rest/terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: faresTerminalComboInput,
  outputSchema: scheduleTerminalComboSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalComboInput = z.infer<typeof faresTerminalComboInput>;
