import { z } from "zod";
import {
  type TerminalBasicsArray,
  terminalBasicsArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBasicsParamsSchema = z.object({});

export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbasics";

export const getTerminalBasics = zodFetch<
  GetTerminalBasicsParams,
  TerminalBasicsArray
>(ENDPOINT_ALL, getTerminalBasicsParamsSchema, terminalBasicsArraySchema);

export const terminalBasicsOptions = createQueryOptions({
  apiFunction: getTerminalBasics,
  queryKey: ["wsf", "terminals", "basics", "getTerminalBasics"],
  cacheStrategy: "DAILY_STATIC",
});
