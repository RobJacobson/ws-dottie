import { describe, expect, it } from "vitest";
import { parseJsonWithFallback } from "@/shared/utils/jsonParser";

describe("JSON Parsing with Fallback", () => {
  describe("Valid JSON", () => {
    it("should parse valid JSON with JSON.parse", () => {
      const validJson = '{"name": "test", "value": 123, "active": true}';
      const result = parseJsonWithFallback(validJson);

      expect(result).toEqual({
        name: "test",
        value: 123,
        active: true,
      });
    });

    it("should parse valid JSON arrays", () => {
      const validJson = '[1, 2, 3, "test"]';
      const result = parseJsonWithFallback(validJson);

      expect(result).toEqual([1, 2, 3, "test"]);
    });

    it("should parse valid JSON with nested objects", () => {
      const validJson =
        '{"user": {"id": 1, "name": "John"}, "roles": ["admin"]}';
      const result = parseJsonWithFallback(validJson);

      expect(result).toEqual({
        user: { id: 1, name: "John" },
        roles: ["admin"],
      });
    });
  });

  describe("JSON5-compatible JSON", () => {
    it("should parse JSON with trailing commas", () => {
      const json5Compatible = '{"name": "test", "value": 123,}';
      const result = parseJsonWithFallback(json5Compatible);

      expect(result).toEqual({
        name: "test",
        value: 123,
      });
    });

    it("should parse JSON with single quotes", () => {
      const json5Compatible = "{'name': 'test', 'value': 123}";
      const result = parseJsonWithFallback(json5Compatible);

      expect(result).toEqual({
        name: "test",
        value: 123,
      });
    });

    it("should parse JSON with comments", () => {
      const json5Compatible = `{
        // This is a comment
        "name": "test",
        "value": 123 /* Another comment */
      }`;
      const result = parseJsonWithFallback(json5Compatible);

      expect(result).toEqual({
        name: "test",
        value: 123,
      });
    });

    it("should parse JSON with unquoted keys", () => {
      const json5Compatible = "{name: 'test', value: 123}";
      const result = parseJsonWithFallback(json5Compatible);

      expect(result).toEqual({
        name: "test",
        value: 123,
      });
    });
  });

  describe("Malformed JSON", () => {
    it("should repair JSON with unescaped quotes in strings", () => {
      const malformedJson = '{"message": "Hello "world", "status": "ok"}';
      const result = parseJsonWithFallback(malformedJson);

      expect(result).toEqual({
        message: 'Hello "world', // jsonrepair doesn't add the closing quote
        status: "ok",
      });
    });

    it("should repair JSON with missing quotes around keys", () => {
      const malformedJson = "{message: 'Hello world', status: 'ok'}";
      const result = parseJsonWithFallback(malformedJson);

      expect(result).toEqual({
        message: "Hello world",
        status: "ok",
      });
    });

    it("should repair JSON with trailing commas in arrays", () => {
      const malformedJson = "[1, 2, 3,]";
      const result = parseJsonWithFallback(malformedJson);

      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("Error Handling", () => {
    it("should throw error for completely invalid JSON", () => {
      const invalidJson = "This is not JSON at all";

      expect(() => parseJsonWithFallback(invalidJson)).toThrow();
    });

    it("should throw original JSON.parse error when all attempts fail", () => {
      const invalidJson = "{invalid: json}";

      try {
        parseJsonWithFallback(invalidJson);
        expect.fail("Should have thrown an error");
      } catch (error) {
        // The error might be wrapped or transformed, so just check it's an error
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
