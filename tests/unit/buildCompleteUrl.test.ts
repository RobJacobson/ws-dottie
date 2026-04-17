/**
 * Unit tests for URL construction (API key injection when `params` is omitted).
 */

import { beforeEach, describe, expect, it } from "vitest";
import { buildCompleteUrl } from "@/shared/fetching/internal/buildUrl";
import { configManager } from "@/shared/utils/configManager";

describe("buildCompleteUrl", () => {
  beforeEach(() => {
    configManager.setApiKey("test-api-key-for-build-url");
  });

  it("injects WSF apiaccesscode when params are undefined and there are no path placeholders", () => {
    const url = buildCompleteUrl(
      "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselLocations",
      undefined
    );
    expect(url).toContain("apiaccesscode=test-api-key-for-build-url");
  });

  it("injects WSF apiaccesscode when params are an empty object", () => {
    const url = buildCompleteUrl(
      "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselLocations",
      {}
    );
    expect(url).toContain("apiaccesscode=test-api-key-for-build-url");
  });
});
