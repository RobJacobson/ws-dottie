import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { travelTimeRoutesGroup } from "./travelTimeRoutes/travelTimeRoutes.endpoints";

export const wsdotTravelTimesApi = {
  api: apis.wsdotTravelTimes,
  endpointGroups: [travelTimeRoutesGroup],
} satisfies ApiDefinition;
