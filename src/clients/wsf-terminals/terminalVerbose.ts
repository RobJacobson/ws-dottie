import { z } from "zod";
import {
  type TerminalVerboseArray,
  terminalVerboseArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalVerboseParamsSchema = z.object({});

export type GetTerminalVerboseParams = z.infer<
  typeof getTerminalVerboseParamsSchema
>;

export type FaresTerminalVerboses = TerminalVerboseArray;

export const getTerminalVerbose = async (
  params: GetTerminalVerboseParams
): Promise<FaresTerminalVerboses> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalverbose",
    inputSchema: getTerminalVerboseParamsSchema,
    outputSchema: terminalVerboseArraySchema,
    params,
  });

export const terminalVerboseOptions = createQueryOptions({
  apiFunction: getTerminalVerbose,
  queryKey: ["wsf", "terminals", "verbose", "getTerminalVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
