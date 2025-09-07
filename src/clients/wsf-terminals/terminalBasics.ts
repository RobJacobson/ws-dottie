import { z } from "zod";
import {
  type TerminalBasicsArray,
  terminalBasicsArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBasicsParamsSchema = z.object({});

export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

export const getTerminalBasics = async (
  params: GetTerminalBasicsParams
): Promise<TerminalBasicsArray> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalbasics",
    inputSchema: getTerminalBasicsParamsSchema,
    outputSchema: terminalBasicsArraySchema,
    params,
  });

export const terminalBasicsOptions = createQueryOptions({
  apiFunction: getTerminalBasics,
  queryKey: ["wsf", "terminals", "basics", "getTerminalBasics"],
  cacheStrategy: "DAILY_STATIC",
});
