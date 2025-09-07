import { z } from "zod";
import {
  scheduleTerminalComboSchema,
  type TerminalCombo,
} from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getFaresTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetFaresTerminalComboParams = z.infer<
  typeof getFaresTerminalComboParamsSchema
>;

export const getFaresTerminalCombo = async (
  params: GetFaresTerminalComboParams
): Promise<TerminalCombo> =>
  zodFetch({
    endpoint:
      "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
    inputSchema: getFaresTerminalComboParamsSchema,
    outputSchema: scheduleTerminalComboSchema,
    params,
  });

export const terminalComboOptions = createQueryOptions({
  apiFunction: getFaresTerminalCombo,
  queryKey: ["wsf", "fares", "terminalcombo", "getFaresTerminalCombo"],
  cacheStrategy: "DAILY_STATIC",
});
