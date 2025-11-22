import type { ApiDefinition } from "@/apis/types";
import { wsdotWeatherStationsApiMeta } from "./apiMeta";
import { weatherStationsGroup } from "./weatherStations/shared/weatherStations.endpoints";

export const wsdotWeatherStations: ApiDefinition = {
  api: wsdotWeatherStationsApiMeta,
  endpointGroups: [weatherStationsGroup],
};
