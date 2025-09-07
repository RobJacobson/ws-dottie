import { z } from "zod";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalLocationsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;

export const getTerminalLocationsByTerminalId = async (
  params: GetTerminalLocationsByTerminalIdParams
): Promise<TerminalLocation> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminallocations/{terminalId}",
    inputSchema: getTerminalLocationsByTerminalIdParamsSchema,
    outputSchema: terminalLocationSchema,
    params,
  });

export const terminalLocationsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalLocationsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "locations",
    "getTerminalLocationsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
