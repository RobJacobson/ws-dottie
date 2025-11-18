import type { ApiDefinition } from "@/apis/types";
import { travelTimeRoutesGroup } from "./travelTimeRoutes/shared/travelTimeRoutes.endpoints";

export const wsdotTravelTimesApi: ApiDefinition = {
  api: {
    name: "wsdot-travel-times",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  },
  endpointGroups: [travelTimeRoutesGroup],
};
