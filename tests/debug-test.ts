import { describe, it } from "vitest";

describe("Debug Test", () => {
  it("should log messages", () => {
    console.log("🧪 [DEBUG] This is a test log message");
    console.log("🧪 [DEBUG] Testing console.log in Vitest");
    expect(true).toBe(true);
  });
});

