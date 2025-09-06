import { z } from "zod";
import {
  type TerminalBulletins,
  terminalBulletinsSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBulletinsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";

export const getTerminalBulletinsByTerminalId = zodFetch<
  GetTerminalBulletinsByTerminalIdParams,
  TerminalBulletins
>(
  ENDPOINT_BY_ID,
  getTerminalBulletinsByTerminalIdParamsSchema,
  terminalBulletinsSchema
);

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
