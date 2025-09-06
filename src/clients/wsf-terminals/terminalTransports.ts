import { z } from "zod";
import {
  type TerminalTransportsArray,
  terminalTransportsArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalTransportsParamsSchema = z.object({});

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminaltransports";

export const getTerminalTransports = zodFetch<
  GetTerminalTransportsParams,
  TerminalTransportsArray
>(
  ENDPOINT_ALL,
  getTerminalTransportsParamsSchema,
  terminalTransportsArraySchema
);

export const terminalTransportsOptions = createQueryOptions({
  apiFunction: getTerminalTransports,
  queryKey: ["wsf", "terminals", "transports", "getTerminalTransports"],
  cacheStrategy: "DAILY_STATIC",
});
