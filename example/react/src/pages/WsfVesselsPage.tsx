import { ArrowLeft, Ship } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { WsfVessels } from "ws-dottie";

import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

function WsfVesselsPage() {
  const [selectedVesselBasics, setSelectedVesselBasics] = useState<ApiItem | null>(null);
  const [selectedVesselLocations, setSelectedVesselLocations] = useState<ApiItem | null>(null);
  const [selectedVesselAccommodations, setSelectedVesselAccommodations] = useState<ApiItem | null>(null);
  const [selectedVesselStats, setSelectedVesselStats] = useState<ApiItem | null>(null);
  const [selectedVesselHistory, setSelectedVesselHistory] = useState<ApiItem | null>(null);
  const [selectedVesselVerbose, setSelectedVesselVerbose] = useState<ApiItem | null>(null);

  // React Query hooks
  const vesselBasics = WsfVessels.useVesselBasics();
  const vesselLocations = WsfVessels.useVesselLocations();
  const vesselAccommodations = WsfVessels.useVesselAccommodations();
  const vesselStats = WsfVessels.useVesselStats();
  const vesselHistory = WsfVessels.useVesselHistory();
  const vesselVerbose = WsfVessels.useVesselVerbose();
  const cacheFlushDate = WsfVessels.useCacheFlushDateVessels();

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
          <div className="bg-navy-500 p-3 rounded-lg">
            <Ship className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WSF Vessels</h1>
            <p className="text-gray-600">
              Washington State Ferries vessel information and tracking
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Vessel Basics */}
        <ApiDataDisplay
          title="Vessel Basics"
          description="Basic vessel information including names, abbreviations, class information, and operational status"
          data={vesselBasics.data}
          isLoading={vesselBasics.isLoading}
          error={vesselBasics.error}
          selectedItem={selectedVesselBasics}
          onItemSelect={setSelectedVesselBasics}
          items={vesselBasics.data}
          getItemName={(item) =>
            item.vesselName || item.name || "Unknown Vessel"
          }
          getItemId={(item) => item.vesselId || item.id || "unknown"}
        />

        {/* Vessel Locations */}
        <ApiDataDisplay
          title="Vessel Locations"
          description="Real-time vessel positions, speeds, headings, and status information"
          data={vesselLocations.data}
          isLoading={vesselLocations.isLoading}
          error={vesselLocations.error}
          selectedItem={selectedVesselLocations}
          onItemSelect={setSelectedVesselLocations}
          items={vesselLocations.data}
          getItemName={(item) =>
            item.vesselName || item.name || "Unknown Vessel"
          }
          getItemId={(item) => item.vesselId || item.id || "unknown"}
        />

        {/* Vessel Accommodations */}
        <ApiDataDisplay
          title="Vessel Accommodations"
          description="Accommodation information including amenities, facilities, and passenger services"
          data={vesselAccommodations.data}
          isLoading={vesselAccommodations.isLoading}
          error={vesselAccommodations.error}
          selectedItem={selectedVesselAccommodations}
          onItemSelect={setSelectedVesselAccommodations}
          items={vesselAccommodations.data}
          getItemName={(item) =>
            item.vesselName || item.name || "Unknown Vessel"
          }
          getItemId={(item) => item.vesselId || item.id || "unknown"}
        />

        {/* Vessel Statistics */}
        <ApiDataDisplay
          title="Vessel Statistics"
          description="Statistical information about vessels including operational metrics and performance data"
          data={vesselStats.data}
          isLoading={vesselStats.isLoading}
          error={vesselStats.error}
          selectedItem={selectedVesselStats}
          onItemSelect={setSelectedVesselStats}
          items={vesselStats.data}
          getItemName={(item) =>
            item.vesselName || item.name || "Unknown Vessel"
          }
          getItemId={(item) => item.vesselId || item.id || "unknown"}
        />

        {/* Vessel History */}
        <ApiDataDisplay
          title="Vessel History"
          description="Historical information about vessels including past operations and service records"
          data={vesselHistory.data}
          isLoading={vesselHistory.isLoading}
          error={vesselHistory.error}
          selectedItem={selectedVesselHistory}
          onItemSelect={setSelectedVesselHistory}
          items={vesselHistory.data}
          getItemName={(item) =>
            item.vesselName || item.name || "Unknown Vessel"
          }
          getItemId={(item) => item.vesselId || item.id || "unknown"}
        />

        {/* Vessel Verbose */}
        <ApiDataDisplay
          title="Vessel Verbose"
          description="Comprehensive vessel information including specifications, capacity, and amenities"
          data={vesselVerbose.data}
          isLoading={vesselVerbose.isLoading}
          error={vesselVerbose.error}
          selectedItem={selectedVesselVerbose}
          onItemSelect={setSelectedVesselVerbose}
          items={vesselVerbose.data}
          getItemName={(item) =>
            item.vesselName || item.name || "Unknown Vessel"
          }
          getItemId={(item) => item.vesselId || item.id || "unknown"}
        />

        {/* Cache Flush Date */}
        <ApiDataDisplay
          title="Cache Flush Date"
          description="Date when the vessel data cache was last flushed"
          data={cacheFlushDate.data ? { cacheFlushDate: cacheFlushDate.data } : null}
          isLoading={cacheFlushDate.isLoading}
          error={cacheFlushDate.error}
        />
      </div>
    </div>
  );
}

export default WsfVesselsPage;
