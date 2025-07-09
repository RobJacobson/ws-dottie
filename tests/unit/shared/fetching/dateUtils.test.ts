import { describe, expect, it } from "vitest";

import {
  buildWsfUrl,
  dateToWsfDateTimeFormat,
  dateToWsfFormat,
  dateToWsfPathFormat,
  dateToWsfTimeFormat,
  getDateLabel,
  getTodayWsfFormat,
  getTomorrowWsfFormat,
  isToday,
  isTomorrow,
  parseWsfDateTime,
  parseWsfScheduleDate,
  parseWsfTime,
} from "@/shared/fetching/dateUtils";

describe("WSF Date Utilities", () => {
  describe("dateToWsfFormat", () => {
    it("should convert Date to MM/DD/YYYY format", () => {
      const date = new Date("2024-04-01T12:00:00.000Z");
      const result = dateToWsfFormat(date);
      expect(result).toBe("04/01/2024");
    });

    it("should handle single digit month and day", () => {
      const date = new Date("2024-01-05T12:00:00.000Z");
      const result = dateToWsfFormat(date);
      expect(result).toBe("01/05/2024");
    });

    it("should handle different years", () => {
      const date = new Date("2023-12-31T12:00:00.000Z");
      const result = dateToWsfFormat(date);
      expect(result).toBe("12/31/2023");
    });
  });

  describe("dateToWsfPathFormat", () => {
    it("should convert Date to YYYY-MM-DD format", () => {
      const date = new Date("2024-04-01T12:00:00.000Z");
      const result = dateToWsfPathFormat(date);
      expect(result).toBe("2024-04-01");
    });

    it("should handle single digit month and day", () => {
      const date = new Date("2024-01-05T12:00:00.000Z");
      const result = dateToWsfPathFormat(date);
      expect(result).toBe("2024-01-05");
    });

    it("should handle different years", () => {
      const date = new Date("2023-12-31T12:00:00.000Z");
      const result = dateToWsfPathFormat(date);
      expect(result).toBe("2023-12-31");
    });
  });

  describe("buildWsfUrl", () => {
    it("should build URL with string parameters", () => {
      const template = "/routes/{tripDate}/{routeId}";
      const params = {
        tripDate: "2024-04-01",
        routeId: 1,
      };
      const result = buildWsfUrl(template, params);
      expect(result).toBe("/routes/2024-04-01/1");
    });

    it("should build URL with Date parameters", () => {
      const template = "/routes/{tripDate}/{routeId}";
      const params = {
        tripDate: new Date("2024-04-01T12:00:00.000Z"),
        routeId: 1,
      };
      const result = buildWsfUrl(template, params);
      expect(result).toBe("/routes/2024-04-01/1");
    });

    it("should build URL with number parameters", () => {
      const template = "/vessels/{vesselId}/locations";
      const params = {
        vesselId: 123,
      };
      const result = buildWsfUrl(template, params);
      expect(result).toBe("/vessels/123/locations");
    });

    it("should build URL with boolean parameters", () => {
      const template = "/terminals/{terminalId}/status?active={isActive}";
      const params = {
        terminalId: 1,
        isActive: true,
      };
      const result = buildWsfUrl(template, params);
      expect(result).toBe("/terminals/1/status?active=true");
    });

    it("should handle URL with no parameters", () => {
      const template = "/routes";
      const result = buildWsfUrl(template);
      expect(result).toBe("/routes");
    });

    it("should handle URL with unused parameters", () => {
      const template = "/routes/{tripDate}";
      const params = {
        tripDate: "2024-04-01",
        unusedParam: "value",
      };
      const result = buildWsfUrl(template, params);
      expect(result).toBe("/routes/2024-04-01");
    });

    it("should handle URL with multiple placeholders", () => {
      const template =
        "/schedule/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";
      const params = {
        tripDate: new Date("2024-04-01T12:00:00.000Z"),
        departingTerminalId: 1,
        arrivingTerminalId: 2,
      };
      const result = buildWsfUrl(template, params);
      expect(result).toBe("/schedule/2024-04-01/1/2");
    });
  });

  describe("dateToWsfTimeFormat", () => {
    it("should convert Date to HH:MM AM/PM format", () => {
      // Create date in local timezone to avoid timezone conversion issues
      const date = new Date(2024, 3, 1, 14, 30, 0); // April 1, 2024, 2:30 PM
      const result = dateToWsfTimeFormat(date);
      expect(result).toBe("2:30 PM");
    });

    it("should handle AM times", () => {
      const date = new Date(2024, 3, 1, 9, 15, 0); // April 1, 2024, 9:15 AM
      const result = dateToWsfTimeFormat(date);
      expect(result).toBe("9:15 AM");
    });

    it("should handle midnight (12:00 AM)", () => {
      const date = new Date(2024, 3, 1, 0, 0, 0); // April 1, 2024, 12:00 AM
      const result = dateToWsfTimeFormat(date);
      expect(result).toBe("12:00 AM");
    });

    it("should handle noon (12:00 PM)", () => {
      const date = new Date(2024, 3, 1, 12, 0, 0); // April 1, 2024, 12:00 PM
      const result = dateToWsfTimeFormat(date);
      expect(result).toBe("12:00 PM");
    });

    it("should handle single digit minutes", () => {
      const date = new Date(2024, 3, 1, 14, 5, 0); // April 1, 2024, 2:05 PM
      const result = dateToWsfTimeFormat(date);
      expect(result).toBe("2:05 PM");
    });
  });

  describe("dateToWsfDateTimeFormat", () => {
    it("should convert Date to MM/DD/YYYY HH:MM AM/PM format", () => {
      const date = new Date(2024, 3, 1, 14, 30, 0); // April 1, 2024, 2:30 PM
      const result = dateToWsfDateTimeFormat(date);
      expect(result).toBe("04/01/2024 2:30 PM");
    });

    it("should handle AM times", () => {
      const date = new Date(2024, 3, 1, 9, 15, 0); // April 1, 2024, 9:15 AM
      const result = dateToWsfDateTimeFormat(date);
      expect(result).toBe("04/01/2024 9:15 AM");
    });
  });

  describe("parseWsfScheduleDate", () => {
    it("should parse MM/DD/YYYY format to Date", () => {
      const result = parseWsfScheduleDate("04/01/2024");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(3); // April is month 3 (0-indexed)
      expect(result.getDate()).toBe(1);
    });

    it("should handle single digit month and day", () => {
      const result = parseWsfScheduleDate("01/05/2024");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January is month 0
      expect(result.getDate()).toBe(5);
    });

    it("should handle different years", () => {
      const result = parseWsfScheduleDate("12/31/2023");
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(11); // December is month 11
      expect(result.getDate()).toBe(31);
    });
  });

  describe("parseWsfTime", () => {
    it("should parse HH:MM AM format to Date", () => {
      const result = parseWsfTime("9:15 AM");
      expect(result.getHours()).toBe(9);
      expect(result.getMinutes()).toBe(15);
    });

    it("should parse HH:MM PM format to Date", () => {
      const result = parseWsfTime("2:30 PM");
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it("should handle 12:00 AM (midnight)", () => {
      const result = parseWsfTime("12:00 AM");
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
    });

    it("should handle 12:00 PM (noon)", () => {
      const result = parseWsfTime("12:00 PM");
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(0);
    });

    it("should handle single digit minutes", () => {
      const result = parseWsfTime("10:05 AM");
      expect(result.getHours()).toBe(10);
      expect(result.getMinutes()).toBe(5);
    });
  });

  describe("parseWsfDateTime", () => {
    it("should parse MM/DD/YYYY HH:MM AM/PM format to Date", () => {
      const result = parseWsfDateTime("04/01/2024 2:30 PM");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it("should handle AM times", () => {
      const result = parseWsfDateTime("01/05/2024 9:15 AM");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(5);
      expect(result.getHours()).toBe(9);
      expect(result.getMinutes()).toBe(15);
    });

    it("should handle midnight", () => {
      const result = parseWsfDateTime("12/31/2023 12:00 AM");
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
    });
  });

  describe("getTodayWsfFormat", () => {
    it("should return today's date in MM/DD/YYYY format", () => {
      const result = getTodayWsfFormat();
      const today = new Date();
      const expected = dateToWsfFormat(today);
      expect(result).toBe(expected);
    });
  });

  describe("getTomorrowWsfFormat", () => {
    it("should return tomorrow's date in MM/DD/YYYY format", () => {
      const result = getTomorrowWsfFormat();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const expected = dateToWsfFormat(tomorrow);
      expect(result).toBe(expected);
    });
  });

  describe("isToday", () => {
    it("should return true for today's date", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it("should return false for yesterday's date", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it("should return false for tomorrow's date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe("isTomorrow", () => {
    it("should return true for tomorrow's date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isTomorrow(tomorrow)).toBe(true);
    });

    it("should return false for today's date", () => {
      const today = new Date();
      expect(isTomorrow(today)).toBe(false);
    });

    it("should return false for yesterday's date", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isTomorrow(yesterday)).toBe(false);
    });
  });

  describe("getDateLabel", () => {
    it("should return 'Today' for today's date", () => {
      const today = new Date();
      expect(getDateLabel(today)).toBe("Today");
    });

    it("should return 'Tomorrow' for tomorrow's date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(getDateLabel(tomorrow)).toBe("Tomorrow");
    });

    it("should return formatted date for other dates", () => {
      const futureDate = new Date("2024-12-25T12:00:00.000Z");
      expect(getDateLabel(futureDate)).toBe("12/25/2024");
    });
  });
});
