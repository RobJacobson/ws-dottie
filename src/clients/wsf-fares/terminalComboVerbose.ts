import { z } from "zod";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
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

export const getTerminalComboVerbose = async (
  params: GetTerminalComboVerboseParams
): Promise<TerminalComboVerbose> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
    inputSchema: getTerminalComboVerboseParamsSchema,
    outputSchema: terminalComboVerboseArraySchema,
    params,
  });

export const terminalComboVerboseOptions = createQueryOptions({
  apiFunction: getTerminalComboVerbose,
  queryKey: ["wsf", "fares", "terminalcomboverbose", "getTerminalComboVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
