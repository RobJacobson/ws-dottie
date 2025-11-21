import type { ApiDefinition } from "@/apis/types";
import { wsdotBorderCrossingsApiMeta } from "./apiMeta";
import { borderCrossingDataGroup } from "./borderCrossingData/shared/borderCrossingData.endpoints";

export const wsdotBorderCrossings: ApiDefinition = {
  api: wsdotBorderCrossingsApiMeta,
  endpointGroups: [borderCrossingDataGroup],
};
