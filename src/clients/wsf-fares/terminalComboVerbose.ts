import { z } from "zod";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalComboVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;

export const terminalComboVerboseArraySchema = z.array(
  terminalComboVerboseItemSchema
);
export type TerminalComboVerbose = z.infer<
  typeof terminalComboVerboseArraySchema
>;

const ENDPOINT = "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}";

export const getTerminalComboVerbose = zodFetch<
  GetTerminalComboVerboseParams,
  TerminalComboVerbose
>(
  ENDPOINT,
  getTerminalComboVerboseParamsSchema,
  terminalComboVerboseArraySchema
);

export const terminalComboVerboseOptions = createQueryOptions({
  apiFunction: getTerminalComboVerbose,
  queryKey: ["wsf", "fares", "terminalcomboverbose", "getTerminalComboVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
