import { z } from "zod";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof getTerminalSailingSpaceByTerminalIdParamsSchema
>;

export const getTerminalSailingSpaceByTerminalId = async (
  params: GetTerminalSailingSpaceByTerminalIdParams
): Promise<TerminalSailingSpace> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}",
    inputSchema: getTerminalSailingSpaceByTerminalIdParamsSchema,
    outputSchema: terminalSailingSpaceSchema,
    params,
  });

export const terminalSailingSpaceByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalSailingSpaceByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "sailingSpace",
    "getTerminalSailingSpaceByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
