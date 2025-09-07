import { z } from "zod";
import {
  type TerminalWaitTimesArray,
  terminalWaitTimesArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalWaitTimesParamsSchema = z.object({});

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

export const getTerminalWaitTimes = async (
  params: GetTerminalWaitTimesParams
): Promise<TerminalWaitTimesArray> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
    inputSchema: getTerminalWaitTimesParamsSchema,
    outputSchema: terminalWaitTimesArraySchema,
    params,
  });

export const terminalWaitTimesOptions = createQueryOptions({
  apiFunction: getTerminalWaitTimes,
  queryKey: ["wsf", "terminals", "waitTimes", "getTerminalWaitTimes"],
  cacheStrategy: "DAILY_STATIC",
});
