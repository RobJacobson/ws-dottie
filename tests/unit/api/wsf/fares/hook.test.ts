import { describe, expect, it } from "vitest";

import {
  useFareLineItems,
  useFareLineItemsBasic,
  useFareLineItemsVerbose,
  useFaresCacheFlushDate,
  useFaresTerminalMates,
  useFaresTerminals,
  useFaresValidDateRange,
  useFareTotals,
  useTerminalCombo,
  useTerminalComboVerbose,
} from "@/api/wsf/fares/hook";

describe("WSF Fares Hooks", () => {
  describe("useFaresCacheFlushDate", () => {
    it("should be a function", () => {
      expect(typeof useFaresCacheFlushDate).toBe("function");
    });
  });

  describe("useFaresValidDateRange", () => {
    it("should be a function", () => {
      expect(typeof useFaresValidDateRange).toBe("function");
    });
  });

  describe("useFaresTerminals", () => {
    it("should be a function", () => {
      expect(typeof useFaresTerminals).toBe("function");
    });

    it("should accept a tripDate parameter", () => {
      expect(useFaresTerminals).toHaveLength(1);
    });
  });

  describe("useFaresTerminalMates", () => {
    it("should be a function", () => {
      expect(typeof useFaresTerminalMates).toBe("function");
    });

    it("should accept tripDate and terminalID parameters", () => {
      expect(useFaresTerminalMates).toHaveLength(2);
    });
  });

  describe("useTerminalCombo", () => {
    it("should be a function", () => {
      expect(typeof useTerminalCombo).toBe("function");
    });

    it("should accept tripDate, departingTerminalID, and arrivingTerminalID parameters", () => {
      expect(useTerminalCombo).toHaveLength(3);
    });
  });

  describe("useTerminalComboVerbose", () => {
    it("should be a function", () => {
      expect(typeof useTerminalComboVerbose).toBe("function");
    });

    it("should accept a tripDate parameter", () => {
      expect(useTerminalComboVerbose).toHaveLength(1);
    });
  });

  describe("useFareLineItemsBasic", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItemsBasic).toBe("function");
    });

    it("should accept tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters", () => {
      expect(useFareLineItemsBasic).toHaveLength(4);
    });
  });

  describe("useFareLineItems", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItems).toBe("function");
    });

    it("should accept tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters", () => {
      expect(useFareLineItems).toHaveLength(4);
    });
  });

  describe("useFareLineItemsVerbose", () => {
    it("should be a function", () => {
      expect(typeof useFareLineItemsVerbose).toBe("function");
    });

    it("should accept a tripDate parameter", () => {
      expect(useFareLineItemsVerbose).toHaveLength(1);
    });
  });

  describe("useFareTotals", () => {
    it("should be a function", () => {
      expect(typeof useFareTotals).toBe("function");
    });

    it("should accept a request parameter", () => {
      expect(useFareTotals).toHaveLength(1);
    });
  });
});
