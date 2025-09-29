# Assignment Examples

*Ready-to-use assignments for common scenarios*

---

## Example 1: Simple API Assignment

```markdown
# Assignment: Agent Alice - Border Crossings API

Alice, you are assigned to create complete documentation for the `wsdot-border-crossings` API.

**API**: `wsdot-border-crossings`
**Work Model**: Independent - no coordination with other agents  
**Agent Name**: alice (use this exact name in all files)
**Timeline**: 5-6 hours total (Simple API)

**Phase 1**: Research & domain analysis (1.5 hours)
**Phase 2**: Schema documentation, NO cross-references (2.5 hours)  
**Phase 3**: Add cross-references and final review (1.5 hours)

**Essential Instructions**:
1. Read `docs/describe-project/api-documentation-handbook.md` first
2. Work in `src/apis/wsdot-border-crossings/working/` with `.alice` suffix
3. Start with: `npx fetch-dottie getBorderCrossings --limit 500`

**Data Freshness Statement**: `"Data updates frequently."` (in main output array schema)

Questions? Ask before proceeding. Good luck!
```

---

## Example 2: Complex API Assignment

```markdown
# Assignment: Agent Bob - Ferry Vessels API

Bob, you are assigned to create complete documentation for the `wsf-vessels` API.

**API**: `wsf-vessels`
**Work Model**: Independent - no coordination with other agents
**Agent Name**: bob (use this exact name in all files)  
**Timeline**: 10-12 hours total (Complex API - multiple endpoints)

**Phase 1**: Research & domain analysis (3 hours)
**Phase 2**: Schema documentation, NO cross-references (6 hours)
**Phase 3**: Add cross-references and final review (3 hours)

**Essential Instructions**:
1. Read `docs/describe-project/api-documentation-handbook.md` first
2. Work in `src/apis/wsf-vessels/working/` with `.bob` suffix
3. Multiple endpoints - work on one at a time in this order:
   - `getVesselBasics` 
   - `getVesselLocations`
   - `getVesselStats`

**Data Freshness Statements**:
- Vessel basics/stats: `"Data updates infrequently."`
- Vessel locations: `"Data is real-time."`

**Context Management**: This is a large API - work in batches and summarize findings between endpoints.

Questions? Ask before proceeding. Good luck!
```

---

## Example 3: Editor Assignment (Real Scenario)

```markdown
# Editor Assignment: Bridge Clearances Synthesis

You are the Editor responsible for synthesizing bridge clearances documentation from 11 agent outputs.

**API**: `wsdot-bridge-clearances`
**Available Agents**: Alice, Bob, Charlie, Doug, Eric, Francis, George, Harriet, Jacob (+ 2 others)
**Timeline**: 8-10 hours total
**Priority**: High - this will demonstrate the synthesis process

**Your Workflow**:
1. **Quality Assessment** (2.5 hours): Score all 11 agents using handbook framework
2. **Comparative Analysis** (2.5 hours): Create comparison matrices for each field
3. **Synthesis Process** (4 hours): Combine best elements, optimize length
4. **Final Review** (1 hour): Apply production readiness checklist

**Key Focus Areas**:
- **Length optimization**: Many agents likely exceeded character limits
- **Cross-reference quality**: Evaluate integration value across all agents
- **Consistency**: Ensure unified voice across all descriptions
- **Technical compliance**: Perfect imports and structure

**Deliverables**:
- `inputSchemas.editor.ts`
- `outputSchemas.editor.ts`
- `endpointDescriptions.editor.json`
- `synthesis-report.editor.md`

**Success Metric**: Your final output must be demonstrably superior to the best individual agent.

Start with handbook Sections 5-7, then begin quality assessment. Document your decisions!
```

---

## Example 4: Multi-API Agent Assignment

```markdown
# Assignment: Agent Charlie - Traffic APIs Batch

Charlie, you are assigned to create documentation for multiple related traffic APIs.

**APIs**: 
- `wsdot-traffic-flow` (Primary focus)
- `wsdot-travel-times` (Secondary)

**Work Model**: Independent - complete both APIs sequentially
**Agent Name**: charlie (use this exact name in all files)
**Timeline**: 12-15 hours total (2 Medium APIs)

**Batch Processing Strategy**:
1. **Complete all 3 phases** for `wsdot-traffic-flow` first
2. **Then complete all 3 phases** for `wsdot-travel-times`
3. **Final integration review** across both APIs

**Phase Distribution**:
- **Traffic Flow**: 6-7 hours (Research 2h, Writing 3h, Integration 2h)
- **Travel Times**: 5-6 hours (Research 1.5h, Writing 2.5h, Integration 2h)
- **Cross-API Integration**: 1-2 hours (identify connections between the two APIs)

**Essential Instructions**:
1. Read `docs/describe-project/api-documentation-handbook.md` first
2. Work in respective `/working/` directories with `.charlie` suffix
3. Note integration opportunities between the two APIs for final cross-references

**Data Freshness**: Both APIs use `"Data updates frequently."`

**Special Focus**: These APIs are highly complementary - pay attention to integration opportunities during Phase 3.

Questions? Ask before proceeding. Good luck!
```

---

## Assignment Quick Reference

### **API Complexity Estimates**
| API Type | Endpoints | Fields | Time Estimate |
|----------|-----------|---------|---------------|
| Simple | 1-2 | <10 | 5-6 hours |
| Medium | 2-3 | 10-15 | 7-9 hours |
| Complex | 3+ | 15+ | 10-12 hours |

### **Common Data Freshness Statements**
| API Pattern | Required Statement |
|-------------|-------------------|
| Border crossings, traffic flow, weather | `"Data updates frequently."` |
| Bridge clearances, ferry schedules, toll rates | `"Data updates infrequently."` |
| Ferry locations, vessel positions | `"Data is real-time."` |

### **Function Name Patterns**
| API | Function Name | Command |
|-----|---------------|---------|
| Border Crossings | `getBorderCrossings` | `npx fetch-dottie getBorderCrossings --limit 500` |
| Bridge Clearances | `getBridgeClearances` | `npx fetch-dottie getBridgeClearances --limit 500` |
| Traffic Flow | `getTrafficFlow` | `npx fetch-dottie getTrafficFlow --limit 500` |
| Travel Times | `getTravelTimes` | `npx fetch-dottie getTravelTimes --limit 500` |

### **Agent Naming Convention**
- **File suffix**: `.[agent-name]` (e.g., `.alice`, `.bob`, `.editor`)
- **Lowercase**: Always use lowercase agent names in files
- **Consistent**: Use the same name across all files for an agent
