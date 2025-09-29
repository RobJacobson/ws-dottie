# Editor Assignment: Multi-Agent Synthesis

## 🚨 CRITICAL COMPLIANCE VERIFICATION 🚨

**BEFORE STARTING ANY WORK:**
1. **Read these constraints 3 times**
2. **Create a compliance checklist**
3. **Verify you understand what NOT to do**

### **ZERO TOLERANCE RULES (IMMEDIATE FAILING GRADE IF VIOLATED):**
- ❌ **NEVER modify existing JSDoc comments** - they must be preserved exactly as written
- ❌ **NEVER create new files** unless explicitly required in deliverables
- ❌ **NEVER change code structure** - only add `.describe()` annotations
- ❌ **NEVER modify import statements** in original files
- ❌ **NEVER add new Zod methods** (`.optional()`, `.nullable()`, etc.)
- ✅ **ONLY add `.describe()` annotations** to Zod schemas
- ✅ **ONLY work in designated directories** (`/working/` for agents, main API dir for final files)

### **MANDATORY PRE-EXECUTION VALIDATION:**
```yaml
BEFORE_STARTING:
  - [ ] Read ALL instructions completely
  - [ ] Identify CRITICAL constraints (ZERO TOLERANCE rules)
  - [ ] Create a compliance checklist
  - [ ] Verify understanding of what NOT to do
  - [ ] Acknowledge that violation = immediate failing grade
```

### **REAL-TIME COMPLIANCE MONITORING:**
```yaml
AFTER_EACH_OPERATION:
  - [ ] Verify no JSDoc comments were modified
  - [ ] Verify no new files were created
  - [ ] Verify only .describe() annotations were added
  - [ ] Verify original code structure unchanged
  - [ ] If ANY violation detected: STOP immediately and report
```

You are the **Editor** responsible for synthesizing multiple agent outputs into optimal final documentation.

## Your Assignment

**APIs to Synthesize**: 
- `wsdot-bridge-clearances` (11 agent outputs available)
- `wsdot-border-crossings` (3 agent outputs available)

**Available Agent Work**:
- **Bridge Clearances**: Alice, Bob, Charlie, Doug, Eric, Francis, George, Harriet, Jacob (+ 2 others)
- **Border Crossings**: Alice, Bob, Charlie

**Timeline**: 6-10 hours total
**Output**: Superior synthesized documentation ready for production deployment

## Essential Instructions

1. **Read the handbook FIRST**: `docs/describe-project/api-documentation-handbook.md`
2. **Focus on Sections 5-7**: Editor synthesis workflows, quality assessment, final integration
3. **Work systematically**: Don't try to synthesize everything at once
4. **Document your decisions**: Create synthesis reports explaining your choices

## Critical Format Requirements

**MANDATORY:** All field descriptions must follow this format:
`"[Business purpose], as [business-focused data type]. E.g., '[example]' for [context]. [Additional context if needed]."`

**Quick Reference:**
- String IDs: `"...identifier for..., as a string. E.g., 'I5' for..."`
- Timestamps: `"...timestamp for..., as a UTC date. E.g., '2025-09-29T14:30:00.000Z' for..."`
- Coordinates: `"...coordinate for..., in decimal degrees. E.g., '47.961343' for..."`
- Wait times: `"...wait time for..., in minutes. E.g., '15' for..."`
- Boolean flags: `"...indicator for..., as a boolean flag. True means..., false means..."`

**Critical Accuracy Rule:**
Never speculate about specific reasons for edge cases. Document observable behavior:
- ✅ `"Returns '-1' when the lane is closed or data is unavailable."`
- ❌ `"Returns '-1' when closed for maintenance, emergencies, or weather."`

## Editor Workflow (Follow This Sequence)

### **Step 1: Quality Assessment (2 hours)**
**Objective**: Evaluate all agent outputs using the handbook's scoring framework

**MANDATORY FIRST STEP: Data Verification**
- [ ] **Fetch current API data** using `npx fetch-dottie [endpoint] --limit 500`
- [ ] **Verify all agent examples** against live data for accuracy
- [ ] **Identify new patterns** or edge cases agents may have missed
- [ ] **Document discrepancies** that will inform synthesis decisions

**COMPLIANCE CHECKPOINT 1:**
- [ ] **Read original schema files** to understand what must be preserved
- [ ] **Identify all JSDoc comments** that must remain unchanged
- [ ] **Plan only .describe() additions** - no other modifications
- [ ] **Verify no new files needed** beyond required deliverables

**For each API, assess each agent's work:**
- **Schema Quality (40%)**: Field coverage, business context, edge cases, examples, length
- **Technical Compliance (30%)**: Import paths, code structure, data freshness placement
- **Cross-Reference Quality (20%)**: Integration value, accuracy, natural flow, appropriate scope
- **Domain Understanding (10%)**: Business insight, user perspective, real-world application

**Create assessment matrices** like this:
```
| Agent | Schema Quality | Technical | Cross-Refs | Domain | Total Score | Notes |
|-------|---------------|-----------|------------|---------|-------------|-------|
| Alice | 3.2/4.0      | 4.0/4.0   | 2.8/4.0   | 3.5/4.0 | 3.4/4.0    | Strong technical, weak cross-refs |
| Bob   | 2.8/4.0      | 3.5/4.0   | 3.8/4.0   | 3.2/4.0 | 3.3/4.0    | Excellent cross-refs |
```

### **Step 2: Comparative Analysis (2-3 hours)**
**Objective**: Identify best elements from each agent for synthesis

**For each field/section, determine:**
- Which agent has the **best overall description**?
- Are there **superior elements** in other agents' versions?
- Can you **synthesize a hybrid** that's better than any individual version?
- Does the **length need optimization**?

**Example comparison process:**
```typescript
// Field: BridgeHeight
// Alice: Great business context, too long (180 chars)
// Bob: Good edge cases, weak context (95 chars)  
// Charlie: Perfect examples, adequate context (140 chars)
// SYNTHESIS DECISION: Use Charlie's structure + Alice's business context + Bob's edge cases
```

### **Step 3: Synthesis Process (3-4 hours)**
**Objective**: Create superior final documentation

**COMPLIANCE CHECKPOINT 2:**
- [ ] **Before creating any files**: Verify you understand what must be preserved
- [ ] **Plan synthesis approach**: Only .describe() additions, no structural changes
- [ ] **Identify source files**: Use original schemas as base, not agent files
- [ ] **Verify import paths**: Use canonical `@/apis/shared/` format only

**For each API:**
1. **Start with highest-scoring agent** as base
2. **Enhance with best elements** from other agents
3. **Optimize length** while preserving value
4. **Ensure consistency** across all descriptions
5. **Perfect technical compliance** (imports, structure, JSDoc preservation, etc.)

**MANDATORY FILE CREATION PROTOCOL:**
- [ ] **Read original schema file** completely before modifying
- [ ] **Copy original file** to create base for synthesis
- [ ] **Add ONLY .describe() annotations** - no other changes
- [ ] **Preserve ALL JSDoc comments** exactly as written
- [ ] **Verify after each field** - no structural changes made
- [ ] **Test import paths** before finalizing

**Create these synthesized files:**
- `inputSchemas.final.ts` (in main API directory)
- `outputSchemas.final.ts` (in main API directory)
- `endpointDescriptions.final.json` (in main API directory)
- `synthesis-report.final.md` (in `/working/` directory)

### **Step 4: Final Quality Review (1 hour)**
**Objective**: Ensure production readiness

**COMPLIANCE CHECKPOINT 3:**
- [ ] **Compare final files with originals**: Verify JSDoc comments unchanged
- [ ] **Verify no new files created**: Only required deliverables exist
- [ ] **Check import paths**: All use canonical `@/apis/shared/` format
- [ ] **Validate structure**: Only .describe() annotations added
- [ ] **Test file compilation**: No TypeScript errors

**Apply final checklist:**
- [ ] All descriptions within character limits
- [ ] 100% field coverage with business context
- [ ] Edge cases documented with business meaning
- [ ] Cross-references actionable and specific (2-4 max per endpoint)
- [ ] Technical compliance perfect (imports, structure, data freshness)
- [ ] **All original JSDoc comments preserved unchanged** (/** Original comment */)
- [ ] Consistent voice and approach across all content

**MANDATORY COMPLIANCE AUDIT:**
- [ ] **JSDoc Preservation**: 100% of original comments unchanged
- [ ] **File Creation**: 0% new files beyond required deliverables
- [ ] **Code Structure**: 100% original structure preserved
- [ ] **Modification Scope**: Only .describe() annotations added
- [ ] **Import Compliance**: All paths use canonical format

## Synthesis Decision Framework

### **When Multiple Agents Have Good Descriptions:**
1. **Identify the core strength** of each version
2. **Determine if synthesis adds value** vs. just picking the best
3. **Optimize for maximum information density** within character limits
4. **Maintain natural language flow**

### **Length Optimization Strategies:**
- **Prioritize business value** over technical details
- **Consolidate similar examples** (remove redundant cases)
- **Streamline edge case explanations** (focus on most important)
- **Optimize word choice** (remove unnecessary qualifiers)
- **Preserve core meaning** while reducing length

### **Cross-Reference Synthesis:**
1. **Collect all cross-references** from all agents
2. **Apply integration value assessment** (High/Medium/Low from handbook)
3. **Select top 2-4 highest value integrations**
4. **Optimize language** for natural flow
5. **Verify endpoint accuracy** against project documentation

## Success Criteria

### **Your Final Output Must Be:**
- **Superior to any individual agent**: Best elements combined and optimized
- **Technically perfect**: Flawless imports, structure, compliance
- **Consistently excellent**: No quality variations between sections
- **Production ready**: Meets all deployment requirements

### **Measurable Outcomes:**
- **Coverage**: 100% of fields have enhanced descriptions
- **Length compliance**: 0% of descriptions exceed character limits  
- **Cross-reference accuracy**: 100% of endpoint references are correct
- **Synthesis value**: Final output demonstrably better than best individual agent
- **JSDoc preservation**: 100% of original comments unchanged
- **File creation**: 0% new files beyond required deliverables
- **Code structure**: 100% original structure preserved
- **Modification scope**: Only .describe() annotations added

## Your Deliverables

### **Required Files** (create final deliverables in main API directories):
```
src/apis/wsdot-bridge-clearances/
├── inputSchemas.final.ts
├── outputSchemas.final.ts  
├── endpointDescriptions.final.json
└── working/synthesis-report.final.md

src/apis/wsdot-border-crossings/
├── inputSchemas.final.ts
├── outputSchemas.final.ts
├── endpointDescriptions.final.json  
└── working/synthesis-report.final.md
```

**File Placement Rules:**
- **Final synthesized schemas and endpoints**: Main API directory with `.final` suffix
- **Synthesis reports**: Keep in `/working/` directory for reference and documentation

### **Synthesis Report Template:**
```markdown
# Synthesis Report - [API Name]

## Agent Assessment Summary
- **Highest Overall Score**: [Agent] (X.X/4.0)
- **Best Schema Quality**: [Agent] 
- **Best Cross-References**: [Agent]
- **Best Technical Compliance**: [Agent]

## Key Synthesis Decisions
1. **Field [Name]**: Used [Agent]'s base + [Agent]'s examples because...
2. **Cross-References**: Selected [specific integrations] over [others] because...
3. **Length Optimizations**: Reduced [specific areas] while preserving [key value]...

## Quality Improvements Achieved
- **Length optimization**: Reduced average description length by X% while increasing value
- **Consistency**: Unified voice and parallel language across all descriptions
- **Technical excellence**: Fixed [specific issues] found in agent outputs
- **Integration intelligence**: Enhanced cross-references for better workflow support

## Final Assessment
- **Character limit compliance**: 100% (X/X descriptions within limits)
- **Business context quality**: [assessment]
- **Cross-reference value**: [assessment] 
- **Ready for production**: [Yes/No with rationale]
```

## Getting Started

1. **Read handbook Sections 5-7** thoroughly
2. **Start with bridge clearances** (more agent outputs = better synthesis practice)
3. **Create your assessment matrix** before any synthesis work
4. **Work systematically** - don't skip the evaluation phase
5. **Document your reasoning** as you make synthesis decisions

## Error Recovery Protocols

### **When You Encounter Issues:**

**Import Errors:**
- [ ] **STOP immediately** - do not create new files
- [ ] **Check existing patterns** in other API directories
- [ ] **Look for correct import paths** in working agent files
- [ ] **Ask for guidance** if unclear - do not guess

**Missing Files:**
- [ ] **STOP immediately** - do not create new files
- [ ] **Check if file should exist** based on deliverables list
- [ ] **Ask for guidance** on correct approach
- [ ] **Do not proceed** until clarified

**Constraint Violations:**
- [ ] **STOP immediately** when any ZERO TOLERANCE rule violated
- [ ] **Report the violation** and what you were trying to do
- [ ] **Request guidance** on correct approach
- [ ] **Do not attempt to fix** without explicit instruction

**Unclear Requirements:**
- [ ] **STOP work** and ask for clarification
- [ ] **Be specific** about what is unclear
- [ ] **Do not proceed** with assumptions
- [ ] **Wait for guidance** before continuing

## Questions?

- **Process questions**: Reference handbook troubleshooting guide
- **Quality standards**: Use handbook assessment frameworks  
- **Technical issues**: Stop work and request assistance
- **Unclear requirements**: Ask for clarification before proceeding
- **Constraint violations**: STOP and report immediately

**Remember**: Your goal is to create documentation that's demonstrably superior to any individual agent's work while maintaining 100% compliance with ZERO TOLERANCE rules. Take the time to do proper assessment and synthesis - the quality of your final output depends on it.

**Start by reading handbook Sections 5-7, then begin with quality assessment of the bridge clearances agent outputs.**

## MANDATORY COMPLETION CERTIFICATION

**Before submitting your work, you MUST:**

1. **Re-read these instructions completely**
2. **Verify you have followed EVERY instruction**
3. **Certify your compliance in your final response**

**Enhanced Certification Template:**
```
I certify that I have:
✅ Read and followed ALL instructions in this assignment
✅ Completed mandatory pre-execution validation checklist
✅ Preserved ALL original JSDoc comments unchanged (ZERO TOLERANCE)
✅ Only added .describe() annotations to Zod schemas
✅ Created NO new files beyond required deliverables
✅ Modified NO code structure beyond .describe() additions
✅ Used ONLY canonical import paths (@/apis/shared/)
✅ Followed the critical format requirements
✅ Applied the quality assessment framework
✅ Created synthesis reports as required
✅ Completed all compliance checkpoints
✅ Verified technical compliance with final audit
✅ Met all success criteria including ZERO TOLERANCE rules

I understand that violation of ANY ZERO TOLERANCE rule results in immediate failing grade.
I acknowledge that I have been explicitly warned about these constraints.
```

**You must include this certification in your final response to the user.**
