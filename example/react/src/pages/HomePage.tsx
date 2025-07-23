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

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🚢 ws-dottie Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your friendly TypeScript companion for Washington State transportation
          APIs. Explore real-time data from WSDOT and WSF with smart caching and
          React Query integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apiModules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Link key={module.path} to={module.path} className="group block">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
                <div className={`${module.color} p-6 text-white`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {module.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About ws-dottie
          </h2>
          <p className="text-gray-600 mb-6">
            ws-dottie is a comprehensive TypeScript library that provides easy
            access to Washington State Department of Transportation (WSDOT) and
            Washington State Ferries (WSF) APIs. It includes smart caching,
            React Query integration, and type-safe data handling.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              TypeScript
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              React Query
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Smart Caching
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Real-time Data
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Type Safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
