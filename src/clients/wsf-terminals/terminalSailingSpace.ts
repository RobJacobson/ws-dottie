import { z } from "zod";
import {
  type TerminalSailingSpaceArray,
  terminalSailingSpaceArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalSailingSpaceParamsSchema = z.object({});

export type GetTerminalSailingSpaceParams = z.infer<
  typeof getTerminalSailingSpaceParamsSchema
>;

export type FaresTerminalSailingSpaces = TerminalSailingSpaceArray;

export const getTerminalSailingSpace = async (
  params: GetTerminalSailingSpaceParams
): Promise<FaresTerminalSailingSpaces> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
    inputSchema: getTerminalSailingSpaceParamsSchema,
    outputSchema: terminalSailingSpaceArraySchema,
    params,
  });

export const terminalSailingSpaceOptions = createQueryOptions({
  apiFunction: getTerminalSailingSpace,
  queryKey: ["wsf", "terminals", "sailingSpace", "getTerminalSailingSpace"],
  cacheStrategy: "DAILY_STATIC",
});
