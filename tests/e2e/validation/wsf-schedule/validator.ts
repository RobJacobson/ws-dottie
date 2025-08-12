import * as schemas from "./schemas";

// Create validators with safe validation methods
export const validators = {
  // Individual data validators
  scheduledRouteData: {
    validateSafe: (data: unknown) =>
      schemas.scheduledRouteSchema.safeParse(data),
  },
  routeData: {
    validateSafe: (data: unknown) => schemas.routeSchema.safeParse(data),
  },
  routeDetailsData: {
    validateSafe: (data: unknown) => schemas.routeDetailsSchema.safeParse(data),
  },
  sailingData: {
    validateSafe: (data: unknown) => schemas.sailingSchema.safeParse(data),
  },
  journeyData: {
    validateSafe: (data: unknown) => schemas.journeySchema.safeParse(data),
  },
  terminalTimeData: {
    validateSafe: (data: unknown) => schemas.terminalTimeSchema.safeParse(data),
  },
  annotationData: {
    validateSafe: (data: unknown) => schemas.annotationSchema.safeParse(data),
  },
  alertData: {
    validateSafe: (data: unknown) => schemas.alertSchema.safeParse(data),
  },
  timeAdjustmentData: {
    validateSafe: (data: unknown) =>
      schemas.timeAdjustmentSchema.safeParse(data),
  },
  scheduleTerminalData: {
    validateSafe: (data: unknown) =>
      schemas.scheduleTerminalSchema.safeParse(data),
  },
  scheduleTerminalComboData: {
    validateSafe: (data: unknown) =>
      schemas.scheduleTerminalComboSchema.safeParse(data),
  },
  scheduleTimeData: {
    validateSafe: (data: unknown) => schemas.scheduleTimeSchema.safeParse(data),
  },
  scheduleResponseTerminalComboData: {
    validateSafe: (data: unknown) =>
      schemas.scheduleResponseTerminalComboSchema.safeParse(data),
  },
  scheduleResponseData: {
    validateSafe: (data: unknown) =>
      schemas.scheduleResponseSchema.safeParse(data),
  },
  scheduleDepartureData: {
    validateSafe: (data: unknown) =>
      schemas.scheduleDepartureSchema.safeParse(data),
  },
  scheduleData: {
    validateSafe: (data: unknown) => schemas.scheduleSchema.safeParse(data),
  },
  validDateRangeData: {
    validateSafe: (data: unknown) =>
      schemas.validDateRangeSchema.safeParse(data),
  },
  scheduleCacheFlushDateData: {
    validateSafe: (data: unknown) =>
      schemas.scheduleCacheFlushDateSchema.safeParse(data),
  },
  activeSeasonData: {
    validateSafe: (data: unknown) => schemas.activeSeasonSchema.safeParse(data),
  },
  alternativeFormatData: {
    validateSafe: (data: unknown) =>
      schemas.alternativeFormatSchema.safeParse(data),
  },

  // Array validators for API responses
  scheduledRoutesArray: {
    validateSafe: (data: unknown) =>
      schemas.scheduledRoutesArraySchema.safeParse(data),
  },
  routesArray: {
    validateSafe: (data: unknown) => schemas.routesArraySchema.safeParse(data),
  },
  sailingsArray: {
    validateSafe: (data: unknown) =>
      schemas.sailingsArraySchema.safeParse(data),
  },
  alertsArray: {
    validateSafe: (data: unknown) => schemas.alertsArraySchema.safeParse(data),
  },
  timeAdjustmentsArray: {
    validateSafe: (data: unknown) =>
      schemas.timeAdjustmentsArraySchema.safeParse(data),
  },
  scheduleTerminalsArray: {
    validateSafe: (data: unknown) =>
      schemas.scheduleTerminalsArraySchema.safeParse(data),
  },
  scheduleTerminalCombosArray: {
    validateSafe: (data: unknown) =>
      schemas.scheduleTerminalCombosArraySchema.safeParse(data),
  },
  activeSeasonsArray: {
    validateSafe: (data: unknown) =>
      schemas.activeSeasonsArraySchema.safeParse(data),
  },
  alternativeFormatsArray: {
    validateSafe: (data: unknown) =>
      schemas.alternativeFormatsArraySchema.safeParse(data),
  },
} as const;

// Helper functions for common validation patterns
export const validationHelpers = {
  // Validate scheduled routes with detailed error reporting
  expectValidScheduledRoutesArray: (
    data: unknown,
    context: string = "scheduled routes array"
  ) => {
    const result = validators.scheduledRoutesArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate routes with detailed error reporting
  expectValidRoutesArray: (data: unknown, context: string = "routes array") => {
    const result = validators.routesArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate sailings with detailed error reporting
  expectValidSailingsArray: (
    data: unknown,
    context: string = "sailings array"
  ) => {
    const result = validators.sailingsArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate alerts with detailed error reporting
  expectValidAlertsArray: (data: unknown, context: string = "alerts array") => {
    const result = validators.alertsArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate time adjustments with detailed error reporting
  expectValidTimeAdjustmentsArray: (
    data: unknown,
    context: string = "time adjustments array"
  ) => {
    const result = validators.timeAdjustmentsArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate schedule terminals with detailed error reporting
  expectValidScheduleTerminalsArray: (
    data: unknown,
    context: string = "schedule terminals array"
  ) => {
    const result = validators.scheduleTerminalsArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate schedule terminal combos with detailed error reporting
  expectValidScheduleTerminalCombosArray: (
    data: unknown,
    context: string = "schedule terminal combos array"
  ) => {
    const result = validators.scheduleTerminalCombosArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate active seasons with detailed error reporting
  expectValidActiveSeasonsArray: (
    data: unknown,
    context: string = "active seasons array"
  ) => {
    const result = validators.activeSeasonsArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },

  // Validate alternative formats with detailed error reporting
  expectValidAlternativeFormatsArray: (
    data: unknown,
    context: string = "alternative formats array"
  ) => {
    const result = validators.alternativeFormatsArray.validateSafe(data);
    if (!result.success) {
      console.error(`Validation failed for ${context}:`, result.error.issues);
      throw new Error(
        `${context} validation failed: ${JSON.stringify(result.error.issues, null, 2)}`
      );
    }
    return result.data;
  },
};
