import { z } from "zod";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalVerboseByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalVerboseByTerminalIdParams = z.infer<
  typeof getTerminalVerboseByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalverbose/{terminalId}";

export const getTerminalVerboseByTerminalId = zodFetch<
  GetTerminalVerboseByTerminalIdParams,
  TerminalVerbose
>(
  ENDPOINT_BY_ID,
  getTerminalVerboseByTerminalIdParamsSchema,
  terminalVerboseSchema
);

export const terminalVerboseByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalVerboseByTerminalId,
  queryKey: ["wsf", "terminals", "verbose", "getTerminalVerboseByTerminalId"],
  cacheStrategy: "DAILY_STATIC",
});
