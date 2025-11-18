import type { ApiDefinition } from "@/apis/types";
import { tollRatesGroup } from "./tollRates/shared/tollRates.endpoints";
import { tollTripInfoGroup } from "./tollTripInfo/shared/tollTripInfo.endpoints";
import { tollTripRatesGroup } from "./tollTripRates/shared/tollTripRates.endpoints";
import { tollTripVersionGroup } from "./tollTripVersion/shared/tollTripVersion.endpoints";

export const wsdotTollRatesApi: ApiDefinition = {
  api: {
    name: "wsdot-toll-rates",
    baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  },
  endpointGroups: [
    tollRatesGroup,
    tollTripInfoGroup,
    tollTripRatesGroup,
    tollTripVersionGroup,
  ],
};
