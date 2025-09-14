import { z } from "zod";
import {
  type FaresTerminal,
  faresTerminalSchema,
} from "@/schemas/wsf-fares/faresTerminal.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminals */
const faresTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getFaresTerminals */
export const getFaresTerminalsMeta: EndpointMeta<
  FaresTerminalsInput,
  FaresTerminal[]
> = {
  id: "wsf-fares/faresTerminals",
  endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
  inputSchema: faresTerminalsInput,
  outputSchema: z.array(faresTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FaresTerminalsInput = z.infer<typeof faresTerminalsInput>;
