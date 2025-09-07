import { z } from "zod";
import { terminalMateSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
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

export const getFaresTerminalMates = async (
  params: GetFaresTerminalMatesParams
): Promise<TerminalMates> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}",
    inputSchema: getFaresTerminalMatesParamsSchema,
    outputSchema: terminalMatesArraySchema,
    params,
  });

export const terminalMatesOptions = createQueryOptions({
  apiFunction: getFaresTerminalMates,
  queryKey: ["wsf", "fares", "terminalmates", "getFaresTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
