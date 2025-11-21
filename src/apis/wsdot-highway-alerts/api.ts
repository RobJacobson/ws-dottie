import type { ApiDefinition } from "@/apis/types";
import { alertAreasGroup } from "./alertAreas/shared/alertAreas.endpoints";
import { wsdotHighwayAlertsApiMeta } from "./apiMeta";
import { eventCategoriesGroup } from "./eventCategories/shared/eventCategories.endpoints";
import { highwayAlertsGroup } from "./highwayAlerts/shared/highwayAlerts.endpoints";

export const wsdotHighwayAlerts: ApiDefinition = {
  api: wsdotHighwayAlertsApiMeta,
  endpointGroups: [highwayAlertsGroup, alertAreasGroup, eventCategoriesGroup],
};
