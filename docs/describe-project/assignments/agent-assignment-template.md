# Agent Assignment Template

*Use this template to create specific assignments for individual agents*

---

# Assignment: Agent [AGENT-NAME] - [API-NAME] API

[Agent Name], you are assigned to create complete documentation for the `[api-name]` API.

## Your Assignment Details

**API**: `[api-name]` (e.g., `wsdot-border-crossings`)
**Work Model**: Independent - no coordination with other agents  
**Agent Name**: [AGENT-NAME] (use this exact name in all files)
**Timeline**: [X-Y hours] total ([API complexity level])

## Essential Instructions

1. **Read the handbook FIRST**: `docs/describe-project/api-documentation-handbook.md`
2. **Work in sequence**: Phase 1 → Phase 2 → Phase 3 (do not skip phases)
3. **Create all files** in `src/apis/[api-name]/working/` with `.[agent-name]` suffix
4. **Use your agent name**: All files must include your name exactly as specified

## Phase Breakdown

### **Phase 1: Research & Domain Analysis ([X] hours)**
**Objective**: Understand business domain and gather sample data

**Key Steps**:
1. **Discover endpoints**: `list_dir src/clients/[api-name]/`
2. **Fetch sample data**: `npx fetch-dottie [functionName] --limit 500`
3. **Create domain analysis**: `domain-analysis.[agent-name].md`

**Critical**: Use exact function names from client files (e.g., `getBorderCrossings`, not `GetBorderCrossings`)

### **Phase 2: Schema Documentation ([X] hours)**  
**Objective**: Add `.describe()` annotations with business context

**🚨 CRITICAL**: NO cross-references in Phase 2 - wait until Phase 3

**Required Files**:
- `inputSchemas.[agent-name].ts` - Add `.describe()` to input fields
- `outputSchemas.[agent-name].ts` - Add `.describe()` + data freshness statement  
- `endpointDescriptions.[agent-name].json` - Business purpose only

**Data Freshness**: Must include exact statement in main output array schema:
- Border crossings: `"Data updates frequently."`
- Bridge clearances: `"Data updates infrequently."`
- [Add other API types as needed]

### **Phase 3: Integration & Cross-References ([X] hours)**
**Objective**: Add cross-references and final quality review

**Key Steps**:
1. **Add cross-references** to `endpointDescriptions.[agent-name].json` ONLY
2. **Maximum 2-4 cross-references** per endpoint
3. **Focus on high-value integrations**: Sequential workflows, real-time + context
4. **Final quality review** using handbook success criteria

## Critical Rules (READ CAREFULLY)

### **✅ ALWAYS DO:**
- Work in `/working/` subdirectory with your agent name suffix
- Use canonical imports: `@/apis/shared/schemaName.original`
- Add only `.describe()` annotations - never modify existing code structure
- Use real examples from actual API data with single quotes
- Document edge cases with business meaning

### **❌ NEVER DO:**
- Modify original schema files or existing code structure
- Add Zod methods (`.optional()`, `.nullable()`, etc.)
- Create agent-suffixed shared schema files
- Add cross-references before Phase 3
- Use relative import paths (`../` or `./`)

## Success Criteria

**Your completed work must achieve:**
- **100% field coverage** with business context descriptions
- **Real examples** from actual API data in all descriptions
- **Edge cases documented** with business meaning (not just technical details)
- **2-4 actionable cross-references** per endpoint (Phase 3 only)
- **Character limits respected**: 50-150 simple, 150-400 business, 400-600 complex max
- **Technical compliance**: Canonical imports, proper file structure

## Quality Self-Check

Before submitting, verify:
- [ ] All files in correct `/working/` directory with proper naming
- [ ] Only `.describe()` annotations added, no code structure changes
- [ ] Data freshness statement in correct location (main output array schema)
- [ ] All examples use single quotes and come from actual API data
- [ ] Cross-references only in endpoint descriptions, maximum 2-4 per endpoint
- [ ] All descriptions within character limits while maximizing business value

## Getting Help

**When to ask for assistance:**
- `fetch-dottie` command consistently fails
- Business concepts remain unclear after research
- Technical tools malfunction
- Quality standards unclear

**How to ask:**
- Document what you tried and what failed
- Include relevant error messages or file paths
- Specify whether this blocks all progress or just specific tasks

## Example File Structure

Your completed work should look like this:
```
src/apis/[api-name]/working/
├── domain-analysis.[agent-name].md
├── inputSchemas.[agent-name].ts
├── outputSchemas.[agent-name].ts
└── endpointDescriptions.[agent-name].json
```

## Start Here

1. **Read the handbook**: `docs/describe-project/api-documentation-handbook.md`
2. **Begin Phase 1**: Start with endpoint discovery and data fetching
3. **Follow sequentially**: Complete each phase before moving to the next
4. **Ask questions**: If anything is unclear, ask before proceeding

**Command to start data fetching**: `npx fetch-dottie [functionName] --limit 500`

Good luck, [Agent Name]! Create excellent documentation that serves both human developers and AI agents.

---

## Customization Notes for Assignment Creator

**Fill in these placeholders when creating specific assignments:**
- `[AGENT-NAME]`: Specific agent name (Alice, Bob, Charlie, etc.)
- `[API-NAME]`: Human-readable API name (Border Crossings API)
- `[api-name]`: Technical API name (wsdot-border-crossings)
- `[functionName]`: Actual function name from client files (getBorderCrossings)
- `[X-Y hours]`: Estimated time based on API complexity
- `[API complexity level]`: Simple/Medium/Complex API designation

**API Complexity Guidelines:**
- **Simple APIs** (1-2 endpoints, <10 fields): 4-6 hours total
- **Medium APIs** (2-3 endpoints, 10-15 fields): 6-8 hours total  
- **Complex APIs** (3+ endpoints, 15+ fields): 8-12 hours total
