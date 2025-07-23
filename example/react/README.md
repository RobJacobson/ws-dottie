# ws-dottie React Demo

A comprehensive React demo application showcasing all 16 API modules from the ws-dottie package.

## Features

- **16 API Modules**: Complete coverage of all WSDOT and WSF APIs
- **Real-time Data**: Live data from Washington State transportation APIs
- **Interactive UI**: Dropdown selectors for array data with individual item viewing
- **Professional Design**: Built with Tailwind CSS and ShadCN-inspired components
- **Type Safety**: Full TypeScript support with proper type definitions
- **Smart Caching**: React Query integration for efficient data management

## API Modules Included

### WSDOT APIs (13 modules)
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

### WSF APIs (3 modules)
- Fares
- Schedule
- Terminals
- Vessels

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── ApiDataDisplay.tsx    # Reusable component for displaying API data
├── pages/
│   ├── HomePage.tsx          # Main navigation page
│   ├── WsdotBorderCrossingsPage.tsx
│   ├── WsdotBridgeClearancesPage.tsx
│   ├── ...                   # All other API module pages
│   └── WsfVesselsPage.tsx
├── lib/
│   └── utils.ts              # Utility functions
├── App.tsx                   # Main app component with routing
└── main.tsx                  # Entry point
```

## Key Features

### Interactive Data Display
Each API endpoint is displayed in an expandable card with:
- Loading states
- Error handling
- Success indicators
- Collapsible data view

### Array Data Handling
For endpoints that return arrays:
- Dropdown selector showing ID + descriptive name
- Individual item selection and display
- No need for separate individual endpoint pages

### Professional UI
- Responsive design
- Beautiful gradients and shadows
- Smooth animations and transitions
- Consistent color coding for each API module

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **ws-dottie** for API integration

## API Integration

The demo uses the `ws-dottie` package which provides:
- Type-safe API clients
- React Query hooks
- Smart caching strategies
- Error handling
- Real-time data updates

## Development

### Adding New API Endpoints
1. Create a new page component in `src/pages/`
2. Import the appropriate API module from `ws-dottie`
3. Use the provided React Query hooks
4. Add the route to `App.tsx`

### Styling
The application uses Tailwind CSS with custom CSS variables for theming. The design system is inspired by ShadCN UI components.

## License

This demo is part of the ws-dottie project and follows the same MIT license.
