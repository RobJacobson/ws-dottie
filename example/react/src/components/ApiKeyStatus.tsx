import { AlertCircle, CheckCircle } from "lucide-react";

const ApiKeyStatus = () => {
  // Check if API key is configured - use a universal approach
  const getApiKeyFromEnv = (): string => {
    // Node.js environment
    if (typeof process !== "undefined" && process.env?.WSDOT_ACCESS_TOKEN) {
      return process.env.WSDOT_ACCESS_TOKEN;
    }
    
    // For Vite applications, environment variables are handled at build time
    // For other bundlers, we'll rely on the ws-dottie library's internal handling
    return "";
  };

  const apiKey = getApiKeyFromEnv();
  const hasApiKey = apiKey && apiKey !== "your_api_key_here" && apiKey.length > 0;

  if (hasApiKey) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">API Key Configured</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm font-medium">
        API Key Required - See README.md for setup instructions
      </span>
    </div>
  );
};

export default ApiKeyStatus; 