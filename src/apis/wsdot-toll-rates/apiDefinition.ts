import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { tollRatesGroup } from "./tollRates/shared/tollRates.endpoints";
import { tollTripInfoGroup } from "./tollTripInfo/shared/tollTripInfo.endpoints";
import { tollTripRatesGroup } from "./tollTripRates/shared/tollTripRates.endpoints";
import { tollTripVersionGroup } from "./tollTripVersion/shared/tollTripVersion.endpoints";

export const wsdotTollRatesApi = {
  api: apis.wsdotTollRates,
  endpointGroups: [
    tollRatesGroup,
    tollTripInfoGroup,
    tollTripRatesGroup,
    tollTripVersionGroup,
  ],
} satisfies ApiDefinition;
