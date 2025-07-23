import { ArrowLeft, Ticket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

function WsfFaresPage() {
  const [selectedItem, setSelectedItem] = useState<ApiItem | null>(null);

  // Mock data for demo
  const mockData = {
    data: [
      {
        id: 1,
        name: "Seattle Terminal",
        description: "Seattle Ferry Terminal",
      },
      {
        id: 2,
        name: "Bainbridge Terminal",
        description: "Bainbridge Island Terminal",
      },
    ],
    isLoading: false,
    error: null,
  };

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
          <div className="bg-emerald-500 p-3 rounded-lg">
            <Ticket className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WSF Fares</h1>
            <p className="text-gray-600">
              Washington State Ferries fare information
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Data Display */}
        <ApiDataDisplay
          title="Fares"
          description="Washington State Ferries fare information"
          data={mockData.data}
          isLoading={mockData.isLoading}
          error={mockData.error}
          selectedItem={selectedItem}
          onItemSelect={setSelectedItem}
          items={mockData.data}
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

export default WsfFaresPage;
