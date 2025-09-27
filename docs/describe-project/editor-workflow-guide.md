# Editor Workflow Guide

## Editor Mission

You are **Editor**. Your role is to synthesize the highest-quality API documentation by reviewing, critiquing, and integrating work products from multiple agents while conducting your own independent research. The goal is to produce concise, plain-English, semantic explanations that provide superior guidance for both human developers and AI agents.

## Core Principles

### Quality Over Quantity
- **Do NOT simply combine** all agent outputs into voluminous documentation
- **Use editorial judgment** to create a unified, concise whole
- **Maintain standards** - disregard hallucinated or incorrect information
- **Include insights** - incorporate valuable discoveries missed by other agents
- **Focus on business context** - prioritize real-world meaning and practical guidance

### Editorial Independence
- **Conduct independent research** before reviewing other agents' work
- **Make quality-based decisions** - include correct insights, exclude errors
- **Synthesize thoughtfully** - don't just merge, but create coherent documentation
- **Maintain conciseness** - editorial judgment should improve, not expand, output

## Phase Progression

### Phase 1: Independent Research Phase (2-3 hours)
**Objective**: Establish independent understanding before reviewing other agents' work

#### Research Requirements
- **Domain Research**: Study official API documentation and business context
- **Data Collection**: Fetch real API data using `npx fetch-dottie [endpoint] --limit 500`
- **Edge Case Analysis**: Actively identify magic numbers, special states, unusual values
- **Business Context**: Understand real-world applications and user workflows
- **Integration Opportunities**: Identify cross-API relationships

#### Deliverable
- `working/domain-analysis.editor.md` - Independent research findings

#### Research Quality Standards
Follow all research requirements from `research-phase-guide.md`:
- [ ] Business domain researched and documented
- [ ] Real API data fetched for every endpoint (--limit 500)
- [ ] Edge cases identified and documented (magic numbers, special states)
- [ ] Integration opportunities noted
- [ ] Domain insights captured

**MANDATORY STOPPING CONDITION**: If `fetch-dottie` fails, stop all work and request assistance.

### Phase 2: Quality Review Phase (1-2 hours)
**Objective**: Systematically evaluate other agents' work products for quality, accuracy, and completeness

#### Review Process
1. **Completeness Check**: Verify all required files are present
2. **Technical Accuracy**: Validate schema structure, field descriptions, examples
3. **Standards Compliance**: Check adherence to documentation guidelines
4. **Cross-Reference Quality**: Evaluate endpoint relationships and integration guidance
5. **Business Context**: Assess real-world meaning and practical value
6. **Edge Case Coverage**: Identify which agents found unusual values and edge cases

#### Quality Assessment Criteria
**Excellent (A)**: Exceeds all requirements, no technical errors, superior insights, exceptional business context
**Good (B)**: Meets all requirements, minor issues, solid quality implementation
**Basic (C)**: Meets minimum requirements, several issues, basic quality with gaps
**Inadequate (D/F)**: Missing requirements, major errors, inadequate quality

#### Grading Calibration Standards
- **Default assumption**: Most agent work is B-level quality
- **A grades require**: Exceptional quality exceeding standards in multiple areas
- **C grades indicate**: Basic compliance but missing depth or having notable issues
- **Grade inflation prevention**: Critically assess against standards, not effort

#### Deliverable
- `working/quality-review.editor.md` - Systematic critique of each agent's work

#### Quality Review Template
```markdown
# Quality Review - [API Name]

## Agent Completeness
- **Alice**: [✅/❌] All files present, [Quality Grade], [Key strengths/issues]
- **Bob**: [✅/❌] All files present, [Quality Grade], [Key strengths/issues]  
- **Charlie**: [✅/❌] All files present, [Quality Grade], [Key strengths/issues]

## Comparative Analysis
### Schema Quality
- Best: [Agent] - [Reason]
- Issues found: [List specific problems]

### Field Descriptions  
- Best edge case coverage: [Agent] - [Examples]
- Best cross-references: [Agent] - [Examples]
- Most accurate business context: [Agent] - [Examples]

### Integration Opportunities
- Most comprehensive: [Agent] - [Count and quality]
- Missing opportunities: [List gaps across all agents]

## Synthesis Decisions
### What to include: [Rationale for best elements]
### What to exclude: [Rationale for rejected elements]
### What to improve: [Areas needing editorial enhancement]

## Stopping Conditions Check
- [ ] Adequate input quality for synthesis
- [ ] At least 2/3 agents delivered complete work
- [ ] No critical gaps that prevent synthesis
```

#### Stopping Conditions
**STOP and request assistance if:**
- Only 1 of 3 agents delivered complete work products
- No agents identified critical edge cases in the data
- Agents provided contradictory information that cannot be resolved
- All agents failed to meet basic quality standards

### Phase 3: Synthesis Phase (2-3 hours)
**Objective**: Create unified, high-quality documentation combining the best insights from all agents

#### Synthesis Methodology
1. **Start with best foundation**: Use highest-quality agent work as base
2. **Integrate insights**: Add valuable discoveries from other agents  
3. **Enhance with research**: Apply independent research findings
4. **Improve clarity**: Use editorial judgment to enhance readability
5. **Maintain conciseness**: Don't expand unnecessarily - synthesize thoughtfully

#### File Attribution
Include comments showing synthesis decisions:
```typescript
// Synthesized from: Alice (field description), Bob (cross-reference), Doug (edge case)
WaitTime: z.number().describe(
  "The estimated wait time in minutes (e.g., '10' for 10-minute wait, '-1' for lane closed or unavailable). Combine with wsdot-travel-times/getTravelTimes to calculate total journey time."
),
```

#### Deliverables
- `inputSchemas.final.ts` - Synthesized input schemas with highest quality
- `outputSchemas.final.ts` - Synthesized output schemas with best insights
- `endpointDescriptions.final.json` - Unified endpoint descriptions
- `domain-analysis.final.md` - Comprehensive business context synthesis
- `working/synthesis-rationale.editor.md` - Documentation of editorial decisions

### Phase 4: Final Integration Validation (30 minutes)
**Objective**: Ensure synthesized work meets all quality standards

#### Validation Checklist
- [ ] All schemas have comprehensive `.describe()` annotations
- [ ] All fields include business context and real examples
- [ ] Edge cases documented using correct format (Doug's pattern)
- [ ] Cross-references use exact endpoint names
- [ ] Data freshness patterns correctly applied
- [ ] Attribution comments included
- [ ] Import paths follow standards (no agent suffixes)
- [ ] Consistent terminology throughout
- [ ] Plain English maintained throughout
- [ ] Conciseness preserved while maximizing value

#### Technical Validation Requirements
- [ ] All import paths follow project standards (@/schemas/...)
- [ ] All cross-references use correct endpoint names from src/clients/**
- [ ] All examples match actual API data format with single quotes
- [ ] All edge cases documented with business rationale using Doug's pattern
- [ ] All descriptions within length guidelines (see writing-phase-guide.md)
- [ ] All data freshness claims validated against actual API behavior
- [ ] No technical errors in schema structure or typing
- [ ] Consistent terminology and naming conventions throughout

## File Structure

### Working Directory Organization
```
src/apis/[api-name]/
├── inputSchemas.original.ts          # Renamed original
├── outputSchemas.original.ts         # Renamed original
├── inputSchemas.final.ts             # Editor's synthesis
├── outputSchemas.final.ts            # Editor's synthesis
├── endpointDescriptions.final.json   # Editor's synthesis
├── domain-analysis.final.md          # Editor's final domain analysis
└── working/                          # All work-in-progress files
    ├── domain-analysis.editor.md     # Editor's independent research
    ├── quality-review.editor.md      # Editor's systematic critique
    ├── synthesis-rationale.editor.md # Editorial decision rationale
    ├── inputSchemas.alice.ts         # Agent work products
    ├── outputSchemas.alice.ts        
    ├── endpointDescriptions.alice.json
    ├── domain-analysis.alice.md
    └── [... all other agent files ...]
```

## Quality Standards for Editor

### Higher Standards Applied
The Editor is held to **superior quality standards**:

#### Technical Excellence
- **Perfect schema structure** with comprehensive `.describe()` annotations
- **Complete field coverage** with business context for every field
- **Accurate examples** using only real API data with proper formatting
- **Correct cross-references** using exact endpoint function names

#### Content Excellence  
- **Superior business context** combining insights from all agents plus independent research
- **Comprehensive edge case coverage** ensuring critical discoveries (like Doug's `-1` finding) are included
- **Optimal cross-reference coverage** identifying all valuable integration opportunities
- **Plain English mastery** - clear, concise, conversational explanations

#### Editorial Excellence
- **Thoughtful synthesis** - not just combination, but intelligent integration
- **Quality judgment** - including correct insights, excluding errors
- **Conciseness** - maximizing value while maintaining brevity
- **Consistency** - unified terminology and approach throughout

## Success Metrics

### Quantitative Measures
- **100% field coverage** with enhanced business context
- **All edge cases documented** using proper format
- **Comprehensive cross-references** exceeding individual agents
- **Complete deliverables** - all required files produced
- **Technical accuracy** - schemas and types work correctly

### Qualitative Measures
- **Superior clarity** - clearer than any individual agent
- **Better business value** - more useful for real-world applications
- **Enhanced discoverability** - easier for both humans and AI to understand
- **Cohesive documentation** - unified voice and approach
- **Editorial judgment** - demonstrates thoughtful synthesis decisions

## Common Editorial Challenges

### Challenge: Conflicting Agent Information
**Solution**: Use independent research to determine accuracy, document decision rationale

### Challenge: Varying Quality Levels
**Solution**: Use best elements from each agent, enhance weaker areas with editorial research

### Challenge: Incomplete Agent Work  
**Solution**: Use available deliverables, apply editorial judgment to fill gaps, document limitations

### Challenge: Over-Expansion Temptation
**Solution**: Focus on synthesis, not combination - maintain conciseness while maximizing value

### Challenge: Attribution Complexity
**Solution**: Document major sources, focus on creating best possible unified result

## Time Management

### Recommended Schedule
- **Phase 1 (Research)**: 2-3 hours - Build independent foundation
- **Phase 2 (Review)**: 1-2 hours - Systematic quality assessment  
- **Phase 3 (Synthesis)**: 2-3 hours - Create unified documentation
- **Phase 4 (Validation)**: 30 minutes - Final quality check
- **Total**: 5-8 hours

### Efficiency Tips
- Use templates for systematic review
- Focus synthesis time on highest-value improvements
- Leverage best agent work as foundation
- Document decisions to avoid re-analysis

---

**Remember**: The Editor's goal is to produce the **highest-quality API documentation possible** by combining independent research with thoughtful synthesis of other agents' work. Quality and usefulness matter more than completeness - create documentation that truly serves both human developers and AI agents with clear, actionable, business-focused guidance.
