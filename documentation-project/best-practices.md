# API Documentation Best Practices Report: Human, MCP Agent, and Hybrid Documentation (October 2025)

## Executive Summary

This report provides comprehensive guidelines for API documentation that serves both human consumers and MCP (Model Context Protocol) agents, with emphasis on hybrid documentation approaches. The research covers best practices for human-readable documentation (like OpenAPI), MCP agent documentation (via MCP tools), and documentation that effectively serves both audiences simultaneously.

## 1. Human-Readable API Documentation Best Practices

### 1.1 Top-Level Endpoint Descriptions

**Content Structure:**
- **Clear Purpose Statement**: Begin with a concise 1-2 sentence description of what the endpoint does and its business purpose
- **Contextual Information**: Explain how the endpoint fits within the broader system or business workflow
- **Usage Examples**: Provide 2-3 concrete examples of when and why to use the endpoint
- **Success/Failure Scenarios**: Describe typical success responses and common failure conditions
- **Rate Limiting Information**: Include any rate limits, quotas, or usage constraints

**Length Guidelines:**
- Individual endpoint descriptions: 50-150 words
- Group descriptions (for endpoints returning different views of same data): 100-250 words
- Include bullet points for complex information to improve readability

**Structural Recommendations:**
- Use consistent terminology across all endpoint descriptions
- Follow a standard template: Purpose → Parameters → Response → Error Cases → Examples
- Include business context, not just technical details
- Provide links to related endpoints or resources

### 1.2 Input/Output Schema Documentation (Zod Context)

**Content Requirements:**
- **Business Context**: Explain what each schema represents in business terms
- **Validation Rules**: Clearly document all validation constraints, required fields, and business rules
- **Default Values**: Specify any default values and when they apply
- **Transformation Logic**: Document any field transformations or computed values
- **Relationships**: Explain how this schema relates to other schemas in the system

**Documentation Style:**
- Use clear, business-focused language rather than technical jargon
- Include example values for each field type
- Document the reasoning behind validation constraints
- Specify which fields are optional vs. required in different contexts

### 1.3 Field-Level Descriptions (Zod Context)

**Essential Information:**
- **Business Purpose**: What the field represents in business terms
- **Valid Values**: Range of acceptable values, enum options, or format requirements
- **Default Behavior**: What happens if the field is omitted
- **Business Rules**: Any business constraints or implications
- **Examples**: Concrete examples of valid values

**Best Practices:**
- Keep descriptions concise but complete (15-40 words per field)
- Use consistent terminology across all fields
- Include units of measure where applicable
- Document any field dependencies or conditional requirements

## 2. MCP Agent API Documentation Best Practices

### 2.1 Tool Descriptions for MCP Agents

**Content Structure:**
- **Action Description**: Clear, imperative language describing what the tool does
- **Input Requirements**: Precise specification of all required and optional parameters
- **Output Format**: Detailed description of the response structure and content
- **Error Conditions**: List of possible error states and their implications
- **Context Requirements**: Any prerequisites or state requirements before calling

**Optimization for Agents:**
- Use action-oriented language (e.g., "Retrieves user information by ID")
- Include parameter type information explicitly
- Provide clear success/failure indicators
- Minimize ambiguous language or conditional statements

### 2.2 Schema Documentation for MCP

**Agent-Focused Content:**
- **Type Information**: Explicit data types for all fields and parameters
- **Validation Rules**: Machine-readable validation constraints
- **Relationships**: Clear indication of dependencies between fields
- **Cardinality**: Specify one-to-one, one-to-many relationships explicitly
- **State Information**: Document any state changes the operation performs

## 3. Hybrid Human/Agent API Documentation

### 3.1 Dual-Purpose Documentation Structure

**Content Strategy:**
- **Layered Information**: Start with human-readable summary, then provide technical details
- **Contextual Switching**: Allow documentation to be consumed at different levels of detail
- **Standardized Metadata**: Include both human-readable descriptions and machine-readable specifications
- **Example Integration**: Provide both human examples and machine test cases

**Implementation Approach:**
- Use OpenAPI specifications with rich descriptions that serve both audiences
- Leverage Zod schemas with comprehensive metadata for dual consumption
- Include both business context and technical specifications in the same document
- Provide different view modes or sections for human vs. agent consumption

### 3.2 Unified Documentation Standards

**Content Requirements:**
- **Consistent Terminology**: Maintain the same terms for both human and agent documentation
- **Structured Metadata**: Include both human-readable descriptions and machine-processable information
- **Validation Integration**: Embed validation rules within descriptive text
- **Example Multiplicity**: Provide examples suitable for both human understanding and agent testing

## 4. Content Structure Guidelines

### 4.1 Endpoint Group Documentation

For endpoints returning different views of the same data (e.g., single entity vs. list):
- **Common Foundation**: Document shared schema and business logic first
- **View-Specific Details**: Highlight differences in each endpoint's response format
- **Use Case Differentiation**: Explain when to use each view
- **Performance Considerations**: Note any performance differences between views

### 4.2 Schema Documentation Hierarchy

**Top-Level Schema Documentation:**
- Business purpose and context
- Primary use cases
- Relationship to other schemas
- Versioning information

**Field-Level Documentation:**
- Individual field purpose
- Validation constraints
- Business rules
- Example values

### 4.3 Field Description Standards

**Information Hierarchy:**
1. Business purpose (primary)
2. Technical type and constraints
3. Validation rules
4. Example values
5. Business implications

**Content Priorities:**
- **Include**: Business context, validation rules, examples, dependencies
- **Omit**: Implementation details, internal notes, irrelevant technical specifications
- **Minimize**: Boilerplate text, redundant information, overly technical jargon

## 5. Length and Detail Guidelines

### 5.1 Documentation Length Recommendations

- **Endpoint Descriptions**: 50-150 words (human), 25-75 words (agent), 75-200 words (hybrid)
- **Schema Descriptions**: 25-75 words per schema, plus 10-25 words per field
- **Field Descriptions**: 15-40 words per field
- **Group Descriptions**: 100-250 words for related endpoint groups

### 5.2 Content Density

**Optimal Information Density:**
- 1-2 sentences per distinct piece of information
- Bullet points for lists of 3+ items
- Examples integrated within descriptive text
- Cross-references to related documentation

## 6. Structural Recommendations

### 6.1 Documentation Organization

**Recommended Structure:**
1. Business overview and purpose
2. Technical specifications and constraints
3. Usage examples and scenarios
4. Error handling and edge cases
5. Related resources and endpoints

### 6.2 Accessibility for Both Audiences

**Human-Optimized Features:**
- Natural language explanations
- Business context and reasoning
- Visual examples and analogies
- Progressive disclosure of complexity

**Agent-Optimized Features:**
- Structured, predictable format
- Explicit type and validation information
- Machine-readable metadata
- Consistent formatting and terminology

## 7. Implementation Best Practices

### 7.1 Documentation Generation

- **Single Source of Truth**: Generate documentation from code/schema definitions
- **Automated Updates**: Ensure documentation stays synchronized with implementations
- **Version Control**: Track documentation changes alongside code changes
- **Validation**: Verify documentation accuracy through automated testing

### 7.2 Maintenance and Evolution

- **Regular Review**: Schedule periodic documentation reviews
- **Feedback Integration**: Collect and incorporate feedback from both human users and agent interactions
- **Incremental Updates**: Make documentation improvements continuously rather than in large batches
- **Quality Metrics**: Track documentation effectiveness through usage metrics and feedback

This comprehensive approach ensures that API documentation serves both human developers and MCP agents effectively, while maintaining consistency and reducing maintenance overhead through unified documentation strategies.