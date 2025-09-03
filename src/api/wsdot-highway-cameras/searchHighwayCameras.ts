import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// Import schemas and types from co-located file
import { cameraSchema } from "./highwayCameras";

// ============================================================================
// API Function
//
// searchHighwayCameras
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson";

export const searchHighwayCameras = async (
  params: SearchHighwayCamerasParams
): Promise<Cameras> => {
  // Build query string by including only defined values
  const queryParams = new URLSearchParams();
  if (params.StateRoute !== undefined)
    queryParams.append("StateRoute", String(params.StateRoute));
  if (params.Region !== undefined)
    queryParams.append("Region", String(params.Region));
  if (params.StartingMilepost !== undefined)
    queryParams.append("StartingMilepost", String(params.StartingMilepost));
  if (params.EndingMilepost !== undefined)
    queryParams.append("EndingMilepost", String(params.EndingMilepost));

  const endpoint = `${ENDPOINT_BASE}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: searchHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

// ============================================================================
// Input Schema & Types
//
// searchHighwayCamerasParamsSchema
// SearchHighwayCamerasParams
// ============================================================================

export const searchHighwayCamerasParamsSchema = z
  .object({
    StateRoute: z.string().optional(),

    Region: z.string().optional(),

    StartingMilepost: z.number().optional(),

    EndingMilepost: z.number().optional(),
  })
  .strict();

export type SearchHighwayCamerasParams = z.infer<
  typeof searchHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// cameraArraySchema
// ============================================================================

export const cameraArraySchema = z.array(cameraSchema);

export type Cameras = z.infer<typeof cameraArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useSearchHighwayCameras
// ============================================================================

export const searchHighwayCamerasOptions = (
  params: SearchHighwayCamerasParams
) =>
  queryOptions({
    queryKey: ["wsdot", "highway-cameras", "searchHighwayCameras", params],
    queryFn: () => searchHighwayCameras(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
