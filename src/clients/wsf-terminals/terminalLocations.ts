import { z } from "zod";
import {
  type TerminalLocationArray,
  terminalLocationArraySchema,
} from "@/schemas/wsf-terminals";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalLocationsParamsSchema = z.object({});

export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

export const getTerminalLocations = async (
  params: GetTerminalLocationsParams
): Promise<TerminalLocationArray> =>
  zodFetch({
    endpoint: "/ferries/api/terminals/rest/terminallocations",
    inputSchema: getTerminalLocationsParamsSchema,
    outputSchema: terminalLocationArraySchema,
    params,
  });

export const terminalLocationsOptions = createQueryOptions({
  apiFunction: getTerminalLocations,
  queryKey: ["wsf", "terminals", "locations", "getTerminalLocations"],
  cacheStrategy: "DAILY_STATIC",
});
