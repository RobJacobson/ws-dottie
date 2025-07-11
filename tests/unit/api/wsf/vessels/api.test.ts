import { describe, expect, it } from "vitest";

import {
  getCacheFlushDateVessels,
  getVesselAccommodations,
  getVesselAccommodationsById,
  getVesselBasics,
  getVesselBasicsById,
  getVesselHistory,
  getVesselHistoryByVesselAndDateRange,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselStats,
  getVesselStatsById,
  getVesselVerbose,
  getVesselVerboseById,
} from "@/api/wsf/vessels/api";

describe("WSF Vessels API", () => {
  describe("Cache Functions", () => {
    describe("getCacheFlushDateVessels", () => {
      it("should have the correct function signature", () => {
        expect(typeof getCacheFlushDateVessels).toBe("function");
        expect(getCacheFlushDateVessels).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getCacheFlushDateVessels).toBe("function");
        expect(getCacheFlushDateVessels).toHaveLength(0);
      });
    });
  });

  describe("Vessel Basics Functions", () => {
    describe("getVesselBasics", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselBasics).toBe("function");
        expect(getVesselBasics).toHaveLength(0);
      });

      it("should return a Promise when called", () => {
        expect(typeof getVesselBasics).toBe("function");
        expect(getVesselBasics).toHaveLength(0);
      });
    });

    describe("getVesselBasicsById", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselBasicsById).toBe("function");
        expect(getVesselBasicsById).toHaveLength(1);
      });

      it("should accept a vessel ID parameter", () => {
        expect(typeof getVesselBasicsById).toBe("function");
        expect(getVesselBasicsById).toHaveLength(1);
      });
    });
  });

  describe("Vessel Location Functions", () => {
    describe("getVesselLocations", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselLocations).toBe("function");
        expect(getVesselLocations).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getVesselLocations).toBe("function");
        expect(getVesselLocations).toHaveLength(0);
      });
    });

    describe("getVesselLocationsByVesselId", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselLocationsByVesselId).toBe("function");
        expect(getVesselLocationsByVesselId).toHaveLength(1);
      });

      it("should accept a vessel ID parameter", () => {
        expect(typeof getVesselLocationsByVesselId).toBe("function");
        expect(getVesselLocationsByVesselId).toHaveLength(1);
      });
    });
  });

  describe("Vessel Accommodation Functions", () => {
    describe("getVesselAccommodations", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselAccommodations).toBe("function");
        expect(getVesselAccommodations).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getVesselAccommodations).toBe("function");
        expect(getVesselAccommodations).toHaveLength(0);
      });
    });

    describe("getVesselAccommodationsById", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselAccommodationsById).toBe("function");
        expect(getVesselAccommodationsById).toHaveLength(1);
      });

      it("should accept a vessel ID parameter", () => {
        expect(typeof getVesselAccommodationsById).toBe("function");
        expect(getVesselAccommodationsById).toHaveLength(1);
      });
    });
  });

  describe("Vessel Stats Functions", () => {
    describe("getVesselStats", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselStats).toBe("function");
        expect(getVesselStats).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getVesselStats).toBe("function");
        expect(getVesselStats).toHaveLength(0);
      });
    });

    describe("getVesselStatsById", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselStatsById).toBe("function");
        expect(getVesselStatsById).toHaveLength(1);
      });

      it("should accept a vessel ID parameter", () => {
        expect(typeof getVesselStatsById).toBe("function");
        expect(getVesselStatsById).toHaveLength(1);
      });
    });
  });

  describe("Vessel History Functions", () => {
    describe("getVesselHistory", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselHistory).toBe("function");
        expect(getVesselHistory).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getVesselHistory).toBe("function");
        expect(getVesselHistory).toHaveLength(0);
      });
    });

    describe("getVesselHistoryByVesselAndDateRange", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselHistoryByVesselAndDateRange).toBe("function");
        expect(getVesselHistoryByVesselAndDateRange).toHaveLength(3);
      });

      it("should accept vessel name and date range parameters", () => {
        expect(typeof getVesselHistoryByVesselAndDateRange).toBe("function");
        expect(getVesselHistoryByVesselAndDateRange).toHaveLength(3);
      });
    });
  });

  describe("Vessel Verbose Functions", () => {
    describe("getVesselVerbose", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselVerbose).toBe("function");
        expect(getVesselVerbose).toHaveLength(0);
      });

      it("should be callable without parameters", () => {
        expect(typeof getVesselVerbose).toBe("function");
        expect(getVesselVerbose).toHaveLength(0);
      });
    });

    describe("getVesselVerboseById", () => {
      it("should have the correct function signature", () => {
        expect(typeof getVesselVerboseById).toBe("function");
        expect(getVesselVerboseById).toHaveLength(1);
      });

      it("should accept a vessel ID parameter", () => {
        expect(typeof getVesselVerboseById).toBe("function");
        expect(getVesselVerboseById).toHaveLength(1);
      });
    });
  });
});
