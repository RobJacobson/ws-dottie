import { z } from "zod";
import {
  type TerminalLocationArray,
  terminalLocationArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalLocationsParamsSchema = z.object({});

export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminallocations";

export const getTerminalLocations = zodFetch<
  GetTerminalLocationsParams,
  TerminalLocationArray
>(ENDPOINT_ALL, getTerminalLocationsParamsSchema, terminalLocationArraySchema);

export const terminalLocationsOptions = createQueryOptions({
  apiFunction: getTerminalLocations,
  queryKey: ["wsf", "terminals", "locations", "getTerminalLocations"],
  cacheStrategy: "DAILY_STATIC",
});
