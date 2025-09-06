import { z } from "zod";
import {
  type TerminalTransports,
  terminalTransportsSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalTransportsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminaltransports/{terminalId}";

export const getTerminalTransportsByTerminalId = zodFetch<
  GetTerminalTransportsByTerminalIdParams,
  TerminalTransports
>(
  ENDPOINT_BY_ID,
  getTerminalTransportsByTerminalIdParamsSchema,
  terminalTransportsSchema
);

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
