import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { weatherStationsGroup } from "./weatherStations/shared/weatherStations.endpoints";

export const wsdotWeatherStationsApi = {
  api: apis.wsdotWeatherStations,
  endpointGroups: [weatherStationsGroup],
} satisfies ApiDefinition;
