import { z } from "zod";
import {
  type TerminalVerboseArray,
  terminalVerboseArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalVerboseParamsSchema = z.object({});

export type GetTerminalVerboseParams = z.infer<
  typeof getTerminalVerboseParamsSchema
>;

export type FaresTerminalVerboses = TerminalVerboseArray;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalverbose";

export const getTerminalVerbose = zodFetch<
  GetTerminalVerboseParams,
  FaresTerminalVerboses
>(ENDPOINT_ALL, getTerminalVerboseParamsSchema, terminalVerboseArraySchema);

export const terminalVerboseOptions = createQueryOptions({
  apiFunction: getTerminalVerbose,
  queryKey: ["wsf", "terminals", "verbose", "getTerminalVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
