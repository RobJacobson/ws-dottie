import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalComboSchema,
  type TerminalCombo as FaresTerminalCombo,
} from "@/schemas/wsf-fares";
import {
  terminalComboVerboseSchema,
  type TerminalComboVerbose as FaresTerminalComboVerbose,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalComboParamsSchema
// getFaresTerminalComboVerboseParamsSchema
// GetFaresTerminalComboParams
// GetFaresTerminalComboVerboseParams
// ============================================================================

export const getFaresTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingFaresTerminalID: z.number().int().positive(),
  arrivingFaresTerminalID: z.number().int().positive(),
});

export const getFaresTerminalComboVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFaresTerminalComboParams = z.infer<
  typeof getFaresTerminalComboParamsSchema
>;

export type GetFaresTerminalComboVerboseParams = z.infer<
  typeof getFaresTerminalComboVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalComboSchema (imported from terminalCombo.zod)
// terminalComboVerboseSchema (imported from terminalComboVerbose.zod)
// FaresTerminalCombo (imported from terminalCombo.zod)
// FaresTerminalComboVerbose (imported from terminalComboVerbose.zod)
// ============================================================================

export type FaresTerminalComboVerboses = z.infer<
  typeof terminalComboVerboseSchema
>;

// ============================================================================
// API Functions
//
// getFaresTerminalCombo (singular item)
// getFaresTerminalComboVerbose (array)
// ============================================================================

const ENDPOINT_SINGULAR =
  "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingFaresTerminalID}/{arrivingFaresTerminalID}";
const ENDPOINT_ARRAY =
  "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}";

export const getFaresTerminalCombo = zodFetch<
  GetFaresTerminalComboParams,
  FaresTerminalCombo
>(ENDPOINT_SINGULAR, getFaresTerminalComboParamsSchema, terminalComboSchema);

export const getFaresTerminalComboVerbose = zodFetch<
  GetFaresTerminalComboVerboseParams,
  FaresTerminalComboVerboses
>(
  ENDPOINT_ARRAY,
  getFaresTerminalComboVerboseParamsSchema,
  terminalComboVerboseSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminalCombo (singular item)
// useFaresTerminalComboVerbose (array)
// ============================================================================

export const terminalComboOptions = createQueryOptions({
  apiFunction: getFaresTerminalCombo,
  queryKey: ["wsf", "fares", "terminalCombo", "getFaresTerminalCombo"],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalComboVerboseOptions = createQueryOptions({
  apiFunction: getFaresTerminalComboVerbose,
  queryKey: ["wsf", "fares", "terminalCombo", "getFaresTerminalComboVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
