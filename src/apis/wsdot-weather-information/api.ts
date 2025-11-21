import type { ApiDefinition } from "@/apis/types";
import { wsdotWeatherInformationApiMeta } from "./apiMeta";
import { weatherInfoGroup } from "./weatherInfo/shared/weatherInfo.endpoints";

export const wsdotWeatherInformation: ApiDefinition = {
  api: wsdotWeatherInformationApiMeta,
  endpointGroups: [weatherInfoGroup],
};
