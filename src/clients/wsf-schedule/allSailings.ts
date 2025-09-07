import { z } from "zod";
import {
  sailingResponseSchema,
  sailingResponsesArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getAllSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;

export { sailingResponseSchema, sailingResponsesArraySchema };
export const sailingsArraySchema = sailingResponsesArraySchema;
export type AllSailings = z.infer<typeof sailingsArraySchema>;

export const getAllSailings = async (
  params: GetAllSailingsParams
): Promise<AllSailings> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
    inputSchema: getAllSailingsParamsSchema,
    outputSchema: sailingsArraySchema,
    params,
  });

export const allSailingsOptions = createQueryOptions({
  apiFunction: getAllSailings,
  queryKey: ["wsf", "schedule", "allSailings", "getAllSailings"],
  cacheStrategy: "DAILY_STATIC",
});
