import type { ApiDefinition } from "@/apis/types";
import { wsdotBorderCrossingsApiMeta } from "./apiMeta";
import { borderCrossingDataGroup } from "./borderCrossingData/shared/borderCrossingData.endpoints";

export const wsdotBorderCrossingsApi: ApiDefinition = {
  api: wsdotBorderCrossingsApiMeta,
  endpointGroups: [borderCrossingDataGroup],
};
