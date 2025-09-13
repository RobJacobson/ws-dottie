import { z } from "zod";
import { terminalMateSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFaresTerminalMates */
const faresTerminalMatesInput = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** Endpoint metadata for getFaresTerminalMates */
export const getFaresTerminalMatesMeta = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresTerminalMates",
  endpoint: "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: faresTerminalMatesInput,
  outputSchema: z.array(terminalMateSchema),
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type FaresTerminalMatesInput = z.infer<typeof faresTerminalMatesInput>;
