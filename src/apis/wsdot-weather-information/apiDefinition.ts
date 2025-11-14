import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { weatherInfoGroup } from "./weatherInfo/weatherInfo.endpoints";

export const wsdotWeatherInformationApi = {
  api: apis.wsdotWeatherInformation,
  endpointGroups: [weatherInfoGroup],
} satisfies ApiDefinition;
