import { z } from "zod";
import {
  type TerminalSailingSpaceArray,
  terminalSailingSpaceArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalSailingSpaceParamsSchema = z.object({});

export type GetTerminalSailingSpaceParams = z.infer<
  typeof getTerminalSailingSpaceParamsSchema
>;

export type FaresTerminalSailingSpaces = TerminalSailingSpaceArray;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalsailingspace";

export const getTerminalSailingSpace = zodFetch<
  GetTerminalSailingSpaceParams,
  FaresTerminalSailingSpaces
>(
  ENDPOINT_ALL,
  getTerminalSailingSpaceParamsSchema,
  terminalSailingSpaceArraySchema
);

export const terminalSailingSpaceOptions = createQueryOptions({
  apiFunction: getTerminalSailingSpace,
  queryKey: ["wsf", "terminals", "sailingSpace", "getTerminalSailingSpace"],
  cacheStrategy: "DAILY_STATIC",
});
