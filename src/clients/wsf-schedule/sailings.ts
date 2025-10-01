import { z } from "zod";

import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getSailings */
const sailingsInput = z.object({
  SchedRouteID: z.number().int().positive(),
});

/** Endpoint metadata for getSailings */
export const getSailingsMeta: EndpointDefinition<
  SailingsInput,
  SailingResponse[]
> = {
  api: "wsf-schedule",
  function: "sailings",
  endpoint: "/ferries/api/schedule/rest/sailings/{SchedRouteID}",
  inputSchema: sailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { SchedRouteID: 2327 },
  cacheStrategy: "STATIC",
};

// Type exports
export type SailingsInput = z.infer<typeof sailingsInput>;
