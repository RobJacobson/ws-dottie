import { z } from "zod";
import {
  type TerminalBulletinsArray,
  terminalBulletinsArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBulletinsParamsSchema = z.object({});

export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

export const getTerminalBulletins = async (
  params: GetTerminalBulletinsParams
): Promise<TerminalBulletinsArray> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminalbulletins",
    inputSchema: getTerminalBulletinsParamsSchema,
    outputSchema: terminalBulletinsArraySchema,
    params,
  });

export const terminalBulletinsOptions = createQueryOptions({
  apiFunction: getTerminalBulletins,
  queryKey: ["wsf", "terminals", "bulletins", "getTerminalBulletins"],
  cacheStrategy: "DAILY_STATIC",
});
