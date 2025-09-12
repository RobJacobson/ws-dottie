import { z } from "zod";
import { sailingResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getSailings */
const getSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

/** GetSailings params type */

/** Endpoint definition for getSailings */
export const getSailingsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getSailings",
  endpoint: "/ferries/api/schedule/rest/sailings/{schedRouteId}",
  inputSchema: getSailingsParamsSchema,
  outputSchema: sailingResponsesArraySchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
});
