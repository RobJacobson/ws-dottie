# Getting Started with WS-Dottie

This guide will help you get up and running with WS-Dottie to access Washington State transportation data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Architecture](./architecture.md) • [API Guide](./api-guide.md)

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

```bash
# For Node.js applications
export WSDOT_ACCESS_TOKEN=your_api_key_here

# Or add to your .env file
echo "WSDOT_ACCESS_TOKEN=your_api_key_here" >> .env
```

#### Option B: Runtime Configuration

```javascript
import { configManager } from 'ws-dottie';

// Set API key at runtime
configManager.setApiKey('your_api_key_here');

// Optional: Set custom base URL (for proxying)
configManager.setBaseUrl('https://your-proxy-server.com');
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

See the [Import Patterns section in README.md](../../README.md#5-import-patterns) for detailed guidance on choosing the right pattern.

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
  });

  const alerts = await fetchAlerts({
    fetchMode: 'native',
    validate: true, // Enable validation for extra safety
  });

  const crossings = await fetchBorderCrossings({
    fetchMode: 'native',
    validate: false, // Skip validation for better performance
  });

  return { vessels, alerts, crossings };
}
```

**Validation Options:**
- `validate: false` (default) - Faster, smaller bundle, no runtime validation
- `validate: true` - Slower but catches API response changes early

For production, consider disabling validation for better performance. For development, enable validation to catch issues early. See [Production vs Development](../../README.md#-production-vs-development) for more guidance.

## 📚 Next Steps

- **[Fetching Data Guide](./guides/fetching-data.md)** - Detailed fetch-dottie usage patterns
- **[TanStack Query Guide](./guides/tanstack-query.md)** - React integration with TanStack Query
- **[CLI Usage Guide](./guides/cli-usage.md)** - Command-line interface and debugging
- **[Architecture](./architecture.md)** - System architecture and design principles
- **[API Guide](./api-guide.md)** - High-level API overview and use cases
- **[Category Documentation](./categories/)** - Detailed information by use case

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](../../openapi/)** - API specifications in YAML format
- **[HTML Documentation](../../redoc/)** - Interactive HTML documentation
