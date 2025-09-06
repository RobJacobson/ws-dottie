import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  faresTerminalSchema as faresFaresTerminalSchema,
  faresTerminalsSchema as faresFaresTerminalsArraySchema,
  type FaresTerminal as FaresFaresTerminal,
} from "@/schemas/wsf-fares";
import {
  terminalMateSchema,
  terminalMatesSchema as terminalMatesArraySchema,
  type TerminalMate as FaresTerminalMate,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFaresFaresTerminalsParamsSchema
// GetFaresFaresTerminalsParams
// getFaresFaresTerminalMatesParamsSchema
// GetFaresFaresTerminalMatesParams
// ============================================================================

export const getFaresFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFaresFaresTerminalsParams = z.infer<
  typeof getFaresFaresTerminalsParamsSchema
>;

export const getFaresFaresTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalID: z.number().int().positive(),
});

export type GetFaresFaresTerminalMatesParams = z.infer<
  typeof getFaresFaresTerminalMatesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// faresFaresTerminalSchema (imported from terminals.zod)
// FaresFaresTerminal (imported from terminals.zod)
// terminalMateSchema (imported from terminalMates.zod)
// FaresTerminalMate (imported from terminalMates.zod)
// ============================================================================

export type FaresFaresTerminals = z.infer<
  typeof faresFaresTerminalsArraySchema
>;
export type FaresTerminalMates = z.infer<typeof terminalMatesArraySchema>;

// ============================================================================
// API Functions
//
// getFaresFaresTerminals (valid departing terminals)
// getFaresFaresTerminalMates (arriving terminals for a departing terminal)
// ============================================================================

const ENDPOINT_TERMINALS = "/ferries/api/fares/rest/terminals/{tripDate}";
const ENDPOINT_TERMINAL_MATES =
  "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalID}";

export const getFaresFaresTerminals = zodFetch<
  GetFaresFaresTerminalsParams,
  FaresFaresTerminals
>(
  ENDPOINT_TERMINALS,
  getFaresFaresTerminalsParamsSchema,
  faresFaresTerminalsArraySchema
);

export const getFaresFaresTerminalMates = zodFetch<
  GetFaresFaresTerminalMatesParams,
  FaresTerminalMates
>(
  ENDPOINT_TERMINAL_MATES,
  getFaresFaresTerminalMatesParamsSchema,
  terminalMatesArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresFaresTerminals
// useFaresFaresTerminalMates
// ============================================================================

export const faresFaresTerminalsOptions = createQueryOptions({
  apiFunction: getFaresFaresTerminals,
  queryKey: ["wsf", "fares", "terminals", "getFaresFaresTerminals"],
  cacheStrategy: "DAILY_STATIC",
});

export const faresFaresTerminalMatesOptions = createQueryOptions({
  apiFunction: getFaresFaresTerminalMates,
  queryKey: ["wsf", "fares", "terminals", "getFaresFaresTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
