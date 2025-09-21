import { z } from "zod";

import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getSailings */
const sailingsInput = z.object({
  schedRouteId: z.number().int().positive(),
});

/** Endpoint metadata for getSailings */
export const getSailingsMeta: EndpointDefinition<
  SailingsInput,
  SailingResponse[]
> = {
  id: "wsf-schedule/sailings",
  endpoint: "/ferries/api/schedule/rest/sailings/{schedRouteId}",
  inputSchema: sailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "STATIC",
};

// Type exports
export type SailingsInput = z.infer<typeof sailingsInput>;
