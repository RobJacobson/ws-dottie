import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { borderCrossingDataGroup } from "./borderCrossingData/borderCrossingData.endpoints";

export const wsdotBorderCrossingsApi = {
  api: apis.wsdotBorderCrossings,
  endpointGroups: [borderCrossingDataGroup],
} satisfies ApiDefinition;
