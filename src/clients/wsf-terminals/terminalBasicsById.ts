import { z } from "zod";
import {
  type TerminalBasics,
  terminalBasicsSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBasicsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbasics/{terminalId}";

export const getTerminalBasicsByTerminalId = zodFetch<
  GetTerminalBasicsByTerminalIdParams,
  TerminalBasics
>(
  ENDPOINT_BY_ID,
  getTerminalBasicsByTerminalIdParamsSchema,
  terminalBasicsSchema
);

export const terminalBasicsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalBasicsByTerminalId,
  queryKey: ["wsf", "terminals", "basics", "getTerminalBasicsByTerminalId"],
  cacheStrategy: "DAILY_STATIC",
});
