import { z } from "zod";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalVerboseByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalVerboseByTerminalIdParams = z.infer<
  typeof getTerminalVerboseByTerminalIdParamsSchema
>;

export const getTerminalVerboseByTerminalId = async (
  params: GetTerminalVerboseByTerminalIdParams
): Promise<TerminalVerbose> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalverbose/{terminalId}",
    inputSchema: getTerminalVerboseByTerminalIdParamsSchema,
    outputSchema: terminalVerboseSchema,
    params,
  });

export const terminalVerboseByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalVerboseByTerminalId,
  queryKey: ["wsf", "terminals", "verbose", "getTerminalVerboseByTerminalId"],
  cacheStrategy: "DAILY_STATIC",
});
