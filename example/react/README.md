# WSDOT React Demo App

This is a React demo application showcasing the `ws-dottie` library for accessing Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

The WSDOT APIs require an access token. To get one:

1. Visit [WSDOT API Access](https://wsdot.wa.gov/developers/api-access)
2. Request an API key for the endpoints you need

#### Option A: Environment Variables (Recommended for production)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your API key to `.env`:
```
WSDOT_ACCESS_TOKEN=your_actual_api_key_here
```

#### Option B: Runtime Configuration (Recommended for development)
Use the configuration component in the app to set your API key at runtime. This is useful for development and testing.

#### Option C: Programmatic Configuration
```typescript
import { configManager } from 'ws-dottie';

configManager.setConfig({
  apiKey: 'your_api_key_here',
  logLevel: 'info'
});
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Available APIs

This demo includes pages for:

### WSDOT APIs
- Border Crossings
- Bridge Clearances  
- Commercial Vehicle Restrictions
- Highway Alerts
- Highway Cameras
- Mountain Pass Conditions
- Toll Rates
- Traffic Flow
- Travel Times
- Weather Information
- Weather Information Extended
- Weather Stations

### WSF APIs
- Fares
- Schedule
- Terminals
- Vessels

## Architecture

The app uses:
- **React 19** with TypeScript
- **React Query** for data fetching and caching
- **React Router** for navigation
- **Tailwind CSS** for styling
- **ws-dottie** library for API access

## Configuration System

The `ws-dottie` library supports multiple configuration methods:

1. **Environment Variables**: Set `WSDOT_ACCESS_TOKEN` in your environment
2. **Runtime Configuration**: Use the configuration component in the app
3. **Programmatic Configuration**: Use `configManager.setConfig()` in your code
4. **Per-Request Configuration**: Pass config objects to individual API calls

This makes the library framework-agnostic and works with any build tool or environment.

## Browser Compatibility

The `ws-dottie` library uses JSONP to bypass CORS restrictions when calling WSDOT/WSF APIs from browsers. This allows the app to work directly in the browser without requiring a backend proxy server.

## Security Note

The API key is embedded in the client-side bundle when using Vite's environment variable system. For production applications, consider using a backend proxy to keep the API key secure on the server side.
