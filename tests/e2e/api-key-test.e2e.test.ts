import { describe, expect, it } from "vitest";

import { API_KEY } from "@/shared/fetching/config";

describe("API Key Configuration E2E Test", () => {
  it("should have API key loaded from environment", () => {
    console.log("API Key length:", API_KEY.length);
    console.log("API Key starts with:", `${API_KEY.substring(0, 4)}...`);

    expect(API_KEY).toBeDefined();
    expect(API_KEY.length).toBeGreaterThan(0);
    expect(API_KEY).not.toBe("");
  });
});
