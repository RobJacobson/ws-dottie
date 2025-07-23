import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { useState } from "react";

interface ApiDataDisplayProps {
  title: string;
  description?: string;
  data: any;
  isLoading: boolean;
  error: any;
  selectedItem?: any;
  onItemSelect?: (item: any) => void;
  items?: Array<any>;
  getItemName?: (item: any) => string;
  getItemId?: (item: any) => string | number;
}

function ApiDataDisplay({
  title,
  description,
  data,
  isLoading,
  error,
  selectedItem,
  onItemSelect,
  items,
  getItemName = (item) => item.name || item.title || item.id || "Unknown",
  getItemId = (item) =>
    item.id || item.vesselId || item.terminalId || "unknown",
}: ApiDataDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderData = (data: any, depth = 0): React.ReactElement => {
    if (data === null || data === undefined) {
      return <span className="text-gray-500 italic">null</span>;
    }

    if (typeof data === "string") {
      return <span className="text-green-700">"{data}"</span>;
    }

    if (typeof data === "number") {
      return <span className="text-blue-600">{data}</span>;
    }

    if (typeof data === "boolean") {
      return (
        <span className={data ? "text-green-600" : "text-red-600"}>
          {data.toString()}
        </span>
      );
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return <span className="text-gray-500 italic">[]</span>;
      }
      return (
        <div className="ml-4">
          <span className="text-gray-600">[</span>
          {data.map((item, index) => (
            <div key={index} className="ml-4">
              {renderData(item, depth + 1)}
              {index < data.length - 1 && (
                <span className="text-gray-600">,</span>
              )}
            </div>
          ))}
          <span className="text-gray-600">]</span>
        </div>
      );
    }

    if (typeof data === "object") {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        return <span className="text-gray-500 italic">{"{}"}</span>;
      }
      return (
        <div className="ml-4">
          <span className="text-gray-600">{"{"}</span>
          {keys.map((key, index) => (
            <div key={key} className="ml-4">
              <span className="text-purple-600">"{key}"</span>
              <span className="text-gray-600">: </span>
              {renderData(data[key], depth + 1)}
              {index < keys.length - 1 && (
                <span className="text-gray-600">,</span>
              )}
            </div>
          ))}
          <span className="text-gray-600">{"}"}</span>
        </div>
      );
    }

    return <span className="text-gray-500">{String(data)}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-4">
          {isLoading && (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Error: {error.message}</span>
            </div>
          )}
          {data && !isLoading && !error && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Data loaded successfully</span>
            </div>
          )}
        </div>

        {/* Dropdown for array data */}
        {items && items.length > 0 && onItemSelect && (
          <div className="mb-4">
            <label
              htmlFor="item-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Item:
            </label>
            <select
              id="item-select"
              onChange={(e) => {
                const selected = items.find(
                  (item) => getItemId(item).toString() === e.target.value
                );
                if (selected) onItemSelect(selected);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an item...</option>
              {items.map((item) => (
                <option key={getItemId(item)} value={getItemId(item)}>
                  {getItemId(item)} - {getItemName(item)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Data display */}
        {isExpanded && (
          <div className="mt-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-700 mt-2">{error.message}</p>
              </div>
            )}

            {data && !isLoading && !error && (
              <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                  {renderData(selectedItem || data)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiDataDisplay;
