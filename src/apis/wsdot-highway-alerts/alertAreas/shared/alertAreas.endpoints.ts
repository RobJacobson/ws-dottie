import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for alert areas endpoints
 */
export const alertAreasGroup: EndpointGroupMeta = {
  name: "alertAreas",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Geographic map areas for filtering highway alerts by region.",
    description:
      "Area codes and names used to organize and filter highway alerts across Washington State geographic regions.",
    useCases: [
      "Filter highway alerts by geographic map area.",
      "Obtain valid area codes for alert queries.",
      "Display regional alert organization in user interfaces.",
    ],
    updateFrequency: "5m",
  },
};
