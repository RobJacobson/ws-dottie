import type { ApiMeta } from "@/apis/types";

/**
 * API metadata for WSDOT Travel Times API
 */
export const wsdotTravelTimesApiMeta: ApiMeta = {
  name: "wsdot-travel-times",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
};
