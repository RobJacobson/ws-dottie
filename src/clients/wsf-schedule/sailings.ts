import { z } from "zod";
import {
  sailingResponsesArraySchema,
  type sailingsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

export type GetSailingsParams = z.infer<typeof getSailingsParamsSchema>;

export type Sailings = z.infer<typeof sailingsArraySchema>;
export type SailingsResponse = z.infer<typeof sailingResponsesArraySchema>;

const ENDPOINT = "/ferries/api/schedule/rest/sailings/{schedRouteId}";

export const getSailings = zodFetch<GetSailingsParams, SailingsResponse>(
  ENDPOINT,
  getSailingsParamsSchema,
  sailingResponsesArraySchema
);

export const sailingsOptions = createQueryOptions({
  apiFunction: getSailings,
  queryKey: ["wsf", "schedule", "sailings", "getSailings"],
  cacheStrategy: "DAILY_STATIC",
});
