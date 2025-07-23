import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { WsdotHighwayAlerts } from "ws-dottie";

import ApiDataDisplay from "@/components/ApiDataDisplay";

function WsdotHighwayAlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  // React Query hooks
  const highwayAlerts = WsdotHighwayAlerts.useHighwayAlerts();

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
          <div className="bg-red-500 p-3 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              WSDOT Highway Alerts
            </h1>
            <p className="text-gray-600">
              Real-time highway alerts and incidents
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Highway Alerts */}
        <ApiDataDisplay
          title="Highway Alerts"
          description="Real-time highway alerts and incidents including road closures, accidents, and construction"
          data={highwayAlerts.data}
          isLoading={highwayAlerts.isLoading}
          error={highwayAlerts.error}
          selectedItem={selectedAlert}
          onItemSelect={setSelectedAlert}
          items={highwayAlerts.data}
          getItemName={(item) =>
            item.headlineDescription || item.description || "Alert"
          }
          getItemId={(item) => item.eventId || item.id}
        />
      </div>
    </div>
  );
}

export default WsdotHighwayAlertsPage;
