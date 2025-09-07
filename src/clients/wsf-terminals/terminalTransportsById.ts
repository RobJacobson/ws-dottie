import { z } from "zod";
import {
  type TerminalTransports,
  terminalTransportsSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalTransportsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

export const getTerminalTransportsByTerminalId = async (
  params: GetTerminalTransportsByTerminalIdParams
): Promise<TerminalTransports> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminaltransports/{terminalId}",
    inputSchema: getTerminalTransportsByTerminalIdParamsSchema,
    outputSchema: terminalTransportsSchema,
    params,
  });

export const terminalTransportsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalTransportsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "transports",
    "getTerminalTransportsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
