import {
  AlertTriangle,
  Building,
  Calendar,
  Camera,
  Car,
  Clock,
  Cloud,
  CloudRain,
  DollarSign,
  Mountain,
  Ship,
  Thermometer,
  Ticket,
  TrafficCone,
} from "lucide-react";
import { Link } from "react-router-dom";

import ApiKeyConfig from "@/components/ApiKeyConfig";

const apiModules = [
  {
    name: "WSDOT Border Crossings",
    path: "/wsdot-border-crossings",
    icon: Car,
    description: "Border crossing wait times and status",
    color: "bg-blue-500",
  },
  {
    name: "WSDOT Bridge Clearances",
    path: "/wsdot-bridge-clearances",
    icon: Building,
    description: "Bridge clearance information",
    color: "bg-green-500",
  },
  {
    name: "WSDOT Commercial Vehicle Restrictions",
    path: "/wsdot-commercial-vehicle-restrictions",
    icon: TrafficCone,
    description: "Commercial vehicle restrictions and regulations",
    color: "bg-orange-500",
  },
  {
    name: "WSDOT Highway Alerts",
    path: "/wsdot-highway-alerts",
    icon: AlertTriangle,
    description: "Real-time highway alerts and incidents",
    color: "bg-red-500",
  },
  {
    name: "WSDOT Highway Cameras",
    path: "/wsdot-highway-cameras",
    icon: Camera,
    description: "Live highway camera feeds",
    color: "bg-purple-500",
  },
  {
    name: "WSDOT Mountain Pass Conditions",
    path: "/wsdot-mountain-pass-conditions",
    icon: Mountain,
    description: "Mountain pass road conditions",
    color: "bg-gray-500",
  },
  {
    name: "WSDOT Toll Rates",
    path: "/wsdot-toll-rates",
    icon: DollarSign,
    description: "Current toll rates and information",
    color: "bg-yellow-500",
  },
  {
    name: "WSDOT Traffic Flow",
    path: "/wsdot-traffic-flow",
    icon: TrafficCone,
    description: "Traffic flow data and congestion",
    color: "bg-indigo-500",
  },
  {
    name: "WSDOT Travel Times",
    path: "/wsdot-travel-times",
    icon: Clock,
    description: "Travel time estimates and routes",
    color: "bg-teal-500",
  },
  {
    name: "WSDOT Weather Information",
    path: "/wsdot-weather-information",
    icon: Cloud,
    description: "Weather conditions and forecasts",
    color: "bg-cyan-500",
  },
  {
    name: "WSDOT Weather Information Extended",
    path: "/wsdot-weather-information-extended",
    icon: CloudRain,
    description: "Extended weather data and measurements",
    color: "bg-blue-600",
  },
  {
    name: "WSDOT Weather Stations",
    path: "/wsdot-weather-stations",
    icon: Thermometer,
    description: "Weather station data and locations",
    color: "bg-sky-500",
  },
  {
    name: "WSF Fares",
    path: "/wsf-fares",
    icon: Ticket,
    description: "Washington State Ferries fare information",
    color: "bg-emerald-500",
  },
  {
    name: "WSF Schedule",
    path: "/wsf-schedule",
    icon: Calendar,
    description: "Ferry schedules and departures",
    color: "bg-violet-500",
  },
  {
    name: "WSF Terminals",
    path: "/wsf-terminals",
    icon: Building,
    description: "Ferry terminal information and status",
    color: "bg-rose-500",
  },
  {
    name: "WSF Vessels",
    path: "/wsf-vessels",
    icon: Ship,
    description: "Ferry vessel locations and information",
    color: "bg-navy-500",
  },
];

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          WSDOT & WSF API Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore all 16 API modules from the ws-dottie package with interactive data displays,
          real-time information, and comprehensive documentation.
        </p>
      </div>

      <ApiKeyConfig />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apiModules.map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className="group bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`${module.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Click to explore</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About ws-dottie
          </h2>
          <p className="text-gray-600 mb-6">
            ws-dottie is a comprehensive TypeScript library providing easy access to Washington State 
            Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. This demo 
            showcases all available API modules with real-time data, interactive displays, and 
            professional UI components.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">WSDOT APIs</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Border Crossings</li>
                <li>• Bridge Clearances</li>
                <li>• Highway Alerts</li>
                <li>• Traffic Flow</li>
                <li>• Weather Information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">WSF APIs</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Ferry Schedules</li>
                <li>• Vessel Information</li>
                <li>• Terminal Status</li>
                <li>• Fare Information</li>
                <li>• Real-time Data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• TypeScript Support</li>
                <li>• React Query Integration</li>
                <li>• Real-time Updates</li>
                <li>• Error Handling</li>
                <li>• Caching</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
