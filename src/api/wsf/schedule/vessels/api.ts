// Schedule vessels API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { Vessel } from "../../vessels/types";

/**
 * API function for fetching all vessels from WSF Schedule API
 */
export const getVessels = (): Promise<Vessel[]> =>
  fetchWsfArray<Vessel>("schedule", "/vessels");

/**
 * API function for fetching vessels by route from WSF Schedule API
 */
export const getVesselsByRoute = (routeID: number): Promise<Vessel[]> =>
  fetchWsfArray<Vessel>(
    "schedule",
    buildWsfUrl("/vessels/{routeID}", { routeID })
  );
