import {
  terminalBasicsArraySchema,
  terminalBasicsSchema,
  terminalBulletinArraySchema,
  terminalBulletinSchema,
  terminalCacheFlushDateSchema,
  terminalLocationArraySchema,
  terminalLocationSchema,
  terminalSailingSpaceArraySchema,
  terminalSailingSpaceSchema,
  terminalTransportArraySchema,
  terminalTransportSchema,
  terminalVerboseArraySchema,
  terminalVerboseSchema,
  terminalWaitTimesArraySchema,
  terminalWaitTimesSchema,
} from "./schemas";

// Validators object with validateSafe methods for each schema
export const validators = {
  terminalBasics: {
    validateSafe: (data: unknown) => terminalBasicsSchema.safeParse(data),
  },
  terminalBasicsArray: {
    validateSafe: (data: unknown) => terminalBasicsArraySchema.safeParse(data),
  },
  terminalBulletin: {
    validateSafe: (data: unknown) => terminalBulletinSchema.safeParse(data),
  },
  terminalBulletinArray: {
    validateSafe: (data: unknown) =>
      terminalBulletinArraySchema.safeParse(data),
  },
  terminalLocation: {
    validateSafe: (data: unknown) => terminalLocationSchema.safeParse(data),
  },
  terminalLocationArray: {
    validateSafe: (data: unknown) =>
      terminalLocationArraySchema.safeParse(data),
  },
  terminalSailingSpace: {
    validateSafe: (data: unknown) => terminalSailingSpaceSchema.safeParse(data),
  },
  terminalSailingSpaceArray: {
    validateSafe: (data: unknown) =>
      terminalSailingSpaceArraySchema.safeParse(data),
  },
  terminalTransport: {
    validateSafe: (data: unknown) => terminalTransportSchema.safeParse(data),
  },
  terminalTransportArray: {
    validateSafe: (data: unknown) =>
      terminalTransportArraySchema.safeParse(data),
  },
  terminalWaitTimes: {
    validateSafe: (data: unknown) => terminalWaitTimesSchema.safeParse(data),
  },
  terminalWaitTimesArray: {
    validateSafe: (data: unknown) =>
      terminalWaitTimesArraySchema.safeParse(data),
  },
  terminalVerbose: {
    validateSafe: (data: unknown) => terminalVerboseSchema.safeParse(data),
  },
  terminalVerboseArray: {
    validateSafe: (data: unknown) => terminalVerboseArraySchema.safeParse(data),
  },
  terminalCacheFlushDate: {
    validateSafe: (data: unknown) =>
      terminalCacheFlushDateSchema.safeParse(data),
  },
};

// Validation helpers for common validation patterns
export const validationHelpers = {
  expectValidTerminalBasics: (data: unknown, context: string) => {
    const result = validators.terminalBasics.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal basics data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalBasicsArray: (data: unknown, context: string) => {
    const result = validators.terminalBasicsArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal basics array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalBulletin: (data: unknown, context: string) => {
    const result = validators.terminalBulletin.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal bulletin data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalBulletinArray: (data: unknown, context: string) => {
    const result = validators.terminalBulletinArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal bulletin array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalLocation: (data: unknown, context: string) => {
    const result = validators.terminalLocation.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal location data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalLocationArray: (data: unknown, context: string) => {
    const result = validators.terminalLocationArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal location array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalSailingSpace: (data: unknown, context: string) => {
    const result = validators.terminalSailingSpace.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal sailing space data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalSailingSpaceArray: (data: unknown, context: string) => {
    const result = validators.terminalSailingSpaceArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal sailing space array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalTransport: (data: unknown, context: string) => {
    const result = validators.terminalTransport.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal transport data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalTransportArray: (data: unknown, context: string) => {
    const result = validators.terminalTransportArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal transport array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalWaitTimes: (data: unknown, context: string) => {
    const result = validators.terminalWaitTimes.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal wait times data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalWaitTimesArray: (data: unknown, context: string) => {
    const result = validators.terminalWaitTimesArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal wait times array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalVerbose: (data: unknown, context: string) => {
    const result = validators.terminalVerbose.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal verbose data for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalVerboseArray: (data: unknown, context: string) => {
    const result = validators.terminalVerboseArray.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal verbose array for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },

  expectValidTerminalCacheFlushDate: (data: unknown, context: string) => {
    const result = validators.terminalCacheFlushDate.validateSafe(data);
    if (!result.success) {
      throw new Error(
        `Invalid terminal cache flush date for ${context}: ${result.error.message}`
      );
    }
    return result.data;
  },
};
