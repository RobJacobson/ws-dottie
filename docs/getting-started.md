# Getting Started with WS-Dottie

This guide will help you get up and running with WS-Dottie to access Washington State transportation data.

> **📚 Documentation Navigation**: [Documentation Index](./INDEX.md) • [Architecture](./guides/architecture.md) • [API Guide](./guides/api-guide.md)

## 🚀 Quick Start

### 1. Get Your API Key

WS-Dottie requires a free API key from Washington State Department of Transportation (WSDOT):

1. Visit [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access)
2. Sign up with your email address (no credit card required)
3. Copy your API access code

### 2. Install WS-Dottie

```bash
# Using npm
npm install ws-dottie

# Using yarn
yarn add ws-dottie

# Using pnpm
pnpm add ws-dottie
```

### 3. Configure Your API Key

#### Option A: Environment Variables (Recommended)

Environment variables are the most secure way to configure your API key, especially for production deployments.

```bash
# For Node.js applications
export WSDOT_ACCESS_TOKEN=your_api_key_here

# For React applications (Create React App)
REACT_APP_WSDOT_ACCESS_TOKEN=your_api_key_here

# For React applications (Vite)
VITE_WSDOT_ACCESS_TOKEN=your_api_key_here

# For Next.js applications
NEXT_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here

# For general use in .env file
echo "WSDOT_ACCESS_TOKEN=your_api_key_here" >> .env
```

**Best Practices for API Key Management:**
- Never commit API keys to version control
- Use different keys for development, staging, and production
- Rotate keys regularly for security
- Use environment-specific configuration files (`.env.development`, `.env.production`)
- Consider using a secrets management service in production

#### Option B: Runtime Configuration

For dynamic environments or when you need to configure at runtime:

```javascript
import { configManager } from 'ws-dottie';

// Set API key only (recommended for web clients)
configManager.setApiKey('your_api_key_here');

// Set base URL only (optional: route through proxy)
configManager.setBaseUrl('https://your-proxy-server.com');

// Set both at once
configManager.configure({
  apiKey: 'your_api_key_here',
  baseUrl: 'https://your-proxy-server.com' // Optional
});

// Get current configuration
const config = configManager.getConfig();
console.log('Current API key:', config.apiKey);
```

**Use Cases for Runtime Configuration:**
- Multi-tenant applications where different users need different API keys
- Applications that need to switch between environments dynamically
- When API keys are retrieved from a secure vault or service
- Testing with different API keys without changing environment

#### Option C: Configuration File

For complex applications, you can use a configuration file:

```javascript
// config/wsdot.js
export const wsdotConfig = {
  development: {
    apiKey: process.env.WSDOT_ACCESS_TOKEN,
    baseUrl: 'https://wsdot.wa.gov',
    logLevel: 'debug'
  },
  production: {
    apiKey: process.env.WSDOT_ACCESS_TOKEN,
    baseUrl: 'https://wsdot.wa.gov',
    logLevel: 'none'
  }
};

// In your application
import { configManager } from 'ws-dottie';
import { wsdotConfig } from './config/wsdot';

const environment = process.env.NODE_ENV || 'development';
configManager.configure(wsdotConfig[environment]);
```

#### Advanced Configuration Options

```javascript
import { configManager } from 'ws-dottie';

// Complete configuration with all options
configManager.configure({
  apiKey: 'your_api_key_here',
  baseUrl: 'https://your-proxy-server.com', // Optional proxy
  timeout: 30000, // Request timeout in milliseconds
  retries: 3, // Number of retry attempts
  retryDelay: 1000, // Delay between retries in milliseconds
  logLevel: 'info', // Logging level: 'none', 'info', 'debug'
  userAgent: 'MyApp/1.0.0' // Custom User-Agent header
});
```

#### Environment-Specific Configuration

**Development Environment:**
```javascript
// Enable debug logging and validation
configManager.configure({
  apiKey: process.env.WSDOT_ACCESS_TOKEN,
  logLevel: 'debug',
  validate: true
});
```

**Production Environment:**
```javascript
// Optimize for performance
configManager.configure({
  apiKey: process.env.WSDOT_ACCESS_TOKEN,
  logLevel: 'none',
  validate: false,
  timeout: 10000,
  retries: 2
});
```

**Browser Environment:**
```javascript
// Configure for browser with JSONP
configManager.configure({
  apiKey: process.env.WSDOT_ACCESS_TOKEN,
  fetchMode: 'jsonp', // Default for browser
  logLevel: 'info'
});
```

### 4. Choose Your Import Pattern

WS-Dottie provides multiple import patterns optimized for different use cases:

**For React Applications** (with hooks):
```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
```

**For Server-Side Code** (no React dependencies):
```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchAlerts } from 'ws-dottie/wsdot-highway-alerts/core';
```

**Importing TypeScript Types:**
```typescript
// Import types along with functions
import {
  fetchVesselLocations,
  type VesselLocation        // Output type
} from 'ws-dottie/wsf-vessels/core';

// Or import types separately
import type { VesselLocation } from 'ws-dottie/wsf-vessels';
```

See the [Import Patterns section in README.md](../README.md#5-import-patterns) for detailed guidance on choosing the right pattern.

### 5. Start Using WS-Dottie

```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

// React hooks (recommended for UI applications)
function TransportationDashboard() {
  const { data: vessels, isLoading } = useVesselLocations();
  const { data: alerts } = useAlerts();

  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

// Server-side usage with direct function calls
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchAlerts } from 'ws-dottie/wsdot-highway-alerts/core';
import { fetchBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';

async function getTransportationData() {
  const vessels = await fetchVesselLocations({
    fetchMode: 'native',
    validate: false, // Default: faster, no validation overhead
    logMode: 'none', // Default: no logging
  });

  const alerts = await fetchAlerts({
    fetchMode: 'native',
    validate: true, // Enable validation for extra safety
    logMode: 'info', // Log basic request information
  });

  const crossings = await fetchBorderCrossings({
    fetchMode: 'native',
    validate: false, // Skip validation for better performance
    logMode: 'debug', // Detailed logging for debugging
  });

  return { vessels, alerts, crossings };
}
```

**Function Options:**
- `params?: TInput` - Endpoint-specific input parameters
- `fetchMode?: 'native' | 'jsonp'` (default: `'native'`) - Transport method
- `validate?: boolean` (default: `false`) - Enable Zod schema validation
- `logMode?: 'none' | 'info' | 'debug'` (default: `'none'`) - Logging verbosity level

For production, consider disabling validation for better performance. For development, enable validation to catch issues early. See [Production vs Development](../README.md#-production-vs-development) for more guidance.

## 📚 Next Steps

- **[Fetching Data Guide](./guides/advanced/fetching-data.md)** - Detailed fetch-dottie usage patterns
- **[TanStack Query Guide](./guides/advanced/tanstack-query.md)** - React integration with TanStack Query
- **[CLI Usage Guide](./guides/advanced/cli-usage.md)** - Command-line interface and debugging
- **[Architecture](./guides/architecture.md)** - System architecture and design principles
- **[API Guide](./guides/api-guide.md)** - High-level API overview and use cases
- **[Category Documentation](./guides/categories/)** - Detailed information by use case

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications (JSON)](./generated/openapi-json/)** - API specifications in JSON format
- **[OpenAPI Specifications (YAML)](./generated/openapi-yaml/)** - API specifications in YAML format
- **[HTML Documentation](./api-reference/)** - Interactive HTML documentation

## 🚀 Building Your First App: Ferry Tracker Tutorial

This step-by-step tutorial will guide you through building a simple ferry tracking application using WS-Dottie. By the end, you'll have a working React app that displays real-time ferry locations.

### Prerequisites

- Node.js 18+ installed
- Basic knowledge of React
- WSDOT API key (from [Quick Start](#1-get-your-api-key))

### Step 1: Set Up Your Project

Create a new React project:

```bash
# Using Create React App
npx create-react-app ferry-tracker
cd ferry-tracker

# Or using Vite (recommended)
npm create vite@latest ferry-tracker -- --template react
cd ferry-tracker
```

Install WS-Dottie and required dependencies:

```bash
npm install ws-dottie @tanstack/react-query
```

### Step 2: Configure Your API Key

Create a `.env` file in your project root:

```env
REACT_APP_WSDOT_ACCESS_TOKEN=your_api_key_here
```

### Step 3: Create the Ferry Tracker Component

Replace the contents of `src/App.js` with:

```javascript
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient();

function FerryTracker() {
  const { data: vessels, isLoading, error } = useVesselLocations({
    fetchMode: 'native',
    validate: false, // Faster for production
  });

  if (isLoading) return <div>Loading ferry locations...</div>;
  
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="ferry-tracker">
      <h1>Washington State Ferry Tracker</h1>
      <p>Currently tracking {vessels?.length || 0} ferries</p>
      
      <div className="vessel-list">
        {vessels?.map(vessel => (
          <div key={vessel.VesselID} className="vessel-card">
            <h3>{vessel.VesselName}</h3>
            <p>Location: {vessel.Latitude.toFixed(4)}, {vessel.Longitude.toFixed(4)}</p>
            <p>Speed: {vessel.Speed} knots</p>
            <p>Heading: {vessel.Heading}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FerryTracker />
    </QueryClientProvider>
  );
}

export default App;
```

### Step 4: Add Basic Styling

Create a new file `src/App.css`:

```css
.ferry-tracker {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.vessel-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.vessel-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.vessel-card h3 {
  margin-top: 0;
  color: #0066cc;
}

.vessel-card p {
  margin: 8px 0;
}
```

### Step 5: Run Your Application

Start your development server:

```bash
# Using Create React App
npm start

# Using Vite
npm run dev
```

Open http://localhost:3000 in your browser to see your ferry tracker!

### Step 6: Add More Features

Let's enhance our app with more functionality:

#### Add Terminal Wait Times

Update your `FerryTracker` component:

```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useTerminalWaitTimes } from 'ws-dottie/wsf-terminals';

function FerryTracker() {
  const { data: vessels, isLoading: vesselsLoading } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  
  const { data: waitTimes, isLoading: waitTimesLoading } = useTerminalWaitTimes({
    fetchMode: 'native',
    validate: false,
  });

  // ... rest of component
}
```

#### Add a Map View

Install a mapping library:

```bash
npm install leaflet react-leaflet
```

Add a map component to display vessel locations:

```javascript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function FerryMap({ vessels }) {
  return (
    <MapContainer center={[47.6062, -122.3321]} zoom={8} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vessels?.map(vessel => (
        <Marker key={vessel.VesselID} position={[vessel.Latitude, vessel.Longitude]}>
          <Popup>
            <div>
              <h4>{vessel.VesselName}</h4>
              <p>Speed: {vessel.Speed} knots</p>
              <p>Heading: {vessel.Heading}°</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

### Troubleshooting Common Issues

#### API Key Not Working
- Ensure your API key is correctly set in the `.env` file
- Check that the environment variable name matches what your framework expects
- Restart your development server after changing environment variables

#### CORS Errors in Browser
- Use `fetchMode: 'jsonp'` for browser environments
- For production, consider setting up a proxy server

#### Data Not Loading
- Check the browser console for error messages
- Verify your API key is valid and active
- Ensure you have an internet connection

### Next Steps

- [Fetching Data Guide](./guides/advanced/fetching-data.md) - Detailed fetch-dottie usage patterns
- [TanStack Query Guide](./guides/advanced/tanstack-query.md) - React integration with TanStack Query
- [CLI Usage Guide](./guides/advanced/cli-usage.md) - Command-line interface and debugging
- [Architecture](./guides/architecture.md) - System architecture and design principles
- [API Guide](./guides/api-guide.md) - High-level API overview and use cases
- [Category Documentation](./guides/categories/) - Detailed information by use case

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications (JSON)](./generated/openapi-json/)** - API specifications in JSON format
- **[OpenAPI Specifications (YAML)](./generated/openapi-yaml/)** - API specifications in YAML format
- **[HTML Documentation](./api-reference/)** - Interactive HTML documentation


