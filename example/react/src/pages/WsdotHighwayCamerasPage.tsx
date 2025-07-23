import { ArrowLeft, Camera } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHighwayCameras } from "ws-dottie";

import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

function WsdotHighwayCamerasPage() {
  const [selectedCamera, setSelectedCamera] = useState<ApiItem | null>(null);

  // React Query hooks
  const cameras = useHighwayCameras();

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
          <div className="bg-purple-500 p-3 rounded-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WSDOT Highway Cameras</h1>
            <p className="text-gray-600">Live highway camera feeds and locations</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cameras */}
        <ApiDataDisplay
          title="Highway Cameras"
          description="Live highway camera feeds and location information"
          data={cameras.data}
          isLoading={cameras.isLoading}
          error={cameras.error}
          selectedItem={selectedCamera}
          onItemSelect={setSelectedCamera}
          items={cameras.data}
          getItemName={(item) => item.title || item.cameraName || item.description || "Camera"}
          getItemId={(item) => item.cameraId || item.id || "unknown"}
        />
      </div>
    </div>
  );
}

export default WsdotHighwayCamerasPage;
