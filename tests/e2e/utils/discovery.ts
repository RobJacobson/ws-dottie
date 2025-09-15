import type { Endpoint } from "@/shared/endpoints";

/**
 * Discover all endpoints from client modules
 */
export const discoverEndpoints = (): Endpoint<unknown, unknown>[] => {
  try {
    // Import all client modules
    const allModules = [
      require("@/clients/wsdot-border-crossings"),
      require("@/clients/wsdot-bridge-clearances"),
      require("@/clients/wsdot-commercial-vehicle-restrictions"),
      require("@/clients/wsdot-highway-alerts"),
      require("@/clients/wsdot-highway-cameras"),
      require("@/clients/wsdot-mountain-pass-conditions"),
      require("@/clients/wsdot-toll-rates"),
      require("@/clients/wsdot-traffic-flow"),
      require("@/clients/wsdot-travel-times"),
      require("@/clients/wsdot-weather-information"),
      require("@/clients/wsdot-weather-information-extended"),
      require("@/clients/wsdot-weather-stations"),
      require("@/clients/wsf-fares"),
      require("@/clients/wsf-schedule"),
      require("@/clients/wsf-terminals"),
      require("@/clients/wsf-vessels"),
    ];

    const endpoints: Endpoint<unknown, unknown>[] = [];

    allModules.forEach((module) => {
      if (module && typeof module === "object") {
        Object.values(module).forEach((value) => {
          if (isEndpoint(value)) {
            endpoints.push(value);
          }
        });
      }
    });

    console.log(
      `🔍 Discovered ${endpoints.length} endpoints from ${allModules.length} modules`
    );
    return endpoints;
  } catch (error) {
    console.error("Failed to discover endpoints:", error);
    throw new Error(
      `Endpoint discovery failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Check if an object is an Endpoint
 */
const isEndpoint = (obj: unknown): obj is Endpoint<unknown, unknown> => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof (obj as any).id === "string" &&
    typeof (obj as any).api === "string" &&
    typeof (obj as any).functionName === "string" &&
    typeof (obj as any).urlTemplate === "string" &&
    typeof (obj as any).endpoint === "string" &&
    (obj as any).inputSchema &&
    (obj as any).outputSchema &&
    typeof (obj as any).cacheStrategy === "string"
  );
};

/**
 * Get all unique API names from discovered endpoints
 */
export const discoverApiNames = (): string[] => {
  const endpoints = discoverEndpoints();
  const apiNames = [...new Set(endpoints.map((ep) => ep.api))];
  console.log(`🔍 Found ${apiNames.length} APIs: ${apiNames.join(", ")}`);
  return apiNames;
};

/**
 * Filter endpoints by API name
 */
export const filterEndpointsByApi = (
  endpoints: Endpoint<unknown, unknown>[],
  apiName: string
): Endpoint<unknown, unknown>[] => {
  return endpoints.filter((ep) => ep.api === apiName);
};

/**
 * Filter endpoints by multiple API names
 */
export const filterEndpointsByApis = (
  endpoints: Endpoint<unknown, unknown>[],
  apiNames: string[]
): Endpoint<unknown, unknown>[] => {
  return endpoints.filter((ep) => apiNames.includes(ep.api));
};
