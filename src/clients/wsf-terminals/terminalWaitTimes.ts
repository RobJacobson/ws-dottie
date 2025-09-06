import { z } from "zod";
import {
  type TerminalWaitTimesArray,
  terminalWaitTimesArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalWaitTimesParamsSchema = z.object({});

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalwaittimes";

export const getTerminalWaitTimes = zodFetch<
  GetTerminalWaitTimesParams,
  TerminalWaitTimesArray
>(ENDPOINT_ALL, getTerminalWaitTimesParamsSchema, terminalWaitTimesArraySchema);

export const terminalWaitTimesOptions = createQueryOptions({
  apiFunction: getTerminalWaitTimes,
  queryKey: ["wsf", "terminals", "waitTimes", "getTerminalWaitTimes"],
  cacheStrategy: "DAILY_STATIC",
});
