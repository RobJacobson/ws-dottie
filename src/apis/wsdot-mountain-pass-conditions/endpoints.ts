import { createApiDefinition } from "../utils";
import {
  getMountainPassConditionInputSchema,
  getMountainPassConditionsInputSchema,
} from "./original/inputSchemas.original";
import {
  mountainPassConditionsListSchema,
  passConditionSchema,
} from "./original/outputSchemas.original";

export const wsdotMountainPassConditionsApi = createApiDefinition(
  "wsdot-mountain-pass-conditions",
  [
    {
      function: "getMountainPassCondition",
      endpoint:
        "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: getMountainPassConditionInputSchema,
      outputSchema: passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getMountainPassConditions",
      endpoint:
        "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson",
      inputSchema: getMountainPassConditionsInputSchema,
      outputSchema: mountainPassConditionsListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
