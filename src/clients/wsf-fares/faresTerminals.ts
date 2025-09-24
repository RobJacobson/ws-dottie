import { z } from "zod";

import {
  type FaresTerminal,
  faresTerminalSchema,
} from "@/schemas/wsf-fares/faresTerminal.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminals */
const faresTerminalsInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getFaresTerminals */
export const getFaresTerminalsMeta: EndpointDefinition<
  FaresTerminalsInput,
  FaresTerminal[]
> = {
  id: "wsf-fares:faresTerminals",
  endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
  inputSchema: faresTerminalsInput,
  outputSchema: z.array(faresTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalsInput = z.infer<typeof faresTerminalsInput>;
