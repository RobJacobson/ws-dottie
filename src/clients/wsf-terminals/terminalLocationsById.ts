import { z } from "zod";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalLocationsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminallocations/{terminalId}";

export const getTerminalLocationsByTerminalId = zodFetch<
  GetTerminalLocationsByTerminalIdParams,
  TerminalLocation
>(
  ENDPOINT_BY_ID,
  getTerminalLocationsByTerminalIdParamsSchema,
  terminalLocationSchema
);

export const terminalLocationsByFaresTerminalIdOptions = createQueryOptions({
  apiFunction: getTerminalLocationsByTerminalId,
  queryKey: [
    "wsf",
    "terminals",
    "locations",
    "getTerminalLocationsByTerminalId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
