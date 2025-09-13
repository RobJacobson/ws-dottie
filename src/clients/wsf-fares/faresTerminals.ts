import { z } from "zod";
import { faresTerminalSchema } from "@/schemas/wsf-fares";
import type { FaresTerminal } from "@/schemas/wsf-fares/faresTerminal.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminals */
const faresTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getFaresTerminals */
export const getFaresTerminalsMeta: Endpoint<
  FaresTerminalsInput,
  FaresTerminal[]
> = {
  api: "wsf-fares",
  function: "getFaresTerminals",
  endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
  inputSchema: faresTerminalsInput,
  outputSchema: z.array(faresTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FaresTerminalsInput = z.infer<typeof faresTerminalsInput>;
