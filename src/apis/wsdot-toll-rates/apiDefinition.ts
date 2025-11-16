import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { tollRatesGroup } from "./tollRates/tollRates.endpoints";
import { tollTripInfoGroup } from "./tollTripInfo/tollTripInfo.endpoints";
import { tollTripRatesGroup } from "./tollTripRates/tollTripRates.endpoints";
import { tollTripVersionGroup } from "./tollTripVersion/tollTripVersion.endpoints";

export const wsdotTollRatesApi = {
  api: apis.wsdotTollRates,
  endpointGroups: [
    tollRatesGroup,
    tollTripInfoGroup,
    tollTripRatesGroup,
    tollTripVersionGroup,
  ],
} satisfies ApiDefinition;
