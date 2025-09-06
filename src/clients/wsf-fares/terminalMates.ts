import { z } from "zod";
import { terminalMateSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFaresTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;

export const terminalMatesArraySchema = z.array(terminalMateSchema);
export type TerminalMates = z.infer<typeof terminalMatesArraySchema>;

const ENDPOINT =
  "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}";

export const getFaresTerminalMates = zodFetch<
  GetFaresTerminalMatesParams,
  TerminalMates
>(ENDPOINT, getFaresTerminalMatesParamsSchema, terminalMatesArraySchema);

export const terminalMatesOptions = createQueryOptions({
  apiFunction: getFaresTerminalMates,
  queryKey: ["wsf", "fares", "terminalmates", "getFaresTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
