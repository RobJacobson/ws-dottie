import { z } from "zod";
import {
  type TerminalWaitTimes,
  terminalWaitTimesSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalWaitTimesByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof getTerminalWaitTimesByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}";

export const getTerminalWaitTimesByTerminalId = zodFetch<
  GetTerminalWaitTimesByTerminalIdParams,
  TerminalWaitTimes
>(
  ENDPOINT_BY_ID,
  getTerminalWaitTimesByTerminalIdParamsSchema,
  terminalWaitTimesSchema
);

export const terminalWaitTimesByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalWaitTimesByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "waitTimes",
    "getTerminalWaitTimesByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
