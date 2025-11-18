import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for weather readings endpoints
 */
export const weatherReadingsGroup: EndpointGroupMeta = {
  name: "weather-readings",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Comprehensive weather readings from all WSDOT weather stations statewide.",
    description:
      "Complete weather data including air temperature, humidity, wind conditions, visibility, precipitation across multiple time periods, barometric pressure, snow depth, and surface/subsurface sensor measurements.",
    useCases: [
      "Access complete weather station data for comprehensive analysis.",
      "Monitor atmospheric and surface conditions for transportation operations.",
      "Track precipitation across multiple time periods (1h, 3h, 6h, 12h, 24h).",
    ],
    updateFrequency: "5m",
  },
};
