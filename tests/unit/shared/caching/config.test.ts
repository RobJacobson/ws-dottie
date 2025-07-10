import { describe, expect, it } from "vitest";

import {
  CACHE_FLUSH_CONFIG,
  createCacheFlushOptions,
  createFrequentUpdateOptions,
  createInfrequentUpdateOptions,
  FREQUENT_UPDATE_CONFIG,
  INFREQUENT_UPDATE_CONFIG,
} from "@/shared/caching/config";

describe("WSF Caching Configuration", () => {
  describe("FREQUENT_UPDATE_CONFIG", () => {
    it("should have correct stale time (30 seconds)", () => {
      expect(FREQUENT_UPDATE_CONFIG.staleTime).toBe(30 * 1000);
    });

    it("should have correct gc time (2 minutes)", () => {
      expect(FREQUENT_UPDATE_CONFIG.gcTime).toBe(2 * 60 * 1000);
    });

    it("should have correct refetch interval (5 seconds)", () => {
      expect(FREQUENT_UPDATE_CONFIG.refetchInterval).toBe(5 * 1000);
    });

    it("should have refetch on window focus enabled", () => {
      expect(FREQUENT_UPDATE_CONFIG.refetchOnWindowFocus).toBe(true);
    });

    it("should have correct retry count", () => {
      expect(FREQUENT_UPDATE_CONFIG.retry).toBe(3);
    });

    it("should have exponential backoff retry delay", () => {
      const delay1 = FREQUENT_UPDATE_CONFIG.retryDelay(0);
      const delay2 = FREQUENT_UPDATE_CONFIG.retryDelay(1);
      const delay3 = FREQUENT_UPDATE_CONFIG.retryDelay(2);

      expect(delay1).toBe(1000); // 2^0 * 1000 = 1000
      expect(delay2).toBe(2000); // 2^1 * 1000 = 2000
      expect(delay3).toBe(4000); // 2^2 * 1000 = 4000
    });

    it("should cap retry delay at 30 seconds", () => {
      const delay10 = FREQUENT_UPDATE_CONFIG.retryDelay(10);
      expect(delay10).toBe(30000); // Capped at 30 seconds
    });
  });

  describe("INFREQUENT_UPDATE_CONFIG", () => {
    it("should have correct stale time (1 week)", () => {
      expect(INFREQUENT_UPDATE_CONFIG.staleTime).toBe(7 * 24 * 60 * 60 * 1000);
    });

    it("should have correct gc time (2 weeks)", () => {
      expect(INFREQUENT_UPDATE_CONFIG.gcTime).toBe(14 * 24 * 60 * 60 * 1000);
    });

    it("should have refetch interval disabled", () => {
      expect(INFREQUENT_UPDATE_CONFIG.refetchInterval).toBe(false);
    });

    it("should have refetch on window focus enabled", () => {
      expect(INFREQUENT_UPDATE_CONFIG.refetchOnWindowFocus).toBe(true);
    });

    it("should have correct retry count", () => {
      expect(INFREQUENT_UPDATE_CONFIG.retry).toBe(5);
    });

    it("should have exponential backoff retry delay", () => {
      const delay1 = INFREQUENT_UPDATE_CONFIG.retryDelay(0);
      const delay2 = INFREQUENT_UPDATE_CONFIG.retryDelay(1);
      const delay3 = INFREQUENT_UPDATE_CONFIG.retryDelay(2);

      expect(delay1).toBe(1000); // 2^0 * 1000 = 1000
      expect(delay2).toBe(2000); // 2^1 * 1000 = 2000
      expect(delay3).toBe(4000); // 2^2 * 1000 = 4000
    });

    it("should cap retry delay at 30 seconds", () => {
      const delay10 = INFREQUENT_UPDATE_CONFIG.retryDelay(10);
      expect(delay10).toBe(30000); // Capped at 30 seconds
    });
  });

  describe("CACHE_FLUSH_CONFIG", () => {
    it("should have correct stale time (5 minutes)", () => {
      expect(CACHE_FLUSH_CONFIG.staleTime).toBe(5 * 60 * 1000);
    });

    it("should have correct gc time (10 minutes)", () => {
      expect(CACHE_FLUSH_CONFIG.gcTime).toBe(10 * 60 * 1000);
    });

    it("should have correct refetch interval (2 minutes)", () => {
      expect(CACHE_FLUSH_CONFIG.refetchInterval).toBe(2 * 60 * 1000);
    });

    it("should have refetch on window focus enabled", () => {
      expect(CACHE_FLUSH_CONFIG.refetchOnWindowFocus).toBe(true);
    });

    it("should have correct retry count", () => {
      expect(CACHE_FLUSH_CONFIG.retry).toBe(5);
    });

    it("should have exponential backoff retry delay", () => {
      const delay1 = CACHE_FLUSH_CONFIG.retryDelay(0);
      const delay2 = CACHE_FLUSH_CONFIG.retryDelay(1);
      const delay3 = CACHE_FLUSH_CONFIG.retryDelay(2);

      expect(delay1).toBe(1000); // 2^0 * 1000 = 1000
      expect(delay2).toBe(2000); // 2^1 * 1000 = 2000
      expect(delay3).toBe(4000); // 2^2 * 1000 = 4000
    });

    it("should cap retry delay at 30 seconds", () => {
      const delay10 = CACHE_FLUSH_CONFIG.retryDelay(10);
      expect(delay10).toBe(30000); // Capped at 30 seconds
    });
  });

  describe("createFrequentUpdateOptions", () => {
    it("should return frequent update config by default", () => {
      const options = createFrequentUpdateOptions();
      expect(options.staleTime).toBe(FREQUENT_UPDATE_CONFIG.staleTime);
      expect(options.gcTime).toBe(FREQUENT_UPDATE_CONFIG.gcTime);
      expect(options.refetchInterval).toBe(
        FREQUENT_UPDATE_CONFIG.refetchInterval
      );
      expect(options.refetchOnWindowFocus).toBe(
        FREQUENT_UPDATE_CONFIG.refetchOnWindowFocus
      );
      expect(options.retry).toBe(FREQUENT_UPDATE_CONFIG.retry);
    });

    it("should merge additional options", () => {
      const additionalOptions = {
        enabled: false,
        refetchOnMount: true,
      };
      const options = createFrequentUpdateOptions(additionalOptions);

      expect(options.staleTime).toBe(FREQUENT_UPDATE_CONFIG.staleTime);
      expect(options.gcTime).toBe(FREQUENT_UPDATE_CONFIG.gcTime);
      // Additional options are merged correctly
      expect(Object.keys(options)).toContain("enabled");
      expect(Object.keys(options)).toContain("refetchOnMount");
    });

    it("should override base config with additional options", () => {
      const additionalOptions = {
        staleTime: 60 * 1000, // Override to 1 minute
        retry: 1, // Override to 1 retry
      };
      const options = createFrequentUpdateOptions(additionalOptions);

      expect(options.staleTime).toBe(60 * 1000);
      expect(options.retry).toBe(1);
      expect(options.gcTime).toBe(FREQUENT_UPDATE_CONFIG.gcTime); // Should remain unchanged
    });
  });

  describe("createInfrequentUpdateOptions", () => {
    it("should return infrequent update config by default", () => {
      const options = createInfrequentUpdateOptions();
      expect(options.staleTime).toBe(INFREQUENT_UPDATE_CONFIG.staleTime);
      expect(options.gcTime).toBe(INFREQUENT_UPDATE_CONFIG.gcTime);
      expect(options.refetchInterval).toBe(
        INFREQUENT_UPDATE_CONFIG.refetchInterval
      );
      expect(options.refetchOnWindowFocus).toBe(
        INFREQUENT_UPDATE_CONFIG.refetchOnWindowFocus
      );
      expect(options.retry).toBe(INFREQUENT_UPDATE_CONFIG.retry);
    });

    it("should merge additional options", () => {
      const additionalOptions = {
        enabled: true,
        refetchOnMount: false,
      };
      const options = createInfrequentUpdateOptions(additionalOptions);

      expect(options.staleTime).toBe(INFREQUENT_UPDATE_CONFIG.staleTime);
      expect(options.gcTime).toBe(INFREQUENT_UPDATE_CONFIG.gcTime);
      // Additional options are merged correctly
      expect(Object.keys(options)).toContain("enabled");
      expect(Object.keys(options)).toContain("refetchOnMount");
    });

    it("should override base config with additional options", () => {
      const additionalOptions = {
        staleTime: 24 * 60 * 60 * 1000, // Override to 1 day
        retry: 2, // Override to 2 retries
      };
      const options = createInfrequentUpdateOptions(additionalOptions);

      expect(options.staleTime).toBe(24 * 60 * 60 * 1000);
      expect(options.retry).toBe(2);
      expect(options.gcTime).toBe(INFREQUENT_UPDATE_CONFIG.gcTime); // Should remain unchanged
    });
  });

  describe("createCacheFlushOptions", () => {
    it("should return cache flush config by default", () => {
      const options = createCacheFlushOptions();
      expect(options.staleTime).toBe(CACHE_FLUSH_CONFIG.staleTime);
      expect(options.gcTime).toBe(CACHE_FLUSH_CONFIG.gcTime);
      expect(options.refetchInterval).toBe(CACHE_FLUSH_CONFIG.refetchInterval);
      expect(options.refetchOnWindowFocus).toBe(
        CACHE_FLUSH_CONFIG.refetchOnWindowFocus
      );
      expect(options.retry).toBe(CACHE_FLUSH_CONFIG.retry);
    });

    it("should merge additional options", () => {
      const additionalOptions = {
        enabled: true,
        refetchOnMount: true,
      };
      const options = createCacheFlushOptions(additionalOptions);

      expect(options.staleTime).toBe(CACHE_FLUSH_CONFIG.staleTime);
      expect(options.gcTime).toBe(CACHE_FLUSH_CONFIG.gcTime);
      // Additional options are merged correctly
      expect(Object.keys(options)).toContain("enabled");
      expect(Object.keys(options)).toContain("refetchOnMount");
    });

    it("should override base config with additional options", () => {
      const additionalOptions = {
        staleTime: 10 * 60 * 1000, // Override to 10 minutes
        retry: 3, // Override to 3 retries
      };
      const options = createCacheFlushOptions(additionalOptions);

      expect(options.staleTime).toBe(10 * 60 * 1000);
      expect(options.retry).toBe(3);
      expect(options.gcTime).toBe(CACHE_FLUSH_CONFIG.gcTime); // Should remain unchanged
    });
  });

  describe("Configuration Comparison", () => {
    it("should have different stale times for different configs", () => {
      expect(FREQUENT_UPDATE_CONFIG.staleTime).toBeLessThan(
        INFREQUENT_UPDATE_CONFIG.staleTime
      );
      expect(CACHE_FLUSH_CONFIG.staleTime).toBeLessThan(
        INFREQUENT_UPDATE_CONFIG.staleTime
      );
      expect(FREQUENT_UPDATE_CONFIG.staleTime).toBeLessThan(
        CACHE_FLUSH_CONFIG.staleTime
      );
    });

    it("should have different gc times for different configs", () => {
      expect(FREQUENT_UPDATE_CONFIG.gcTime).toBeLessThan(
        INFREQUENT_UPDATE_CONFIG.gcTime
      );
      expect(CACHE_FLUSH_CONFIG.gcTime).toBeLessThan(
        INFREQUENT_UPDATE_CONFIG.gcTime
      );
      expect(FREQUENT_UPDATE_CONFIG.gcTime).toBeLessThan(
        CACHE_FLUSH_CONFIG.gcTime
      );
    });

    it("should have different retry counts for different configs", () => {
      expect(FREQUENT_UPDATE_CONFIG.retry).toBeLessThan(
        INFREQUENT_UPDATE_CONFIG.retry
      );
      expect(FREQUENT_UPDATE_CONFIG.retry).toBeLessThan(
        CACHE_FLUSH_CONFIG.retry
      );
      expect(INFREQUENT_UPDATE_CONFIG.retry).toBe(CACHE_FLUSH_CONFIG.retry);
    });

    it("should have consistent retry delay functions", () => {
      const attempt = 2;
      const frequentDelay = FREQUENT_UPDATE_CONFIG.retryDelay(attempt);
      const infrequentDelay = INFREQUENT_UPDATE_CONFIG.retryDelay(attempt);
      const cacheFlushDelay = CACHE_FLUSH_CONFIG.retryDelay(attempt);

      expect(frequentDelay).toBe(infrequentDelay);
      expect(infrequentDelay).toBe(cacheFlushDelay);
      expect(frequentDelay).toBe(4000); // 2^2 * 1000 = 4000
    });
  });

  describe("Time Constants", () => {
    it("should have correct time calculations", () => {
      const SECOND = 1000;
      const MINUTE = 60 * SECOND;
      const HOUR = 60 * MINUTE;
      const DAY = 24 * HOUR;
      const WEEK = 7 * DAY;
      const MONTH = 30 * DAY;

      expect(SECOND).toBe(1000);
      expect(MINUTE).toBe(60 * 1000);
      expect(HOUR).toBe(60 * 60 * 1000);
      expect(DAY).toBe(24 * 60 * 60 * 1000);
      expect(WEEK).toBe(7 * 24 * 60 * 60 * 1000);
      expect(MONTH).toBe(30 * 24 * 60 * 60 * 1000);
    });
  });
});
