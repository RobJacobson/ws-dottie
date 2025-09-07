import { z } from "zod";
import {
  type TerminalTransportsArray,
  terminalTransportsArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalTransportsParamsSchema = z.object({});

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

export const getTerminalTransports = async (
  params: GetTerminalTransportsParams
): Promise<TerminalTransportsArray> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminaltransports",
    inputSchema: getTerminalTransportsParamsSchema,
    outputSchema: terminalTransportsArraySchema,
    params,
  });

export const terminalTransportsOptions = createQueryOptions({
  apiFunction: getTerminalTransports,
  queryKey: ["wsf", "terminals", "transports", "getTerminalTransports"],
  cacheStrategy: "DAILY_STATIC",
});
