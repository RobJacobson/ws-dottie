import { z } from "zod";
import {
  sailingResponseSchema,
  sailingResponsesArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getAllSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;

export { sailingResponseSchema, sailingResponsesArraySchema };
export const sailingsArraySchema = sailingResponsesArraySchema;
export type AllSailings = z.infer<typeof sailingsArraySchema>;

export const getAllSailings = zodFetch<GetAllSailingsParams, AllSailings>(
  "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
  getAllSailingsParamsSchema,
  sailingsArraySchema
);

export const allSailingsOptions = createQueryOptions({
  apiFunction: getAllSailings,
  queryKey: ["wsf", "schedule", "allSailings", "getAllSailings"],
  cacheStrategy: "DAILY_STATIC",
});
