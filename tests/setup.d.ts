declare global {
  namespace NodeJS {
    interface Global {
      testConfig: {
        apiKey?: string;
        baseUrl: string;
        timeout: number;
        retries: number;
        rateLimitDelay: number;
      } | undefined;
    }
  }
}

export {};
