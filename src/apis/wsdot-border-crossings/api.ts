import type { ApiDefinition } from "@/apis/types";
import { borderCrossingDataGroup } from "./borderCrossingData/shared/borderCrossingData.endpoints";

export const wsdotBorderCrossingsApi: ApiDefinition = {
  api: {
    name: "wsdot-border-crossings",
    baseUrl:
      "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  },
  endpointGroups: [borderCrossingDataGroup],
};
