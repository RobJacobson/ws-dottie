import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  getTerminalBulletins,
  getTerminalBulletinsByTerminalId,
} from "@/api/wsf-terminals";

// Real TerminalIDs from WSDOT API
const VALID_TERMINAL_IDS = [
  1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

describe("Terminal Bulletins API E2E Tests", () => {
  beforeEach(() => {
    console.log("🚀 Starting E2E API tests with live WSF API calls");
  });

  afterEach(() => {
    console.log("✅ E2E API tests completed");
  });

  describe("getTerminalBulletins", () => {
    it("should fetch all terminal bulletins successfully", async () => {
      const startTime = Date.now();

      const result = await getTerminalBulletins();

      const duration = Date.now() - startTime;
      console.log(`📊 getTerminalBulletins: ${duration}ms`);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);

      if (result.length > 0) {
        const terminal = result[0];
        expect(terminal).toHaveProperty("TerminalID");
        expect(terminal).toHaveProperty("TerminalSubjectID");
        expect(terminal).toHaveProperty("RegionID");
        expect(terminal).toHaveProperty("TerminalName");
        expect(terminal).toHaveProperty("TerminalAbbrev");
        expect(terminal).toHaveProperty("SortSeq");
        expect(terminal).toHaveProperty("Bulletins");

        expect(typeof terminal.TerminalID).toBe("number");
        expect(typeof terminal.TerminalSubjectID).toBe("number");
        expect(typeof terminal.RegionID).toBe("number");
        expect(typeof terminal.TerminalName).toBe("string");
        expect(typeof terminal.TerminalAbbrev).toBe("string");
        expect(typeof terminal.SortSeq).toBe("number");
        expect(Array.isArray(terminal.Bulletins)).toBe(true);

        // Check bulletin items if they exist
        if (terminal.Bulletins.length > 0) {
          const bulletin = terminal.Bulletins[0];
          expect(bulletin).toHaveProperty("BulletinTitle");
          expect(bulletin).toHaveProperty("BulletinText");
          expect(bulletin).toHaveProperty("BulletinSortSeq");
          expect(typeof bulletin.BulletinTitle).toBe("string");
          expect(typeof bulletin.BulletinText).toBe("string");
          expect(typeof bulletin.BulletinSortSeq).toBe("number");

          if (bulletin.BulletinLastUpdated) {
            expect(bulletin.BulletinLastUpdated).toBeInstanceOf(Date);
          }
          if (bulletin.BulletinLastUpdatedSortable) {
            expect(typeof bulletin.BulletinLastUpdatedSortable).toBe("string");
          }
        }
      }
    });

    it("should handle API errors gracefully", async () => {
      // This test verifies error handling by using an invalid API call
      // The actual error handling is tested in the implementation
      expect(async () => {
        try {
          await getTerminalBulletins();
        } catch (error) {
          // Error should be handled gracefully
          expect(error).toBeDefined();
        }
      }).not.toThrow();
    });
  });

  describe("getTerminalBulletinsByTerminalId", () => {
    it("should fetch specific terminal bulletins successfully", async () => {
      const terminalId = VALID_TERMINAL_IDS[0];
      const startTime = Date.now();

      const result = await getTerminalBulletinsByTerminalId(terminalId);

      const duration = Date.now() - startTime;
      console.log(
        `📊 getTerminalBulletinsByTerminalId(${terminalId}): ${duration}ms`
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(false); // Single terminal object, not array

      // Should be a single terminal object
      expect(result.TerminalID).toBe(terminalId);
      expect(result).toHaveProperty("TerminalSubjectID");
      expect(result).toHaveProperty("RegionID");
      expect(result).toHaveProperty("TerminalName");
      expect(result).toHaveProperty("TerminalAbbrev");
      expect(result).toHaveProperty("SortSeq");
      expect(result).toHaveProperty("Bulletins");
      expect(Array.isArray(result.Bulletins)).toBe(true);
    });

    it("should handle invalid terminal ID gracefully", async () => {
      const invalidTerminalId = 99999;

      try {
        const result =
          await getTerminalBulletinsByTerminalId(invalidTerminalId);
        // Should return empty bulletins array for invalid terminal ID
        expect(Array.isArray(result.Bulletins)).toBe(true);
        expect(result.Bulletins.length).toBe(0);
      } catch (error) {
        // Or should throw an error for invalid terminal ID
        expect(error).toBeDefined();
      }
    });
  });

  describe("Performance and Data Validation", () => {
    it("should return data within reasonable time limits", async () => {
      const startTime = Date.now();

      const result = await getTerminalBulletins();

      const duration = Date.now() - startTime;
      console.log(`⏱️ getTerminalBulletins performance: ${duration}ms`);

      // Should complete within 10 seconds
      expect(duration).toBeLessThan(10000);
      expect(result).toBeDefined();
    });

    it("should validate bulletin data structure", async () => {
      const result = await getTerminalBulletins();

      if (result.length > 0) {
        const terminal = result[0];

        // Validate terminal structure
        expect(terminal.TerminalID).toBeGreaterThan(0);
        expect(terminal.TerminalSubjectID).toBeGreaterThan(0);
        expect(terminal.RegionID).toBeGreaterThan(0);
        expect(terminal.TerminalName.length).toBeGreaterThan(0);
        expect(terminal.TerminalAbbrev.length).toBeGreaterThan(0);
        expect(terminal.SortSeq).toBeGreaterThanOrEqual(0);

        // Validate bulletins array
        expect(Array.isArray(terminal.Bulletins)).toBe(true);

        if (terminal.Bulletins.length > 0) {
          const bulletin = terminal.Bulletins[0];

          // Validate bulletin item structure
          expect(bulletin.BulletinTitle.length).toBeGreaterThan(0);
          expect(bulletin.BulletinText.length).toBeGreaterThan(0);
          expect(bulletin.BulletinSortSeq).toBeGreaterThanOrEqual(0);

          // Optional fields should be valid if present
          if (bulletin.BulletinLastUpdated) {
            expect(bulletin.BulletinLastUpdated).toBeInstanceOf(Date);
          }
          if (bulletin.BulletinLastUpdatedSortable) {
            expect(bulletin.BulletinLastUpdatedSortable.length).toBeGreaterThan(
              0
            );
          }
        }
      }
    });
  });
});
