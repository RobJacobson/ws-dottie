import { z } from "zod";
import { sailingResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getAllSailings */
export const getAllSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

/** GetAllSailings params type */
export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;

/** Endpoint definition for getAllSailings */
export const getAllSailingsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getAllSailings",
  endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
  inputSchema: getAllSailingsParamsSchema,
  outputSchema: sailingResponsesArraySchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
});
