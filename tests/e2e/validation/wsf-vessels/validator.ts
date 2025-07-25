import {
  vesselAccommodationArraySchema,
  vesselAccommodationSchema,
  vesselBasicArraySchema,
  vesselBasicSchema,
  vesselHistoryArraySchema,
  vesselHistorySchema,
  vesselLocationArraySchema,
  vesselLocationSchema,
  vesselStatsArraySchema,
  vesselStatsSchema,
  vesselsCacheFlushDateSchema,
  vesselVerboseArraySchema,
  vesselVerboseSchema,
} from "./schemas";

// Validators object with validateSafe methods for each schema
export const validators = {
  vesselBasic: {
    validateSafe: (data: unknown) => vesselBasicSchema.safeParse(data),
  },
  vesselBasicArray: {
    validateSafe: (data: unknown) => vesselBasicArraySchema.safeParse(data),
  },
  vesselAccommodation: {
    validateSafe: (data: unknown) => vesselAccommodationSchema.safeParse(data),
  },
  vesselAccommodationArray: {
    validateSafe: (data: unknown) =>
      vesselAccommodationArraySchema.safeParse(data),
  },
  vesselStats: {
    validateSafe: (data: unknown) => vesselStatsSchema.safeParse(data),
  },
  vesselStatsArray: {
    validateSafe: (data: unknown) => vesselStatsArraySchema.safeParse(data),
  },
  vesselHistory: {
    validateSafe: (data: unknown) => vesselHistorySchema.safeParse(data),
  },
  vesselHistoryArray: {
    validateSafe: (data: unknown) => vesselHistoryArraySchema.safeParse(data),
  },
  vesselLocation: {
    validateSafe: (data: unknown) => vesselLocationSchema.safeParse(data),
  },
  vesselLocationArray: {
    validateSafe: (data: unknown) => vesselLocationArraySchema.safeParse(data),
  },
  vesselVerbose: {
    validateSafe: (data: unknown) => vesselVerboseSchema.safeParse(data),
  },
  vesselVerboseArray: {
    validateSafe: (data: unknown) => vesselVerboseArraySchema.safeParse(data),
  },
  vesselsCacheFlushDate: {
    validateSafe: (data: unknown) =>
      vesselsCacheFlushDateSchema.safeParse(data),
  },
};

// Validation helpers for common validation patterns
export const validationHelpers = {
  expectValidVesselBasic: (data: unknown, context: string) => {
    const result = validators.vesselBasic.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel basic data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselBasicArray: (data: unknown, context: string) => {
    const result = validators.vesselBasicArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel basic array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselAccommodation: (data: unknown, context: string) => {
    const result = validators.vesselAccommodation.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel accommodation data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselAccommodationArray: (data: unknown, context: string) => {
    const result = validators.vesselAccommodationArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel accommodation array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselStats: (data: unknown, context: string) => {
    const result = validators.vesselStats.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel stats data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselStatsArray: (data: unknown, context: string) => {
    const result = validators.vesselStatsArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel stats array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselHistory: (data: unknown, context: string) => {
    const result = validators.vesselHistory.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel history data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselHistoryArray: (data: unknown, context: string) => {
    const result = validators.vesselHistoryArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel history array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselLocation: (data: unknown, context: string) => {
    const result = validators.vesselLocation.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel location data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselLocationArray: (data: unknown, context: string) => {
    const result = validators.vesselLocationArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel location array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselVerbose: (data: unknown, context: string) => {
    const result = validators.vesselVerbose.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel verbose data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselVerboseArray: (data: unknown, context: string) => {
    const result = validators.vesselVerboseArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessel verbose array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidVesselsCacheFlushDate: (data: unknown, context: string) => {
    const result = validators.vesselsCacheFlushDate.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid vessels cache flush date for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },
};
