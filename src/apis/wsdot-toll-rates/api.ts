import type { ApiDefinition } from "@/apis/types";
import { wsdotTollRatesApiMeta } from "./apiMeta";
import { tollRatesGroup } from "./tollRates/shared/tollRates.endpoints";
import { tollTripInfoGroup } from "./tollTripInfo/shared/tollTripInfo.endpoints";
import { tollTripRatesGroup } from "./tollTripRates/shared/tollTripRates.endpoints";
import { tollTripVersionGroup } from "./tollTripVersion/shared/tollTripVersion.endpoints";

export const wsdotTollRates: ApiDefinition = {
  api: wsdotTollRatesApiMeta,
  endpointGroups: [
    tollRatesGroup,
    tollTripInfoGroup,
    tollTripRatesGroup,
    tollTripVersionGroup,
  ],
};
