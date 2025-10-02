import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotMountainPassConditionsApi = createApiDefinition(
  "wsdot-mountain-pass-conditions",
  [
    {
      function: "getMountainPassCondition",
      endpoint:
        "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: input.getMountainPassConditionSchema,
      outputSchema: output.passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getMountainPassConditions",
      endpoint:
        "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson",
      inputSchema: input.getMountainPassConditionsSchema,
      outputSchema: output.mountainPassConditionsListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
