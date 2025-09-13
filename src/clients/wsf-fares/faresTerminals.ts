import { z } from "zod";
import { faresTerminalSchema } from "@/schemas/wsf-fares";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminals */
const faresTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getFaresTerminals */
export const getFaresTerminalsMeta = {
  api: "wsf-fares",
  function: "getFaresTerminals",
  endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
  inputSchema: faresTerminalsInput,
  outputSchema: z.array(faresTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type FaresTerminalsInput = z.infer<typeof faresTerminalsInput>;
