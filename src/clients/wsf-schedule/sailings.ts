import { z } from "zod";
import { sailingResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getSailings */
export const getSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

/** GetSailings params type */
export type GetSailingsParams = z.infer<typeof getSailingsParamsSchema>;

/** Endpoint definition for getSailings */
export const getSailingsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getSailings",
  endpoint: "/ferries/api/schedule/rest/sailings/{schedRouteId}",
  inputSchema: getSailingsParamsSchema,
  outputSchema: sailingResponsesArraySchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
});
