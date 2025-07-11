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
  describe("Cache and Date Functions", () => {
    describe("getFaresCacheFlushDate", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresCacheFlushDate).toBe("function");
        expect(getFaresCacheFlushDate).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getFaresCacheFlushDate).toBe("function");
        expect(getFaresCacheFlushDate).toHaveLength(0);
      });
    });

    describe("getFaresValidDateRange", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresValidDateRange).toBe("function");
        expect(getFaresValidDateRange).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getFaresValidDateRange).toBe("function");
        expect(getFaresValidDateRange).toHaveLength(0);
      });
    });
  });

  describe("Terminal Functions", () => {
    describe("getFaresTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresTerminals).toBe("function");
        expect(getFaresTerminals).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getFaresTerminals).toBe("function");
        expect(getFaresTerminals).toHaveLength(1);
      });
    });

    describe("getFaresTerminalMates", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFaresTerminalMates).toBe("function");
        expect(getFaresTerminalMates).toHaveLength(2);
      });

      it("should accept trip date and terminal ID parameters", () => {
        expect(typeof getFaresTerminalMates).toBe("function");
        expect(getFaresTerminalMates).toHaveLength(2);
      });
    });

    describe("getTerminalCombo", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalCombo).toBe("function");
        expect(getTerminalCombo).toHaveLength(3);
      });

      it("should accept trip date and terminal parameters", () => {
        expect(typeof getTerminalCombo).toBe("function");
        expect(getTerminalCombo).toHaveLength(3);
      });
    });

    describe("getTerminalComboVerbose", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalComboVerbose).toBe("function");
        expect(getTerminalComboVerbose).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getTerminalComboVerbose).toBe("function");
        expect(getTerminalComboVerbose).toHaveLength(1);
      });
    });
  });

  describe("Fare Line Item Functions", () => {
    describe("getFareLineItemsBasic", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareLineItemsBasic).toBe("function");
        expect(getFareLineItemsBasic).toHaveLength(4);
      });

      it("should accept trip date, terminal IDs, and round trip parameters", () => {
        expect(typeof getFareLineItemsBasic).toBe("function");
        expect(getFareLineItemsBasic).toHaveLength(4);
      });
    });

    describe("getFareLineItems", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareLineItems).toBe("function");
        expect(getFareLineItems).toHaveLength(4);
      });

      it("should accept trip date, terminal IDs, and round trip parameters", () => {
        expect(typeof getFareLineItems).toBe("function");
        expect(getFareLineItems).toHaveLength(4);
      });
    });

    describe("getFareLineItemsVerbose", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareLineItemsVerbose).toBe("function");
        expect(getFareLineItemsVerbose).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getFareLineItemsVerbose).toBe("function");
        expect(getFareLineItemsVerbose).toHaveLength(1);
      });
    });
  });

  describe("Fare Total Functions", () => {
    describe("getFareTotals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getFareTotals).toBe("function");
        expect(getFareTotals).toHaveLength(1);
      });

      it("should accept a request object parameter", () => {
        expect(typeof getFareTotals).toBe("function");
        expect(getFareTotals).toHaveLength(1);
      });
    });
  });
});
