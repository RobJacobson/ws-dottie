import { z } from "zod";
import {
  type TerminalBulletins,
  terminalBulletinsSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBulletinsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;

export const getTerminalBulletinsByTerminalId = async (
  params: GetTerminalBulletinsByTerminalIdParams
): Promise<TerminalBulletins> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalbulletins/{terminalId}",
    inputSchema: getTerminalBulletinsByTerminalIdParamsSchema,
    outputSchema: terminalBulletinsSchema,
    params,
  });

export const terminalBulletinsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalBulletinsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "bulletins",
    "getTerminalBulletinsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
