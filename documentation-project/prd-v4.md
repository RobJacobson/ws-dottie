# API Documentation Enhancement PRD v4.0

## Executive Summary

This Product Requirements Document (PRD) outlines approach for MCP agents to research and implement enhanced documentation for resourceDescription and businessContext fields across all sixteen WSDOT/WSF API endpoints. The goal is to create consistent, business-focused documentation that serves both human readers and AI agents effectively while maintaining existing DRY principle.

## Project Goals

1. **Enhance Documentation Quality**: Improve resourceDescription and businessContext fields with consistent, business-focused language
2. **Maintain DRY Principle**: Leverage existing structure where resourceDescription provides shared context for related endpoints
3. **Enable MCP Agent Optimization**: Create documentation that helps AI agents make informed endpoint selection decisions
4. **Ensure Consistency**: Standardize documentation patterns across all API groups and endpoints
5. **Support Human Readers**: Maintain clarity and usability for developers consuming APIs

## Scope

Your **sole task** is to update these narrative documentation for these three fields in assigned endpoint group files:
- resourceDescription
- businessContext
- endpointDescription

You **must not** edit any of the following:
- Other API files
- Any Zod schemas
- Any fields within endpoint group files except for the three identified above

## Agent Workflow

### Phase 1: Research and Analysis

#### 1.1 Documentation Review
For each assigned endpoint group, you must retrieve and compare information from each of these resources. Do not proceed to edit any descriptions until you have reviewed all of this information. If you cannot retrieve and review all of this information, that is a mandatory stopping condition. 

**Step 1: Review Current Implementation**
```bash
# Examine current documentation
cat src/apis/[api-name]/[endpoint-group]/[endpoint-group].ts

# Examine Zod schemas
cat src/apis/[api-name]/[endpoint-group]/[endpoint-group].output.ts
cat src/apis/[api-name]/[endpoint-group]/[endpoint-group].input.ts
```

**Information to Extract**:
- Current resourceDescription and businessContext content
- Current endpointDescription patterns
- Field definitions and validation rules
- Gaps compared to official documentation

**Step 2: Review Official Documentation**
```bash
# Read API specification
cat docs/references/api-specs/[api-name].md

# Read endpoint documentation
ls docs/references/endpoint-specs/[api-name]/
cat docs/references/endpoint-specs/[api-name]/[endpoint-name].md
```

**Information to Extract**:
- Complete field list with types and descriptions
- Business purpose from official documentation
- Special conditions or limitations
- Data freshness information
- Integration examples or use cases

**Step 3: Online Web Research with Brave search using MCP Tools**
```
<use_mcp_tool><server_name>brave</server_name><tool_name>brave_web_search</tool_name><arguments>{"query": "...", "count": 10}</arguments></use_mcp_tool>
```

**Information to Find**:
- Business context for how WSDOT and WSF operate, including for users of this API
- Pracitcal clarification of unclear terms or concepts.

**Step 4: Sample Data Analysis for MCP Agents**
```
# MCP agents must download sample data for each endpoint using fetch-dottie CLI
npx fetch-dottie [api-name]:[endpoint-name] --limit 10

# Analyze sample data to understand business purpose based on actual data structure
# Use insights to validate and refine businessContext descriptions
```

**Required Data Analysis for Each Endpoint Group**:
- **Vessel Locations**: Analyze GPS coordinates, terminal relationships, schedule data, and vessel status indicators to determine real-time tracking capabilities and trip planning value
- **Border Crossing Data**: Examine wait times, crossing locations, timestamp patterns, and route-specific data to understand border crossing planning and freight scheduling use cases
- **Bridge Clearances**: Review vertical clearance measurements, location data, route information, and height restriction details to understand commercial vehicle routing and oversize permit applications
- **Highway Alerts**: Study incident types, impact levels, geographic coverage, and temporal patterns to understand traffic monitoring and emergency response coordination needs
- **Terminal Wait Times**: Evaluate capacity information, wait time patterns, terminal conditions, and travel recommendations to understand passenger trip planning and terminal operations optimization requirements

**Business Context Determination Process**:
MCP agents should analyze sample data to identify:
1. **Primary Business Value**: What core problem this data solves for users
2. **Key Data Elements**: Which specific fields enable the primary use cases
3. **Action Patterns**: What users can DO with this data (track, plan, monitor, check, etc.)
4. **Integration Points**: How this data connects to other endpoints or workflows

**Example Analysis for Vessel Locations**:
- Sample data shows GPS coordinates, vessel names, terminal IDs, speed/heading, at-dock status, ETA information
- Business context: Real-time vessel tracking for passenger apps and fleet management
- Key actions: Track positions, calculate arrival times, monitor fleet status
- Integration: Combine with terminal data for complete trip planning

**Step 3: Online Business Research**
```bash
# WSDOT/WSF business information
curl -s "https://www.wsdot.wa.gov" | grep -i "vessel tracking\|ferry schedule\|terminal management\|traffic alerts"
curl -s "https://www.wsf.com" | grep -i "fleet management\|vessel operations\|terminal services"

# Business documents and reports
curl -s "https://www.wsdot.wa.gov/about/" | grep -i "annual report\|business plan\|strategic plan"
```

**Information to Find**:
- Primary business purposes and stakeholders
- Real-world use cases and applications
- Data freshness and update cycles
- Integration with other systems
- Performance characteristics and limitations

**Step 4: Online Research with MCP Tools**
```
<use_mcp_tool><server_name>brave</server_name><tool_name>brave_web_search</tool_name><arguments>{"query": "...", "count": 10}</arguments></use_mcp_tool>
```

**Information to Find**
- Business context for how the WSDOT and WSF operate, including for users of this API
- Pracitcal clarification of unclear terms or concepts.


#### 1.2 Analysis Requirements
For each endpoint group, document:
- Current documentation strengths and weaknesses
- Business purpose and stakeholder needs
- Integration patterns with other endpoints
- Performance characteristics
- Data freshness and update cycles

### Phase 2: Documentation Enhancement

#### 2.1 Resource Description Enhancement

**Template**:
```
Each [ResourceName] item represents [primary data category]. [First sentence with context and key fields]. [Second sentence with additional context, data source, or usage].
```

**Requirements**:
- **Sentence 1**: Noun phrase describing what data represents, including key field categories
- **Sentence 2**: Additional context about data source, usage patterns, or business implications
- **Word Count**: 25-50 words for simple resources, 50-75 words for complex resources
- **Structure**: Start with "Each [ResourceName] item represents..."
- **Terminology**: Use consistent business terms across all descriptions

**Examples**:
- **Vessel Resources**: "Each VesselBasic item represents essential vessel details for Washington State Ferries, including vessel identification (name and ID), class information, operational status (in service, maintenance, out of service), and ownership information. These items provide foundational vessel data needed for passenger information systems, fleet management applications, and operational decision-making."
- **Terminal Resources**: "Each TerminalBasic item represents essential terminal details for Washington State Ferry terminals, including terminal identification (name and ID), operational status, facility amenities (elevators, waiting rooms, food service, restrooms), and regional assignments. These items provide foundational terminal information needed for trip planning, accessibility compliance, and passenger service management."
- **Alert Resources**: "Each Alert item represents real-time traffic incidents, road conditions, construction, and other events affecting Washington State highways. These include location details, impact levels, start/end times, and estimated duration."

#### 2.2 Business Context Enhancement

**Template**:
```
Use to [primary action] by providing [key data elements] for [specific purpose]. [Secondary capability] for [secondary purpose].
```

**Requirements**:
- **First Sentence**: "Use to [primary action] by providing [key data elements] for [specific purpose]."
- **Optional Second Sentence**: "[Secondary capability] for [secondary purpose]."
- **Word Count**: 25-50 words total (1-2 sentences)
- **No Section Headers**: Do not use "Business Value:", "Primary Use Cases:", "Integration Patterns:" labels
- **Focus**: Practical capabilities and specific actions, not theoretical concepts
- **Active Voice**: Use strong action verbs (Use to, Check, Plan, Monitor, Determine, etc.)
- **Data-Specific**: Reference actual data fields and their purposes

**Canonical Examples**:
- **Vessel Resources**: "Use to identify vessels and check operational status by providing vessel identification, class information, and operational status for Washington State Ferry services."
- **Vessel Locations**: "Use to track real-time vessel positions and calculate arrival times by providing GPS coordinates, speed/heading data, and terminal departure/arrival information for WSF fleet monitoring. Determine current trip status, including start terminal, destination terminal, scheduled departure, at-dock status and ETA for this trip."
- **Vessel Stats**: "Use to analyze vessel specifications and plan maintenance by providing detailed technical specifications and performance characteristics for WSF operations. Compare vessel capabilities, plan maintenance schedules, and optimize fleet allocation."
- **Terminal Resources**: "Use to locate terminals and check facility amenities by providing terminal identification, operational status, and facility information for Washington State Ferry terminals. Verify accessibility features, parking availability, and regional service coverage."
- **Terminal Wait Times**: "Use to plan ferry terminal arrivals and estimate wait times by providing current terminal conditions, vehicle capacity information, and travel recommendations for WSF terminals. Determine optimal departure times, check vehicle holding area status, and manage passenger expectations for ferry travel."
- **Alert Resources**: "Use to monitor traffic incidents and plan alternate routes by providing real-time highway alerts, incident locations, and impact assessments for Washington State roads. Identify current traffic conditions, accident locations, construction zones, and weather-related road closures for travel planning."
- **Border Crossing Resources**: "Use to plan border crossing routes and estimate wait times by providing current crossing wait times, location details, and timestamp data for Washington State crossings into Canada. Check current conditions at I-5, SR-543, SR-539, and SR-9 crossings for optimal routing decisions."
- **Bridge Clearance Resources**: "Use to check bridge heights and plan commercial vehicle routes by providing vertical clearance measurements, bridge location data, and route information for Washington State bridges. Verify vehicle clearance requirements and identify height restrictions before planning routes with oversize loads."

#### 2.3 Endpoint Description Enhancement

**Template**:
```
Returns [multiplicity] of [DataType] for [scope].
```

**Requirements**:
- **Multiplicity**: Clear indication (single item, array, paginated list)
- **DataType**: Specific object type being returned
- **Scope**: Data range (all vessels, specific terminal, etc.)
- **Word Count**: 15-25 words per endpoint description
- **Consistency**: Use consistent terminology across related endpoints

**Examples**:
- **Collection Endpoints**: "Returns an array of [DataType] objects containing [data category] for all [resource type]."
- **Single Item Endpoints**: "Returns a [DataType] object containing [data category] for specified [resource type]."
- **Filtered Endpoints**: "Returns an array of [DataType] objects matching [filter criteria] for [resource type]."

### Phase 3: Quality Assurance

#### 3.1 Validation Checklist
For each completed endpoint group, verify:

- [ ] Agent has reviewed all of these required sources:
      [ ] Existing documentation and Zod schema
      [ ] Official API documentation
      [ ] Official endpoint documentation
      [ ] Brave search
      [ ] Actual endpoint data using fetch-dottie CLI tool
- [ ] Resource description follows two-sentence framework
- [ ] Resource description word count within guidelines (25-50 simple, 50-75 complex)
- [ ] Business context follows canonical pattern (Use to [action] by providing [data])
- [ ] Business context word count within guidelines (25-50 words)
- [ ] All endpoint descriptions follow standardized pattern
- [ ] Endpoint description word count within guidelines (15-25 words)
- [ ] Terminology is consistent across related endpoints
- [ ] Documentation reflects actual API behavior (not just official specs)
- [ ] Key field categories are mentioned in resource descriptions
- [ ] Integration patterns are documented in business context
- [ ] Use cases are specific and actionable
- [ ] All Phase 1 research sources reviewed (API specs, endpoint docs, online research, MCP tools)

#### 3.2 Quality Standards

**Word Count Limits**:
- resourceDescription: 25-50 words (simple), 50-75 words (complex)
- businessContext: 25-50 words total
- endpointDescription: 15-25 words

**Formatting Requirements**:
- Start resource descriptions with "Each [ResourceName] item represents..."
- Use consistent terminology across all endpoints
- Focus on business value and use cases, not technical implementation

**Content Requirements**:
- resourceDescription must include key field categories
- businessContext must include value proposition and use cases
- endpointDescription must clearly state multiplicity, data type, and scope

## Implementation Priorities

### Priority 1: Resource Description Enhancement
- Apply two-sentence framework to all resourceDescription fields
- Ensure word count compliance
- Include key field categories and data source information
- Use consistent terminology and structure

### Priority 2: Business Context Implementation
- Implement canonical pattern framework with enables/supports/essential structure
- Ensure word count compliance
- Include integration patterns and stakeholder needs
- Do not use section headers or labels

### Priority 3: Consistency Validation
- Ensure standardized pattern for endpoint descriptions
- Maintain word count compliance
- Verify consistency with resourceDescription
- Use clear, actionable language

## Field Population Guidelines

### Required Fields
- **resourceDescription**: Must be populated for all endpoint groups
- **businessContext**: Must be populated for all endpoint groups
- **endpointDescription**: Must be populated for all endpoints

### Optional Fields
- **updateFrequency**: Only populate if already exists or specifically required
- **relatedEndpoints**: Only populate if already exists or specifically required
- **usageExamples**: Only populate if already exists or specifically required

**Important**: Do not add fields beyond the existing scope unless explicitly required for the API group.

## Success Criteria

### Documentation Quality
- [ ] All resourceDescription fields follow two-sentence framework
- [ ] All businessContext fields follow canonical pattern (enables/supports/essential)
- [ ] All endpointDescription fields follow standardized pattern
- [ ] Word counts meet established guidelines
- [ ] Terminology is consistent across related endpoints

### Consistency
- [ ] Standardized patterns applied across all endpoint groups
- [ ] Resource descriptions follow established templates
- [ ] Business context uses canonical framework
- [ ] Endpoint descriptions use consistent terminology

### MCP Agent Effectiveness
- [ ] Documentation supports informed endpoint selection decisions
- [ ] Business context provides clear decision criteria
- [ ] Resource descriptions enable proper tool categorization
- [ ] Integration patterns documented for multi-endpoint workflows

## Implementation Timeline

### Phase 1: Research (2 weeks)
- Week 1: Analyze current documentation patterns across 3 representative APIs
- Week 2: Research official documentation and business context for all resource types

### Phase 2: Template Development (1 week)
- Week 3: Develop standardized templates for resourceDescription and businessContext
- Week 4: Create guidelines and examples for different resource types

### Phase 3: Implementation (6-8 weeks)
- Weeks 5-6: Implement enhanced documentation for wsf-vessels and wsf-terminals APIs
- Weeks 7-8: Implement enhanced documentation for wsf-fares and wsf-schedule APIs
- Weeks 9-10: Implement enhanced documentation for wsdot-highway-alerts and other WSDOT APIs
- Weeks 11-12: Complete remaining WSDOT APIs and quality assurance

### Phase 4: Quality Assurance (1 week)
- Week 13: Review and validate all enhanced documentation
- Week 14: Final adjustments and stakeholder review

## Deliverables

1. **Enhanced Documentation**: All sixteen API endpoint groups updated with improved resourceDescription and businessContext
2. **Template Library**: Standardized templates and guidelines for future documentation
3. **Implementation Guide**: Step-by-step instructions for applying templates to new endpoints
4. **Quality Report**: Summary of improvements and validation results
5. **Success Metrics**: Measurement of documentation quality and effectiveness improvements

This PRD provides a comprehensive framework for MCP agents to systematically enhance API documentation quality across all sixteen APIs while maintaining existing structure and focusing on business value delivery.