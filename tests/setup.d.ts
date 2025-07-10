declare global {
  var testConfig: {
    apiKey?: string;
    baseUrl: string;
    timeout: number;
    retries: number;
    rateLimitDelay: number;
  };
}
export {};
