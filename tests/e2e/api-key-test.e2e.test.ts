import { describe, expect, it } from "vitest";

import { configManager } from "@/shared/config";

describe("API Key Configuration E2E Test", () => {
  it("should have API key loaded from environment", () => {
    const apiKey = configManager.getApiKey();
    console.log("API Key length:", apiKey.length);
    console.log("API Key starts with:", `${apiKey.substring(0, 4)}...`);

    expect(apiKey).toBeDefined();
    expect(apiKey.length).toBeGreaterThan(0);
    expect(apiKey).not.toBe("");
  });
});
