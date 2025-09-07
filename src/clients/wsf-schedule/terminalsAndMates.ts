import { z } from "zod";
import {
  type TerminalsAndMates,
  terminalsAndMatesSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

export const getTerminalsAndMates = async (
  params: GetTerminalsAndMatesParams
): Promise<TerminalsAndMates> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/terminalsandmates/{tripDate}",
    inputSchema: getTerminalsAndMatesParamsSchema,
    outputSchema: terminalsAndMatesSchema,
    params,
  });

export const terminalsAndMatesOptions = createQueryOptions({
  apiFunction: getTerminalsAndMates,
  queryKey: ["wsf", "schedule", "terminalsandmates", "getTerminalsAndMates"],
  cacheStrategy: "DAILY_STATIC",
});
