import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { alertAreasGroup } from "./alertAreas/alertAreas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/eventCategories.endpoints";
import { highwayAlertsGroup } from "./highwayAlerts/highwayAlerts.endpoints";

// Finally, construct full API definition using API constant
export const wsdotHighwayAlertsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
} satisfies ApiDefinition;
