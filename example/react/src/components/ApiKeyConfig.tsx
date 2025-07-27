import { useState } from "react";
import { configManager, type WsdotConfig } from "ws-dottie";

// Helper function to get API key from environment (for comparison)
const getApiKeyFromEnv = (): string => {
  // Node.js environment
  if (typeof process !== "undefined" && process.env?.WSDOT_ACCESS_TOKEN) {
    return process.env.WSDOT_ACCESS_TOKEN;
  }
  
  // For Vite applications, environment variables are handled at build time
  // For other bundlers, we'll rely on the ws-dottie library's internal handling
  return "";
};

const ApiKeyConfig = () => {
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);

  const handleConfigure = () => {
    if (apiKey.trim()) {
      const config: WsdotConfig = {
        WSDOT_ACCESS_TOKEN: apiKey.trim(),
      };
      configManager.setConfig(config);
      setIsConfigured(true);
    }
  };

  const handleClear = () => {
    configManager.clearConfig();
    setApiKey("");
    setIsConfigured(false);
  };

  const currentApiKey = configManager.getApiKey();
  const hasCustomConfig = currentApiKey && currentApiKey !== getApiKeyFromEnv();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        API Key Configuration
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            WSDOT API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your WSDOT API key"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Get your API key from{" "}
            <a
              href="https://wsdot.wa.gov/developers/api-access"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              WSDOT API Access
            </a>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleConfigure}
            disabled={!apiKey.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Configure
          </button>
          {isConfigured && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {hasCustomConfig && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-800">
              ✅ API key configured successfully
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Configuration Methods
          </h4>
          <div className="text-xs text-blue-800 space-y-1">
            <p>• <strong>Configuration Object:</strong> Pass config to API functions</p>
            <p>• <strong>Global Configuration:</strong> Use setConfig()</p>
            <p>• <strong>Environment Variables:</strong> WSDOT_ACCESS_TOKEN, etc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyConfig; 