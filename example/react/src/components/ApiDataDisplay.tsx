import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";

import type { ApiItem } from "@/types/api";

type ApiDataDisplayProps = {
  title: string;
  description?: string;
  data: ApiItem[] | ApiItem | null | undefined;
  isLoading: boolean;
  error: Error | null;
  selectedItem?: ApiItem | null;
  onItemSelect?: (item: ApiItem | null) => void;
  items?: ApiItem[];
  getItemName?: (item: ApiItem) => string;
  getItemId?: (item: ApiItem) => string | number;
};

const ApiDataDisplay = ({
  title,
  description,
  data,
  isLoading,
  error,
  selectedItem,
  onItemSelect,
  items,
  getItemName = (item) => item.name || item.title || item.description || "Unknown",
  getItemId = (item) => item.id || item.vesselId || item.terminalId || "unknown",
}: ApiDataDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderData = (data: unknown, depth = 0): React.ReactElement => {
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
      return <span className={data ? "text-green-600" : "text-red-600"}>{data.toString()}</span>;
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return <span className="text-gray-500 italic">[]</span>;
      }
      return (
        <div className="ml-4">
          <span className="text-gray-600">[</span>
          {data.map((item, index) => (
            <div key={`array-item-${index}-${depth}`} className="ml-4">
              {renderData(item, depth + 1)}
              {index < data.length - 1 && <span className="text-gray-600">,</span>}
            </div>
          ))}
          <span className="text-gray-600">]</span>
        </div>
      );
    }

    if (typeof data === "object") {
      const keys = Object.keys(data as Record<string, unknown>);
      if (keys.length === 0) {
        return <span className="text-gray-500 italic">{"{}"}</span>;
      }
      return (
        <div className="ml-4">
          <span className="text-gray-600">{"{"}</span>
          {keys.map((key, index) => (
            <div key={`object-key-${key}-${depth}`} className="ml-4">
              <span className="text-purple-600">"{key}"</span>
              <span className="text-gray-600">: </span>
              {renderData((data as Record<string, unknown>)[key], depth + 1)}
              {index < keys.length - 1 && <span className="text-gray-600">,</span>}
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
            {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="text-sm">Collapse</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="text-sm">Expand</span>
              </>
            )}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading data...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">Error loading data</p>
              <p className="text-red-600 text-sm">{error.message}</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !error && data && (
          <div className="space-y-4">
            {/* Item Selection Dropdown */}
            {items && items.length > 0 && onItemSelect && (
              <div className="flex items-center gap-3">
                <label htmlFor="item-select" className="text-sm font-medium text-gray-700">
                  Select Item:
                </label>
                <select
                  id="item-select"
                  value={selectedItem ? getItemId(selectedItem) : ""}
                  onChange={(e) => {
                    const selected = items.find(item => getItemId(item) === e.target.value);
                    onItemSelect(selected || null);
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Items</option>
                  {items.map((item) => (
                    <option key={getItemId(item)} value={getItemId(item)}>
                      {getItemName(item)}
                    </option>
                  ))}
                </select>
                {selectedItem && (
                  <button
                    type="button"
                    onClick={() => onItemSelect(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Data Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              {isExpanded ? (
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </pre>
              ) : (
                <div className="text-sm text-gray-800">
                  {renderData(data)}
                </div>
              )}
            </div>

            {/* Success Indicator */}
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Data loaded successfully</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !data && (
          <div className="text-center py-8 text-gray-500">
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDataDisplay;
