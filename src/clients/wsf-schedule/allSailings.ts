import { z } from "zod";
import { sailingResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getAllSailings */
const getAllSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

/** GetAllSailings params type */

/** Endpoint definition for getAllSailings */
export const getAllSailingsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getAllSailings",
  endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
  inputSchema: getAllSailingsParamsSchema,
  outputSchema: sailingResponsesArraySchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
});
