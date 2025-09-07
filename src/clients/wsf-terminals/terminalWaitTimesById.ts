import { z } from "zod";
import {
  type TerminalWaitTimes,
  terminalWaitTimesSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalWaitTimesByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof getTerminalWaitTimesByTerminalIdParamsSchema
>;

export const getTerminalWaitTimesByTerminalId = async (
  params: GetTerminalWaitTimesByTerminalIdParams
): Promise<TerminalWaitTimes> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}",
    inputSchema: getTerminalWaitTimesByTerminalIdParamsSchema,
    outputSchema: terminalWaitTimesSchema,
    params,
  });

export const terminalWaitTimesByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalWaitTimesByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "waitTimes",
    "getTerminalWaitTimesByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
