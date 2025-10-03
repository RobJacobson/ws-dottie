import type { ApiDefinition } from "@/shared/endpoints";
import { input, output } from "./schemas";

export const wsdotBorderCrossingsApi: ApiDefinition = {
  name: "wsdot-border-crossings",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/bordercrossings/bordercrossingsrest.svc",
  endpoints: [
    {
      function: "getBorderCrossings",
      endpoint: "/getBorderCrossingsAsJson",
      inputSchema: input.getBorderCrossingsSchema,
      outputSchema: output.borderCrossingDataListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
  ],
};
