import { describe, expect, it } from "vitest";

import {
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsVerbose,
  getFaresCacheFlushDate,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotals,
  getTerminalCombo,
  getTerminalComboVerbose,
} from "@/api/wsf/fares/api";

describe("WSF Fares API", () => {
  describe("getFaresCacheFlushDate", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFaresCacheFlushDate).toBe("function");
      expect(getFaresCacheFlushDate).toHaveLength(0);
    });

    it("should return a Promise", () => {
      const result = getFaresCacheFlushDate();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFaresValidDateRange", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFaresValidDateRange).toBe("function");
      expect(getFaresValidDateRange).toHaveLength(0);
    });

    it("should return a Promise", () => {
      const result = getFaresValidDateRange();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFaresTerminals", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFaresTerminals).toBe("function");
      expect(getFaresTerminals).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const result = getFaresTerminals(tripDate);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFaresTerminalMates", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFaresTerminalMates).toBe("function");
      expect(getFaresTerminalMates).toHaveLength(2);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const terminalID = 7;
      const result = getFaresTerminalMates(tripDate, terminalID);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getTerminalCombo", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalCombo).toBe("function");
      expect(getTerminalCombo).toHaveLength(3);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const departingTerminalID = 7;
      const arrivingTerminalID = 8;
      const result = getTerminalCombo(
        tripDate,
        departingTerminalID,
        arrivingTerminalID
      );
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getTerminalComboVerbose", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalComboVerbose).toBe("function");
      expect(getTerminalComboVerbose).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const result = getTerminalComboVerbose(tripDate);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFareLineItemsBasic", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareLineItemsBasic).toBe("function");
      expect(getFareLineItemsBasic).toHaveLength(4);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const departingTerminalID = 7;
      const arrivingTerminalID = 8;
      const roundTrip = false;
      const result = getFareLineItemsBasic(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip
      );
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFareLineItems", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareLineItems).toBe("function");
      expect(getFareLineItems).toHaveLength(4);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const departingTerminalID = 7;
      const arrivingTerminalID = 8;
      const roundTrip = false;
      const result = getFareLineItems(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip
      );
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFareLineItemsVerbose", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareLineItemsVerbose).toBe("function");
      expect(getFareLineItemsVerbose).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const tripDate = new Date("2024-01-01");
      const result = getFareLineItemsVerbose(tripDate);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFareTotals", () => {
    it("should have the correct function signature", () => {
      expect(typeof getFareTotals).toBe("function");
      expect(getFareTotals).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const request = {
        tripDate: new Date("2024-01-01"),
        departingTerminalID: 7,
        arrivingTerminalID: 8,
        roundTrip: false,
        fareLineItemIDs: [1],
        quantities: [1],
      };
      const result = getFareTotals(request);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
