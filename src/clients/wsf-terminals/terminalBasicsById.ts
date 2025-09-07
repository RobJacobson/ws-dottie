import { z } from "zod";
import {
  type TerminalBasics,
  terminalBasicsSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBasicsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;

export const getTerminalBasicsByTerminalId = async (
  params: GetTerminalBasicsByTerminalIdParams
): Promise<TerminalBasics> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalbasics/{terminalId}",
    inputSchema: getTerminalBasicsByTerminalIdParamsSchema,
    outputSchema: terminalBasicsSchema,
    params,
  });

export const terminalBasicsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalBasicsByTerminalId,
  queryKey: ["wsf", "terminals", "basics", "getTerminalBasicsByTerminalId"],
  cacheStrategy: "DAILY_STATIC",
});
