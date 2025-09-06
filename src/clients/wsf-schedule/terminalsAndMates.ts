import { z } from "zod";
import {
  type TerminalsAndMates,
  terminalsAndMatesSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

const ENDPOINT = "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";

export const getTerminalsAndMates = zodFetch<
  GetTerminalsAndMatesParams,
  TerminalsAndMates
>(ENDPOINT, getTerminalsAndMatesParamsSchema, terminalsAndMatesSchema);

export const terminalsAndMatesOptions = createQueryOptions({
  apiFunction: getTerminalsAndMates,
  queryKey: ["wsf", "schedule", "terminalsandmates", "getTerminalsAndMates"],
  cacheStrategy: "DAILY_STATIC",
});
