import type { ApiDefinition } from "@/apis/types";
import { wsdotWeatherStationsApiMeta } from "./apiMeta";
import { weatherStationsGroup } from "./weatherStations/shared/weatherStations.endpoints";

export const wsdotWeatherStationsApi: ApiDefinition = {
  api: wsdotWeatherStationsApiMeta,
  endpointGroups: [weatherStationsGroup],
};
