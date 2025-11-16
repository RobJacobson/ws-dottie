import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { alertAreasGroup } from "./alertAreas/alertAreas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/eventCategories.endpoints";
import { highwayAlertsGroup } from "./highwayAlerts/highwayAlerts.endpoints";

export const wsdotHighwayAlertsApi = {
  api: apis.wsdotHighwayAlerts,
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
} satisfies ApiDefinition;
