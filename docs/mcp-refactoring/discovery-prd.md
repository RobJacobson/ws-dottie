# MCP Discovery Refactoring - Product Requirements Document

## Executive Summary

Refactor the Washington State Transportation API documentation project to implement hierarchical MCP (Model Context Protocol) tool discovery, reducing initial discovery payload by 94% while maintaining comprehensive API coverage and semantic richness.

## Background Context

### Current Project Overview

The **Washington State Transportation API Documentation Enhancement Project** transforms terse WSDOT and WSF API descriptions into rich, semantic documentation serving dual audiences:

- **Human Developers**: Need clear business context and integration examples
- **AI Agents via MCP**: Require semantic discovery without context overflow

**Current Scale:**
- 16 APIs (WSDOT + WSF)
- 95 endpoints total
- ~1000 individual fields
- Comprehensive cross-API integration guidance

### Model Context Protocol (MCP) Fundamentals

**What is MCP?**
- Open standard by Anthropic (Nov 2024) for AI-external system integration
- JSON-RPC 2.0 based protocol enabling AI agents to discover and use tools
- "USB-C port for AI applications" - standardized connection interface

**MCP Discovery Process:**
1. **Initialization**: Client-server handshake with capability negotiation
2. **Discovery**: Client requests `tools/list` for available capabilities
3. **Just-in-Time Details**: Full schemas provided only during tool execution
4. **Dynamic Updates**: `listChanged` notifications for capability changes

**Key MCP Principles:**
- **Semantic Discovery**: Rich descriptions enable AI understanding of when/how to use tools
- **Context Efficiency**: Concise but complete descriptions fit AI context windows
- **Progressive Disclosure**: Hierarchical information revelation prevents overwhelming
- **Integration Intelligence**: Cross-references guide AI workflow planning

## Problem Statement

### Current Architecture Issues

**Flat Tool Structure:**
- 95 individual endpoint tools in discovery payload
- ~47,500 characters for initial tool descriptions
- Overwhelming choice paralysis for AI agents
- No domain guidance for tool selection

**Context Window Concerns:**
- Large-scale deployment (1000+ fields) risks MCP context overflow
- Repetitive cross-reference information across similar tools
- Inefficient for AI agents seeking domain-specific capabilities

**Discovery Inefficiency:**
- AI agents must evaluate 95 tools to find ferry schedule information
- No clear hierarchy between related endpoints (e.g., WSF vessel basics vs. accommodations)
- Difficult to identify primary vs. secondary capabilities

### User Impact

**For AI Agents:**
- Slower response times due to tool evaluation overhead
- Higher error rates from selecting wrong tools
- Suboptimal workflows due to unclear tool relationships

**For Human Developers:**
- Overwhelming MCP server interfaces
- Difficulty understanding API ecosystem structure
- Poor discoverability of related capabilities

## Solution Overview

### Hierarchical Discovery Architecture

Transform flat 95-tool structure into **4-tier hierarchical system**:

**Tier 1: Domain Discovery (4 tools)**
- `wsf_ferry_services`
- `wsdot_traffic_conditions` 
- `wsdot_border_crossings`
- `wsdot_infrastructure`

**Tier 2: Capability Discovery (12-16 tools)**
- Domain-specific capability groups
- Progressive disclosure based on AI agent intent

**Tier 3: Execution**
- Full parameter schemas provided just-in-time
- Comprehensive data return with cross-references

### Context Efficiency Goals

**Discovery Payload Reduction:**
- Before: 95 tools, ~47,500 characters
- After: 4 tools, ~800 characters
- **94% reduction** in initial discovery size

**Maintained Semantic Richness:**
- Full business context preserved at execution time
- Cross-API integration guidance retained
- Edge case documentation maintained

## Detailed Requirements

### Functional Requirements

#### FR1: Domain-Level Tool Structure
**Priority:** Critical
**Description:** Implement 4 high-level domain tools for initial discovery

**Acceptance Criteria:**
- [ ] `wsf_ferry_services`: All WSF APIs (schedules, vessels, terminals, fares)
- [ ] `wsdot_traffic_conditions`: Traffic flow, travel times, highway alerts, weather
- [ ] `wsdot_border_crossings`: Border wait times and lane information
- [ ] `wsdot_infrastructure`: Bridge clearances, tolls, commercial restrictions

**Tool Schema Pattern:**
```typescript
{
  name: "domain_name",
  description: "100-150 char domain summary", 
  inputSchema: {
    capability: z.enum([...capabilities]).optional(),
    // specific params only when capability selected
  }
}
```

#### FR2: Progressive Disclosure Implementation
**Priority:** Critical  
**Description:** Tools return capability lists when called without specific capability parameter

**Acceptance Criteria:**
- [ ] Domain tools list available capabilities when called with no `capability` param
- [ ] Capability descriptions include key parameters and use cases
- [ ] Clear routing to specific functionality based on capability selection
- [ ] Fallback to full capability list for invalid capability requests

#### FR3: Capability-Level Routing
**Priority:** High
**Description:** Domain tools route to specific endpoint functionality based on capability parameter

**WSF Ferry Services Capabilities:**
- [ ] `schedules`: Route schedules, sailing times, terminal connections
- [ ] `vessels`: Real-time locations, vessel details, accommodations
- [ ] `fares`: Pricing calculation, fare types, vehicle classifications  
- [ ] `terminals`: Facilities, amenities, accessibility information

**WSDOT Traffic Conditions Capabilities:**
- [ ] `flow`: Real-time traffic speeds and congestion
- [ ] `travel_times`: Route duration estimates and comparisons
- [ ] `alerts`: Incidents, closures, construction impacts
- [ ] `weather`: Road weather conditions and forecasts

#### FR4: Backward Compatibility
**Priority:** High
**Description:** Maintain existing endpoint-level tools during transition period

**Acceptance Criteria:**
- [ ] All current 95 endpoint tools remain functional
- [ ] Hierarchical tools operate alongside flat tools
- [ ] Clear deprecation timeline for flat tools
- [ ] Migration documentation for existing integrations

#### FR5: Context Optimization
**Priority:** High
**Description:** Optimize description lengths for context efficiency while preserving semantic value

**Length Guidelines:**
- [ ] Domain descriptions: 100-150 characters
- [ ] Capability descriptions: 150-250 characters  
- [ ] Parameter descriptions: 50-400 characters (existing guidelines)
- [ ] Cross-references consolidated at schema/endpoint level

### Non-Functional Requirements

#### NFR1: Performance
- Initial discovery response < 200ms
- Capability discovery response < 500ms
- No degradation in execution performance

#### NFR2: Maintainability  
- Clear separation between domain routing and endpoint logic
- Consistent patterns across all domain tools
- Comprehensive test coverage for routing logic

#### NFR3: Scalability
- Easy addition of new APIs without discovery payload growth
- Flexible capability grouping for future reorganization
- Support for dynamic capability enabling/disabling

## Technical Architecture

### Implementation Approach

#### Phase 1: Domain Tool Framework
**Timeline:** 2 weeks
**Deliverables:**
- Domain tool base class/pattern
- Progressive disclosure routing logic
- Capability registration system

#### Phase 2: WSF Domain Implementation  
**Timeline:** 3 weeks
**Deliverables:**
- `wsf_ferry_services` domain tool
- All WSF capability routing
- Comprehensive testing

#### Phase 3: WSDOT Domain Implementation
**Timeline:** 4 weeks  
**Deliverables:**
- `wsdot_traffic_conditions` domain tool
- `wsdot_infrastructure` domain tool
- Border crossings integration (already focused)

#### Phase 4: Optimization & Migration
**Timeline:** 2 weeks
**Deliverables:**
- Performance optimization
- Migration documentation
- Deprecation timeline for flat tools

### Code Structure

```typescript
// Domain tool pattern
interface DomainTool {
  name: string;
  description: string;
  capabilities: Record<string, CapabilityHandler>;
  discover(): CapabilityList;
  execute(capability: string, params: any): Promise<ToolResult>;
}

// Capability handler pattern  
interface CapabilityHandler {
  description: string;
  inputSchema: ZodSchema;
  execute(params: any): Promise<ToolResult>;
}

// Example implementation
class WSFFerryServices implements DomainTool {
  name = "wsf_ferry_services";
  description = "Ferry schedules, vessels, terminals, and fares for Washington State Ferries";
  
  capabilities = {
    schedules: new ScheduleCapability(),
    vessels: new VesselCapability(), 
    fares: new FareCapability(),
    terminals: new TerminalCapability()
  };
}
```

### Integration Points

#### MCP Server Registration
```typescript
// Register domain tools with MCP server
server.registerTool("wsf_ferry_services", wsfDomainTool.schema, wsfDomainTool.execute);
server.registerTool("wsdot_traffic_conditions", wsdotTrafficTool.schema, wsdotTrafficTool.execute);
server.registerTool("wsdot_border_crossings", borderTool.schema, borderTool.execute);  
server.registerTool("wsdot_infrastructure", infraTool.schema, infraTool.execute);
```

#### Existing Endpoint Integration
```typescript
// Capability handlers delegate to existing endpoint functions
class ScheduleCapability implements CapabilityHandler {
  async execute(params: any) {
    // Route to existing endpoint implementations
    if (params.route) return await getRouteSchedule(params);
    if (params.terminal) return await getTerminalSchedule(params);
    return await getAllSchedules(params);
  }
}
```

## Success Metrics

### Quantitative Metrics

**Discovery Efficiency:**
- [ ] Initial discovery payload < 1000 characters (vs. current 47,500)
- [ ] Discovery response time < 200ms
- [ ] 95%+ reduction in initial tool count (4 vs. 95)

**Context Usage:**
- [ ] Average MCP session context usage < 50% of limit
- [ ] No context overflow errors in production
- [ ] 30%+ reduction in total description character count

**Performance:**
- [ ] No degradation in endpoint execution time
- [ ] Capability discovery < 500ms
- [ ] 99.9% uptime during migration

### Qualitative Metrics

**AI Agent Experience:**
- [ ] Faster tool selection (measured via response time)
- [ ] Reduced tool selection errors (measured via success rate)
- [ ] Improved workflow completion (measured via multi-step task success)

**Developer Experience:**
- [ ] Clearer API structure understanding
- [ ] Easier integration planning
- [ ] Positive feedback on hierarchical organization

## Risk Assessment

### High Risk
**Context Window Overflow:** Large-scale deployment may still hit limits
- **Mitigation:** Implement dynamic capability loading, context monitoring

**Migration Complexity:** Existing integrations may break during transition  
- **Mitigation:** Maintain backward compatibility, phased rollout

### Medium Risk  
**Performance Degradation:** Additional routing layer may slow responses
- **Mitigation:** Comprehensive performance testing, optimization

**AI Agent Confusion:** Hierarchical structure may confuse some agents
- **Mitigation:** Clear capability descriptions, fallback mechanisms

### Low Risk
**Maintenance Overhead:** More complex codebase to maintain
- **Mitigation:** Clear patterns, comprehensive documentation

## Dependencies

### Internal Dependencies
- Existing endpoint implementations (95 endpoints)
- Current Zod schema documentation
- MCP server infrastructure

### External Dependencies  
- MCP TypeScript SDK compatibility
- AI agent MCP client implementations
- JSON-RPC 2.0 transport layers

## Timeline

**Total Duration:** 11 weeks

**Phase 1 (Weeks 1-2):** Domain tool framework
**Phase 2 (Weeks 3-5):** WSF domain implementation  
**Phase 3 (Weeks 6-9):** WSDOT domain implementation
**Phase 4 (Weeks 10-11):** Optimization & migration

**Key Milestones:**
- Week 2: Framework complete, ready for domain implementation
- Week 5: WSF domain fully functional with all capabilities
- Week 9: All domain tools implemented and tested
- Week 11: Migration complete, flat tools deprecated

## Acceptance Criteria

### Definition of Done
- [ ] All 4 domain tools implemented and tested
- [ ] 94%+ reduction in discovery payload size achieved
- [ ] All existing functionality accessible through new structure
- [ ] Comprehensive documentation updated
- [ ] Migration path documented and validated
- [ ] Performance benchmarks met or exceeded
- [ ] AI agent testing demonstrates improved discovery efficiency

### Success Validation
- [ ] MCP client testing shows faster tool discovery
- [ ] Context usage monitoring confirms efficiency gains
- [ ] User feedback validates improved experience
- [ ] Production metrics demonstrate performance maintenance

This refactoring transforms the Washington State Transportation API ecosystem into an efficiently discoverable, hierarchically organized system optimized for both human developers and AI agents operating through the Model Context Protocol.
