import { z } from "zod";
import {
  scheduleTerminalComboSchema,
  type TerminalCombo,
} from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFaresTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetFaresTerminalComboParams = z.infer<
  typeof getFaresTerminalComboParamsSchema
>;

const ENDPOINT =
  "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";

export const getFaresTerminalCombo = zodFetch<
  GetFaresTerminalComboParams,
  TerminalCombo
>(ENDPOINT, getFaresTerminalComboParamsSchema, scheduleTerminalComboSchema);

export const terminalComboOptions = createQueryOptions({
  apiFunction: getFaresTerminalCombo,
  queryKey: ["wsf", "fares", "terminalcombo", "getFaresTerminalCombo"],
  cacheStrategy: "DAILY_STATIC",
});
