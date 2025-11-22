import type { ApiDefinition } from "@/apis/types";
import { wsdotTravelTimesApiMeta } from "./apiMeta";
import { travelTimeRoutesGroup } from "./travelTimeRoutes/shared/travelTimeRoutes.endpoints";

export const wsdotTravelTimes: ApiDefinition = {
  api: wsdotTravelTimesApiMeta,
  endpointGroups: [travelTimeRoutesGroup],
};
