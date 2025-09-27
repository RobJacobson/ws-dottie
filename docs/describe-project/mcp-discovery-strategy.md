# MCP Discovery Optimization Strategy

## Problem Statement

With 16 APIs and 95 endpoints, a flat tool structure would overwhelm MCP clients with too many discovery options. We need a hierarchical approach that guides AI agents to the right domain first, then specific capabilities.

## Recommended Tool Structure

### Tier 1: Domain-Level Tools (High-Level Discovery)
```typescript
// 4 primary domain tools for initial discovery
const domainTools = [
  {
    name: "wsf_ferry_services",
    description: "Washington State Ferry schedules, vessels, terminals, and fares",
    category: "transportation.ferry"
  },
  {
    name: "wsdot_traffic_conditions", 
    description: "Real-time traffic, travel times, incidents, and road conditions",
    category: "transportation.highway"
  },
  {
    name: "wsdot_border_crossings",
    description: "US-Canada border crossing wait times and conditions", 
    category: "transportation.border"
  },
  {
    name: "wsdot_infrastructure",
    description: "Bridge clearances, toll rates, and commercial vehicle restrictions",
    category: "transportation.infrastructure"
  }
];
```

### Tier 2: Capability-Level Tools (Specific Functions)
```typescript
// WSF Ferry Services expands to:
const wsfTools = [
  {
    name: "wsf_schedule_lookup",
    description: "Find ferry schedules and sailing times between terminals",
    inputSchema: { route?: string, date?: string, terminal?: string }
  },
  {
    name: "wsf_vessel_tracking", 
    description: "Get real-time ferry locations and arrival estimates",
    inputSchema: { vessel?: string, route?: string }
  },
  {
    name: "wsf_fare_calculator",
    description: "Calculate ferry fares for vehicles and passengers", 
    inputSchema: { route: string, vehicleType?: string, passengers?: number }
  },
  {
    name: "wsf_terminal_info",
    description: "Get terminal facilities, amenities, and accessibility info",
    inputSchema: { terminal?: string }
  }
];
```

## Implementation Strategy

### Phase 1: Domain Discovery
1. AI agent requests `tools/list`
2. Server returns 4 high-level domain tools
3. AI agent identifies relevant domain (e.g., "wsf_ferry_services" for ferry questions)

### Phase 2: Capability Discovery  
1. AI agent calls domain tool with discovery intent
2. Server returns available capabilities within that domain
3. AI agent selects specific capability tool

### Phase 3: Execution
1. AI agent calls specific capability tool with parameters
2. Server executes and returns data

## Context Efficiency Benefits

### Before (Flat Structure):
- 95 tools in initial discovery
- ~47,500 characters for tool descriptions
- Overwhelming choice paralysis for AI agents

### After (Hierarchical Structure):
- 4 tools in initial discovery  
- ~800 characters for initial descriptions
- **94% reduction** in discovery payload
- Clear domain guidance for AI agents

## Tool Description Strategy

### Domain-Level Descriptions (Tier 1)
- **Length**: 100-200 characters
- **Focus**: Business domain and primary use cases
- **Examples**: "Ferry schedules and real-time tracking for Washington State Ferries"

### Capability-Level Descriptions (Tier 2)  
- **Length**: 150-300 characters
- **Focus**: Specific functionality and key parameters
- **Examples**: "Find ferry sailing times between terminals with optional date filtering"

### Parameter Schemas
- **Minimal required parameters** in discovery
- **Full parameter details** only during execution
- **Progressive disclosure** based on AI agent needs

## Implementation Example

```typescript
// Domain tool that returns capabilities
server.registerTool("wsf_ferry_services", {
  title: "WSF Ferry Services",
  description: "Ferry schedules, vessels, terminals, and fares for Washington State Ferries",
  inputSchema: { 
    action: z.enum(["discover", "schedule", "vessels", "fares", "terminals"]).optional()
  }
}, async ({ action = "discover" }) => {
  
  if (action === "discover") {
    return {
      content: [{
        type: "text", 
        text: "Available WSF capabilities: schedule lookup, vessel tracking, fare calculation, terminal information"
      }]
    };
  }
  
  // Route to specific capability based on action
  switch (action) {
    case "schedule":
      return await handleScheduleLookup();
    case "vessels": 
      return await handleVesselTracking();
    // etc.
  }
});
```

## Benefits for AI Agents

1. **Faster Discovery**: 4 tools vs 95 tools in initial scan
2. **Better Context**: Domain grouping helps AI understand relationships  
3. **Reduced Confusion**: Clear hierarchy prevents wrong tool selection
4. **Efficient Context Usage**: Only load details when needed
5. **Better UX**: Users get faster, more relevant responses

## Migration Path

1. **Phase 1**: Implement domain-level tools alongside existing endpoint tools
2. **Phase 2**: Test with AI agents to validate discovery efficiency  
3. **Phase 3**: Deprecate flat endpoint tools in favor of hierarchical approach
4. **Phase 4**: Optimize based on usage patterns and feedback

This approach transforms your 95-endpoint API into a discoverable, efficient system that guides AI agents to the right information without overwhelming them.
