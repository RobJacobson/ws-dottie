# Quality Assurance Checklist

## Pre-Work Validation (For All Agents)

### Understanding Check
- [ ] **Project goals understood**: Can explain dual audience (humans + AI agents)
- [ ] **MCP context awareness**: Understands context window constraints and discovery efficiency
- [ ] **Length limits internalized**: Knows 150-400-600 character guidelines by field complexity
- [ ] **Example decision tree**: Can explain when to use single vs. multiple examples

### Standards Compliance
- [ ] **Shared standards reviewed**: Read and understood all formatting rules
- [ ] **Templates available**: Has access to field description templates
- [ ] **Cross-reference format**: Knows exact format for API references
- [ ] **Edge case requirements**: Understands Doug's pattern for documenting unusual values

## During-Work Quality Control

### Field Description Quality
- [ ] **Business context first**: Every field explains real-world purpose
- [ ] **Example justification**: Multiple examples only when showing different categories/types
- [ ] **Length awareness**: Descriptions stay within appropriate character limits
- [ ] **Plain English**: No unnecessary jargon or technical complexity
- [ ] **Parallel language**: Related fields (same concept, different formats) use identical business purpose explanations
- [ ] **Context distribution**: API purpose at endpoint/schema level, field descriptions focus on specific distinctions
- [ ] **Field relationship analysis**: Same concepts use parallel language, similar-but-different concepts explain differences
- [ ] **Avoid speculation**: Stick to factual distinctions, avoid speculative safety advice unless clearly documented in source API

### Example Quality Control
**Before adding multiple examples, verify:**
- [ ] Do examples show **different categories** within the field?
- [ ] Do they illustrate **different business meanings** or **states**?
- [ ] Do they demonstrate **format variations** users need to understand?
- [ ] Would a user learn something **different** from each example?

**If NO to all questions → Use ONE example**

### Cross-Reference Quality
- [ ] **Endpoint names verified**: Uses exact names from src/clients/** documentation
- [ ] **Business justification**: Each cross-reference explains why integration is valuable
- [ ] **Placement appropriate**: Field-level vs. schema-level vs. endpoint-level placement
- [ ] **Workflow context**: Explains how APIs work together in real user workflows

## Post-Work Validation

### Completeness Check
- [ ] **All deliverables present**: Required files completed with substantial content
- [ ] **Field coverage complete**: Every field has business-focused description
- [ ] **Edge cases documented**: Unusual values identified and explained
- [ ] **Integration opportunities**: Cross-API workflows identified and documented

### Quality Metrics
- [ ] **Length compliance**: All descriptions within character limits
- [ ] **Example efficiency**: No duplicate random values, meaningful variation only
- [ ] **Business value**: Descriptions help users make decisions
- [ ] **Technical accuracy**: Schema structure, imports, and types correct

## Editor-Specific Quality Assurance

### Synthesis Quality
- [ ] **Best foundation selected**: Chose highest-quality agent work as base
- [ ] **Value-adding synthesis**: Combined elements improve overall quality
- [ ] **Length optimization**: Final output meets all character limits
- [ ] **Example consolidation**: Applied example quality standards during synthesis

### Final Validation
- [ ] **Superior to individual agents**: Final result exceeds quality of any single agent
- [ ] **Consistent voice**: Unified terminology and approach throughout
- [ ] **Technical excellence**: Perfect schema structure and import paths
- [ ] **Documentation complete**: Clear rationale for synthesis decisions

## Red Flags (Stop and Revise)

### Content Issues
- ❌ **Multiple random examples**: Two coordinates, dates, IDs of same type
- ❌ **Length violations**: Descriptions exceeding character limits without justification
- ❌ **Missing business context**: Technical descriptions without real-world purpose
- ❌ **Incorrect cross-references**: Wrong endpoint names or unclear integration value
- ❌ **Inconsistent parallel language**: Related fields with different business purpose explanations

### Process Issues
- ❌ **Skipped validation**: Moving forward without completing quality checks
- ❌ **Standards deviation**: Not following established templates and formats
- ❌ **Edge cases missed**: Failing to identify and document unusual values
- ❌ **Technical errors**: Import paths, schema structure, or typing problems

## Success Indicators

### Individual Agent Success
- ✅ **Clear business focus**: Every description explains real-world value
- ✅ **Efficient examples**: Single examples for homogeneous data, multiple only for different categories
- ✅ **Length discipline**: Stays within limits while maximizing value
- ✅ **Integration insight**: Identifies valuable cross-API workflows

### Editor Success  
- ✅ **Synthesis excellence**: Final result superior to individual components
- ✅ **Length optimization**: Meets all character limits through strategic consolidation
- ✅ **Example refinement**: Applies quality standards to eliminate verbosity
- ✅ **Technical perfection**: No errors in schema structure, imports, or references

---

**Remember**: Quality assurance is not about perfection - it's about **maximizing value for users** while maintaining **technical accuracy** and **MCP compatibility**. Focus on helping both human developers and AI agents understand and effectively use these transportation APIs.
