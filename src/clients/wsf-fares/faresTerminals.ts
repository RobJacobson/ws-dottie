import { z } from "zod";
import { faresTerminalSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

export const faresTerminalsArraySchema = z.array(faresTerminalSchema);
export type FaresTerminals = z.infer<typeof faresTerminalsArraySchema>;

const ENDPOINT = "/ferries/api/fares/rest/terminals/{tripDate}";

export const getFaresTerminals = zodFetch<
  GetFaresTerminalsParams,
  FaresTerminals
>(ENDPOINT, getFaresTerminalsParamsSchema, faresTerminalsArraySchema);

export const terminalsOptions = createQueryOptions({
  apiFunction: getFaresTerminals,
  queryKey: ["wsf", "fares", "terminals", "getFaresTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
