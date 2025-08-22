import { z } from "zod";

import { zodFetch } from "@/shared/fetching";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminaltransports/{terminalId}";

/**
 * API function for fetching terminal transports for a specific terminal from WSF Terminals API
 *
 * Retrieves transportation information for a specific terminal identified by terminal ID,
 * including parking, shuttle services, and transit connections. This endpoint provides
 * comprehensive information about how to access the specified terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalTransport object containing transportation information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const transport = await getTerminalTransportsByTerminalId({ terminalId: 7 });
 * console.log(transport.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalTransportsByTerminalId = async (
  params: GetTerminalTransportsByTerminalIdParams
): Promise<TerminalTransport> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalTransportsByTerminalIdParamsSchema,
      output: terminalTransportSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalTransportsByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving transportation information for a specific terminal by ID."
  );

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalTransitLinkSchema = z.object({
  LinkName: z.string(),
  LinkURL: z.string(),
  SortSeq: z.number().nullable(),
});

export const terminalTransportSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  ParkingInfo: z.string(),
  ParkingShuttleInfo: z.string().nullable(),
  AirportInfo: z.string().nullable(),
  AirportShuttleInfo: z.string().nullable(),
  MotorcycleInfo: z.string(),
  TruckInfo: z.string(),
  BikeInfo: z.string().nullable(),
  TrainInfo: z.string().nullable(),
  TaxiInfo: z.string().nullable(),
  HovInfo: z.string().nullable(),
  TransitLinks: z.array(terminalTransitLinkSchema),
});

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;
