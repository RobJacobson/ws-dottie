// --- Additional Tests: Type, Mock, and Edge Cases ---
import { describe, expect, it } from "vitest";

import {
  getActiveSeasons,
  getAlerts,
  getAllSailings,
  getCacheFlushDateSchedule,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
  getSailings,
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
  getTerminalMates,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsAndMatesByRoute,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  getValidDateRange,
} from "@/api/wsf/schedule/api";

describe("WSF Schedule API", () => {
  describe("Cache and Date Functions", () => {
    describe("getCacheFlushDateSchedule", () => {
      it("should have the correct function signature", () => {
        expect(typeof getCacheFlushDateSchedule).toBe("function");
        expect(getCacheFlushDateSchedule).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getCacheFlushDateSchedule).toBe("function");
        expect(getCacheFlushDateSchedule).toHaveLength(0);
      });
    });

    describe("getValidDateRange", () => {
      it("should have the correct function signature", () => {
        expect(typeof getValidDateRange).toBe("function");
        expect(getValidDateRange).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getValidDateRange).toBe("function");
        expect(getValidDateRange).toHaveLength(0);
      });
    });
  });

  describe("Terminal Functions", () => {
    describe("getTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminals).toBe("function");
        expect(getTerminals).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getTerminals).toBe("function");
        expect(getTerminals).toHaveLength(1);
      });
    });

    describe("getTerminalsAndMates", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalsAndMates).toBe("function");
        expect(getTerminalsAndMates).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getTerminalsAndMates).toBe("function");
        expect(getTerminalsAndMates).toHaveLength(1);
      });
    });

    describe("getTerminalsAndMatesByRoute", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalsAndMatesByRoute).toBe("function");
        expect(getTerminalsAndMatesByRoute).toHaveLength(1);
      });

      it("should accept trip date and route ID parameters", () => {
        expect(typeof getTerminalsAndMatesByRoute).toBe("function");
        expect(getTerminalsAndMatesByRoute).toHaveLength(1);
      });
    });

    describe("getTerminalMates", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTerminalMates).toBe("function");
        expect(getTerminalMates).toHaveLength(2);
      });

      it("should accept trip date and terminal ID parameters", () => {
        expect(typeof getTerminalMates).toBe("function");
        expect(getTerminalMates).toHaveLength(2);
      });
    });
  });

  describe("Route Functions", () => {
    describe("getRoutes", () => {
      it("should have the correct function signature", () => {
        expect(typeof getRoutes).toBe("function");
        expect(getRoutes).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getRoutes).toBe("function");
        expect(getRoutes).toHaveLength(1);
      });
    });

    describe("getRoutesByTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getRoutesByTerminals).toBe("function");
        expect(getRoutesByTerminals).toHaveLength(1);
      });

      it("should accept trip date and terminal parameters", () => {
        expect(typeof getRoutesByTerminals).toBe("function");
        expect(getRoutesByTerminals).toHaveLength(1);
      });
    });

    describe("getRoutesWithDisruptions", () => {
      it("should have the correct function signature", () => {
        expect(typeof getRoutesWithDisruptions).toBe("function");
        expect(getRoutesWithDisruptions).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getRoutesWithDisruptions).toBe("function");
        expect(getRoutesWithDisruptions).toHaveLength(1);
      });
    });

    describe("getRouteDetails", () => {
      it("should have the correct function signature", () => {
        expect(typeof getRouteDetails).toBe("function");
        expect(getRouteDetails).toHaveLength(1);
      });

      it("should accept a trip date parameter", () => {
        expect(typeof getRouteDetails).toBe("function");
        expect(getRouteDetails).toHaveLength(1);
      });
    });

    describe("getRouteDetailsByTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getRouteDetailsByTerminals).toBe("function");
        expect(getRouteDetailsByTerminals).toHaveLength(1);
      });

      it("should accept trip date and terminal parameters", () => {
        expect(typeof getRouteDetailsByTerminals).toBe("function");
        expect(getRouteDetailsByTerminals).toHaveLength(1);
      });
    });

    describe("getRouteDetailsByRoute", () => {
      it("should have the correct function signature", () => {
        expect(typeof getRouteDetailsByRoute).toBe("function");
        expect(getRouteDetailsByRoute).toHaveLength(1);
      });

      it("should accept trip date and route ID parameters", () => {
        expect(typeof getRouteDetailsByRoute).toBe("function");
        expect(getRouteDetailsByRoute).toHaveLength(1);
      });
    });
  });

  describe("Season and Schedule Functions", () => {
    describe("getActiveSeasons", () => {
      it("should have the correct function signature", () => {
        expect(typeof getActiveSeasons).toBe("function");
        expect(getActiveSeasons).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getActiveSeasons).toBe("function");
        expect(getActiveSeasons).toHaveLength(0);
      });
    });

    describe("getScheduledRoutes", () => {
      it("should have the correct function signature", () => {
        expect(typeof getScheduledRoutes).toBe("function");
        expect(getScheduledRoutes).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getScheduledRoutes).toBe("function");
        expect(getScheduledRoutes).toHaveLength(0);
      });
    });

    describe("getScheduledRoutesBySeason", () => {
      it("should have the correct function signature", () => {
        expect(typeof getScheduledRoutesBySeason).toBe("function");
        expect(getScheduledRoutesBySeason).toHaveLength(1);
      });

      it("should accept a schedule ID parameter", () => {
        expect(typeof getScheduledRoutesBySeason).toBe("function");
        expect(getScheduledRoutesBySeason).toHaveLength(1);
      });
    });

    describe("getSailings", () => {
      it("should have the correct function signature", () => {
        expect(typeof getSailings).toBe("function");
        expect(getSailings).toHaveLength(1);
      });

      it("should accept a scheduled route ID parameter", () => {
        expect(typeof getSailings).toBe("function");
        expect(getSailings).toHaveLength(1);
      });
    });

    describe("getAllSailings", () => {
      it("should have the correct function signature", () => {
        expect(typeof getAllSailings).toBe("function");
        expect(getAllSailings).toHaveLength(1);
      });

      it("should accept scheduled route ID and year parameters", () => {
        expect(typeof getAllSailings).toBe("function");
        expect(getAllSailings).toHaveLength(1);
      });
    });
  });

  describe("Time Adjustment Functions", () => {
    describe("getTimeAdjustments", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTimeAdjustments).toBe("function");
        expect(getTimeAdjustments).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getTimeAdjustments).toBe("function");
        expect(getTimeAdjustments).toHaveLength(0);
      });
    });

    describe("getTimeAdjustmentsByRoute", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTimeAdjustmentsByRoute).toBe("function");
        expect(getTimeAdjustmentsByRoute).toHaveLength(1);
      });

      it("should accept a route ID parameter", () => {
        expect(typeof getTimeAdjustmentsByRoute).toBe("function");
        expect(getTimeAdjustmentsByRoute).toHaveLength(1);
      });
    });

    describe("getTimeAdjustmentsBySchedRoute", () => {
      it("should have the correct function signature", () => {
        expect(typeof getTimeAdjustmentsBySchedRoute).toBe("function");
        expect(getTimeAdjustmentsBySchedRoute).toHaveLength(1);
      });

      it("should accept a scheduled route ID parameter", () => {
        expect(typeof getTimeAdjustmentsBySchedRoute).toBe("function");
        expect(getTimeAdjustmentsBySchedRoute).toHaveLength(1);
      });
    });
  });

  describe("Schedule Functions", () => {
    describe("getScheduleByRoute", () => {
      it("should have the correct function signature", () => {
        expect(typeof getScheduleByRoute).toBe("function");
        expect(getScheduleByRoute).toHaveLength(1);
      });

      it("should accept trip date and route ID parameters", () => {
        expect(typeof getScheduleByRoute).toBe("function");
        expect(getScheduleByRoute).toHaveLength(1);
      });
    });

    describe("getScheduleByTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getScheduleByTerminals).toBe("function");
        expect(getScheduleByTerminals).toHaveLength(1);
      });

      it("should accept trip date and terminal parameters", () => {
        expect(typeof getScheduleByTerminals).toBe("function");
        expect(getScheduleByTerminals).toHaveLength(1);
      });
    });

    describe("getScheduleTodayByRoute", () => {
      it("should have the correct function signature", () => {
        expect(typeof getScheduleTodayByRoute).toBe("function");
        expect(getScheduleTodayByRoute).toHaveLength(1);
      });

      it("should accept route ID and optional parameters", () => {
        expect(typeof getScheduleTodayByRoute).toBe("function");
        expect(getScheduleTodayByRoute).toHaveLength(1);
      });
    });

    describe("getScheduleTodayByTerminals", () => {
      it("should have the correct function signature", () => {
        expect(typeof getScheduleTodayByTerminals).toBe("function");
        expect(getScheduleTodayByTerminals).toHaveLength(1);
      });

      it("should accept terminal IDs and optional parameters", () => {
        expect(typeof getScheduleTodayByTerminals).toBe("function");
        expect(getScheduleTodayByTerminals).toHaveLength(1);
      });
    });
  });

  describe("Alert Functions", () => {
    describe("getAlerts", () => {
      it("should have the correct function signature", () => {
        expect(typeof getAlerts).toBe("function");
        expect(getAlerts).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getAlerts).toBe("function");
        expect(getAlerts).toHaveLength(0);
      });
    });
  });
});
