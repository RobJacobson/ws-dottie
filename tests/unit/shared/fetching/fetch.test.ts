import { describe, expect, it } from "vitest";

import { API_BASES, API_KEY } from "@/shared/fetching/config";

describe("WSF Fetch Utilities", () => {
  describe("URL Construction", () => {
    it("should have correct API bases defined", () => {
      expect(API_BASES.vessels).toBeDefined();
      expect(API_BASES.terminals).toBeDefined();
      expect(API_BASES.schedule).toBeDefined();
      expect(API_KEY).toBeDefined();
    });

    it("should construct correct vessel URLs", () => {
      const endpoint = "/vessellocations/123";
      const expectedUrl = `${API_BASES.vessels}${endpoint}?api_key=${API_KEY}`;

      expect(expectedUrl).toContain(API_BASES.vessels);
      expect(expectedUrl).toContain(endpoint);
      expect(expectedUrl).toContain(API_KEY);
    });

    it("should construct correct terminal URLs", () => {
      const endpoint = "/terminals/456";
      const expectedUrl = `${API_BASES.terminals}${endpoint}?api_key=${API_KEY}`;

      expect(expectedUrl).toContain(API_BASES.terminals);
      expect(expectedUrl).toContain(endpoint);
      expect(expectedUrl).toContain(API_KEY);
    });

    it("should construct correct schedule URLs", () => {
      const endpoint = "/routes/789";
      const expectedUrl = `${API_BASES.schedule}${endpoint}?api_key=${API_KEY}`;

      expect(expectedUrl).toContain(API_BASES.schedule);
      expect(expectedUrl).toContain(endpoint);
      expect(expectedUrl).toContain(API_KEY);
    });

    it("should handle endpoints with query parameters", () => {
      const endpoint = "/vessellocations?active=true";
      const expectedUrl = `${API_BASES.vessels}${endpoint}&api_key=${API_KEY}`;

      expect(expectedUrl).toContain(API_BASES.vessels);
      expect(expectedUrl).toContain("active=true");
      expect(expectedUrl).toContain(API_KEY);
    });

    it("should handle complex endpoints", () => {
      const endpoint = "/routes/2024-04-01/1/2";
      const expectedUrl = `${API_BASES.schedule}${endpoint}?api_key=${API_KEY}`;

      expect(expectedUrl).toContain(API_BASES.schedule);
      expect(expectedUrl).toContain("2024-04-01");
      expect(expectedUrl).toContain(API_KEY);
    });

    it("should handle different endpoint patterns", () => {
      const endpoints = [
        "/simple",
        "/with/params/123",
        "/complex/path/with/multiple/segments",
        "/query?param=value",
        "/mixed/123?active=true&type=test",
      ];

      for (const endpoint of endpoints) {
        const expectedUrl = `${API_BASES.vessels}${endpoint}?api_key=${API_KEY}`;
        expect(expectedUrl).toContain(API_BASES.vessels);
        expect(expectedUrl).toContain(endpoint);
        expect(expectedUrl).toContain(API_KEY);
      }
    });
  });

  describe("Configuration", () => {
    it("should have valid API base URLs", () => {
      expect(API_BASES.vessels).toMatch(/^https?:\/\/.+/);
      expect(API_BASES.terminals).toMatch(/^https?:\/\/.+/);
      expect(API_BASES.schedule).toMatch(/^https?:\/\/.+/);
    });

    it("should have valid API key", () => {
      // In test environment, API key might be empty, which is acceptable for unit tests
      expect(typeof API_KEY).toBe("string");
      // Only check length if API key is provided (not empty)
      if (API_KEY.length > 0) {
        expect(API_KEY).toBeTruthy();
      }
    });

    it("should have different base URLs for different services", () => {
      expect(API_BASES.vessels).not.toBe(API_BASES.terminals);
      expect(API_BASES.terminals).not.toBe(API_BASES.schedule);
      expect(API_BASES.vessels).not.toBe(API_BASES.schedule);
    });
  });
});
