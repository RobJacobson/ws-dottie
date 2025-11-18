import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { alertAreasGroup } from "./alertAreas/shared/alertAreas.endpoints";
import { eventCategoriesGroup } from "./eventCategories/shared/eventCategories.endpoints";
import { highwayAlertsGroup } from "./highwayAlerts/shared/highwayAlerts.endpoints";

export const wsdotHighwayAlertsApi = {
  api: apis.wsdotHighwayAlerts,
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
} satisfies ApiDefinition;
