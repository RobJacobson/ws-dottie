# 🚢 WS-Dottie

> **The complete TypeScript client for Washington State's real-time transportation data**

[![npm version](https://badge.fury.io/js/ws-dottie.svg)](https://badge.fury.io/js/ws-dottie)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Access **real-time data** from Washington State Department of Transportation (WSDOT) APIs with zero configuration. From ferry schedules and vessel locations to highway cameras and weather conditions - everything you need to build transportation apps that keep users informed.

## ✨ Why WS-Dottie?

### 🚀 **Zero Configuration React Query Integration**
```typescript
import { useVesselLocations, useHighwayCameras } from 'ws-dottie';

function FerryTracker() {
  // Real-time vessel positions with automatic caching and updates
  const { data: vessels } = useVesselLocations();
  
  // Live highway camera feeds
  const { data: cameras } = useHighwayCameras();
  
  return (
    <div>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          {vessel.VesselName} - {vessel.Latitude}, {vessel.Longitude}
        </div>
      ))}
    </div>
  );
}
```

### 🛡️ **Type-Safe from Day One**
Full TypeScript support with compile-time validation. No more guessing API response structures:

```typescript
// Fully typed responses - no 'any' types here!
const vessels: VesselLocation[] = await WsfVessels.getVesselLocations();
const cameras: HighwayCamera[] = await WsdotHighwayCameras.getHighwayCameras();
const weather: WeatherInformation[] = await WsdotWeatherInformation.getWeatherInformation();
```

### 🌊 **Complete WSF (Washington State Ferries) Coverage**
- **Real-time vessel tracking** with GPS coordinates
- **Live sailing schedules** and route information
- **Terminal wait times** and sailing space availability
- **Comprehensive fare information** for all routes
- **Service alerts** and disruptions

### 🛣️ **Full WSDOT Traveler Information APIs**
- **Highway cameras** - Live traffic camera feeds
- **Traffic flow data** - Real-time congestion information
- **Travel times** - Current travel duration estimates
- **Weather conditions** - Road weather and mountain pass conditions
- **Highway alerts** - Active incidents and closures
- **Border crossing wait times** - International border conditions
- **Toll rates** - Current toll pricing
- **Bridge clearances** - Height restrictions for commercial vehicles

## 🚀 Quick Start

### Installation
```bash
npm install ws-dottie
```

### Get Your API Key
Register at [WSDOT Traffic API](https://wsdot.wa.gov/traffic/api/) to get your access code.

### Environment Setup
```bash
# .env
WSDOT_ACCESS_TOKEN=your_access_code_here
```

### Your First Real-Time App
```typescript
import React from 'react';
import { useVesselLocations, useHighwayCameras } from 'ws-dottie';

function TransportationDashboard() {
  const { data: vessels, isLoading: vesselsLoading } = useVesselLocations();
  const { data: cameras, isLoading: camerasLoading } = useHighwayCameras();
  
  if (vesselsLoading || camerasLoading) {
    return <div>Loading real-time data...</div>;
  }
  
  return (
    <div>
      <h2>🚢 Active Ferries: {vessels?.length || 0}</h2>
      <h2>📹 Highway Cameras: {cameras?.length || 0}</h2>
      
      {/* Your UI components here */}
    </div>
  );
}
```

## 🎯 Key Features

### 🔄 **Automatic Data Refresh**
React Query hooks automatically handle:
- **Intelligent caching** to minimize API calls
- **Background updates** to keep data fresh
- **Error retry logic** for network issues
- **Loading states** for better UX

### 📱 **Universal Compatibility**
- **React Web** - Full browser support
- **React Native** - Mobile app development
- **Node.js** - Server-side applications
- **Vanilla TypeScript** - Any TypeScript project

### 🎛️ **Flexible Configuration**
```typescript
// Use default settings
const vessels = await WsfVessels.getVesselLocations();

// Or customize caching and refresh behavior
const { data: vessels } = useVesselLocations({
  refetchInterval: 30000, // Update every 30 seconds
  staleTime: 60000,       // Consider data fresh for 1 minute
});
```

## 📊 Available APIs

### 🚢 Washington State Ferries (WSF)
| API | Description | Real-time |
|-----|-------------|-----------|
| **Vessel Locations** | GPS coordinates of all active ferries | ✅ |
| **Schedules** | Route schedules and service information | ✅ |
| **Terminals** | Wait times, sailing space, terminal info | ✅ |
| **Fares** | Complete fare structure and pricing | ✅ |

### 🛣️ WSDOT Traveler Information
| API | Description | Real-time |
|-----|-------------|-----------|
| **Highway Cameras** | Live traffic camera feeds | ✅ |
| **Traffic Flow** | Congestion and traffic patterns | ✅ |
| **Travel Times** | Current travel duration estimates | ✅ |
| **Weather Information** | Road conditions and weather | ✅ |
| **Highway Alerts** | Active incidents and closures | ✅ |
| **Mountain Passes** | Pass conditions and restrictions | ✅ |
| **Border Crossings** | International border wait times | ✅ |
| **Toll Rates** | Current toll pricing | ✅ |
| **Bridge Clearances** | Height restrictions | ✅ |

## 🛠️ Advanced Usage

### Custom React Query Configuration
```typescript
import { useVesselLocations } from 'ws-dottie';

function RealTimeTracker() {
  const { data: vessels, error, isLoading } = useVesselLocations({
    // Update vessel positions every 15 seconds
    refetchInterval: 15000,
    
    // Keep data fresh for 30 seconds
    staleTime: 30000,
    
    // Retry failed requests up to 3 times
    retry: 3,
    
    // Only fetch when component is visible
    enabled: true,
  });
  
  if (error) {
    return <div>Error loading vessel data: {error.message}</div>;
  }
  
  return (
    <div>
      {vessels?.map(vessel => (
        <VesselMarker key={vessel.VesselID} vessel={vessel} />
      ))}
    </div>
  );
}
```

### Error Handling
```typescript
import { WsfVessels, WsdApiError } from 'ws-dottie';

try {
  const vessels = await WsfVessels.getVesselLocations();
  // Process vessels data
} catch (error) {
  if (error instanceof WsdApiError) {
    console.error('API Error:', error.getUserMessage());
    console.error('Error Code:', error.code);
    console.error('Status:', error.status);
  }
}
```

### Server-Side Usage
```typescript
import { WsdotHighwayCameras } from 'ws-dottie';

// In your API route or server function
export async function GET() {
  const cameras = await WsdotHighwayCameras.getHighwayCameras();
  
  return Response.json({
    cameras: cameras.slice(0, 10), // Return first 10 cameras
    timestamp: new Date().toISOString(),
  });
}
```

## 🧪 Testing

Comprehensive test suite with real API integration:

```bash
# Run all tests
npm test

# Run end-to-end tests against real WSDOT APIs
npm run test:e2e

# Test specific API endpoints
npm run test:e2e:fares
npm run test:e2e:vessels
npm run test:e2e:cameras
```

## 🤝 Contributing

We welcome contributions! This is an open-source project that serves the Washington State developer community.

### Development Setup
```bash
git clone https://github.com/yourusername/ws-dottie.git
cd ws-dottie
npm install

# Set up your WSDOT API key
echo "WSDOT_ACCESS_TOKEN=your_key_here" > .env

# Start development
npm run dev
```

### Areas for Contribution
- **New API endpoints** - Help us add more WSDOT APIs
- **Performance improvements** - Optimize caching and data fetching
- **Documentation** - Improve examples and guides
- **Testing** - Add more comprehensive test coverage
- **TypeScript types** - Enhance type safety and definitions

## 📚 Documentation

- **[API Reference](docs/reference-index.md)** - Complete API documentation
- **[Implementation Guides](docs/)** - Detailed guides for each endpoint
- **[Examples](examples/)** - Working code examples
- **[API Access Requirements](docs/API_ACCESS_REQUIREMENTS.md)** - Getting your API key

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **WSDOT** for providing comprehensive transportation data APIs
- **React Query** team for the excellent caching and state management library
- **Washington State developers** for building amazing transportation applications

---

**Built with ❤️ for the Washington State developer community**

*Keep your users informed with real-time transportation data from the source.* 