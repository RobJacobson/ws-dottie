import { z } from "zod";
import { scheduleTerminalComboSchema } from "@/schemas/wsf-fares";
import type { TerminalCombo } from "@/schemas/wsf-fares/terminalCombo.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalCombo */
const faresTerminalComboInput = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalCombo */
export const getFaresTerminalComboMeta: Endpoint<
  FaresTerminalComboInput,
  TerminalCombo
> = {
  api: "wsf-fares",
  function: "getFaresTerminalCombo",
  endpoint:
    "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: faresTerminalComboInput,
  outputSchema: scheduleTerminalComboSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FaresTerminalComboInput = z.infer<typeof faresTerminalComboInput>;
