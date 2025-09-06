import { z } from "zod";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof getTerminalSailingSpaceByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}";

export const getTerminalSailingSpaceByTerminalId = zodFetch<
  GetTerminalSailingSpaceByTerminalIdParams,
  TerminalSailingSpace
>(
  ENDPOINT_BY_ID,
  getTerminalSailingSpaceByTerminalIdParamsSchema,
  terminalSailingSpaceSchema
);

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
