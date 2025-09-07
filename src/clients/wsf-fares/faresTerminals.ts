import { z } from "zod";
import { faresTerminalSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

export const faresTerminalsArraySchema = z.array(faresTerminalSchema);
export type FaresTerminals = z.infer<typeof faresTerminalsArraySchema>;

export const getFaresTerminals = async (
  params: GetFaresTerminalsParams
): Promise<FaresTerminals> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
    inputSchema: getFaresTerminalsParamsSchema,
    outputSchema: faresTerminalsArraySchema,
    params,
  });

export const terminalsOptions = createQueryOptions({
  apiFunction: getFaresTerminals,
  queryKey: ["wsf", "fares", "terminals", "getFaresTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
