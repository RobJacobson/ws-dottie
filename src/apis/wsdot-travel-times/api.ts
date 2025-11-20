import type { ApiDefinition } from "@/apis/types";
import { wsdotTravelTimesApiMeta } from "./apiMeta";
import { travelTimeRoutesGroup } from "./travelTimeRoutes/shared/travelTimeRoutes.endpoints";

export const wsdotTravelTimesApi: ApiDefinition = {
  api: wsdotTravelTimesApiMeta,
  endpointGroups: [travelTimeRoutesGroup],
};
