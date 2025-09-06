import { z } from "zod";
import {
  type TerminalBulletinsArray,
  terminalBulletinsArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalBulletinsParamsSchema = z.object({});

export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbulletins";

export const getTerminalBulletins = zodFetch<
  GetTerminalBulletinsParams,
  TerminalBulletinsArray
>(ENDPOINT_ALL, getTerminalBulletinsParamsSchema, terminalBulletinsArraySchema);

export const terminalBulletinsOptions = createQueryOptions({
  apiFunction: getTerminalBulletins,
  queryKey: ["wsf", "terminals", "bulletins", "getTerminalBulletins"],
  cacheStrategy: "DAILY_STATIC",
});
