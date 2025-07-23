import { ArrowLeft, CloudRain } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWeatherInformationExtended } from "ws-dottie";
import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

function WsdotWeatherInformationExtendedPage() {
  const [selectedItem, setSelectedItem] = useState<ApiItem | null>(null);

  // React Query hooks
  const data = useWeatherInformationExtended();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg">
            <CloudRain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              WSDOT Weather Information Extended
            </h1>
            <p className="text-gray-600">
              Extended weather data and measurements
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Data Display */}
        <ApiDataDisplay
          title="Weather Information Extended"
          description="Extended weather data and measurements"
          data={data.data}
          isLoading={data.isLoading}
          error={data.error}
          selectedItem={selectedItem}
          onItemSelect={setSelectedItem}
          items={data.data}
          getItemName={(item) =>
            item.name || item.title || item.description || "Item"
          }
          getItemId={(item) =>
            item.id || item.vesselId || item.terminalId || "unknown"
          }
        />
      </div>
    </div>
  );
}

export default WsdotWeatherInformationExtendedPage;
