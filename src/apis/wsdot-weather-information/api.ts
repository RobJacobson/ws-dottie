import type { ApiDefinition } from "@/apis/types";
import { wsdotWeatherInformationApiMeta } from "./apiMeta";
import { weatherInfoGroup } from "./weatherInfo/shared/weatherInfo.endpoints";

export const wsdotWeatherInformationApi: ApiDefinition = {
  api: wsdotWeatherInformationApiMeta,
  endpointGroups: [weatherInfoGroup],
};
