# Quick Start Guide - API Documentation Enhancement

**One-page workflow summary - see detailed guides for full instructions**

## **Before You Start**
1. Read `shared-standards.md` Quick Reference Tables (top of file)
2. Understand: **NO cross-references until Phase 3**
3. Know your API complexity: Simple (1-2 endpoints) vs Complex (3+ endpoints)

---

## **Phase 1: Research (1-2 hours)**

### **Essential Steps**
1. **Discover endpoints**: `list_dir src/clients/[api-name]/` → read each client file 
2. **Fetch sample data**: `npx fetch-dottie getFunctionName --limit 500`
   - ✅ Correct: `getBorderCrossings`
   - ❌ Wrong: `GetBorderCrossings` or `api/function` format
3. **Create domain analysis**: `src/apis/[api-name]/working/domain-analysis.[agent-name].md`

### **Key Focus**
- Business purpose and real-world applications
- Edge case patterns (-1 values, null meanings, special states)
- Target users and use cases

---

## **Phase 2: Writing (2-5 hours)**

### **Essential Steps**
1. **Create all required files**:
   - `inputSchemas.[agent-name].ts` - Add `.describe()` only
   - `outputSchemas.[agent-name].ts` - Add `.describe()` + data freshness
   - `endpointDescriptions.[agent-name].json` - Business purpose only
2. **Apply example decision tree**: Multiple examples only if different categories/states/formats
3. **Use edge case template**: `"Normal purpose. E.g., 'normal' for condition, 'edge' for special condition. Business meaning."`

### **Critical Requirements**
- **Data freshness**: Required in output schema (see Quick Reference Table)
- **No cross-references**: Wait until Phase 3
- **Length limits**: 50-150 simple, 150-400 business, 400-600 complex max

---

## **Phase 3: Integration (1-2 hours)**

### **Essential Steps**
1. **Apply integration discovery process** (4 steps in shared-standards.md)
2. **Add cross-references** to `endpointDescriptions.[agent-name].json` only
3. **Follow stopping criteria**: Max 2-4 cross-references per endpoint
4. **Run qualitative success criteria** checklist

### **Cross-Reference Format**
```json
"Use with [api]/[endpoint] to [specific purpose]"
```

---

## **Quick Quality Checklist**

### **File Compliance**
- [ ] All files in `/working/` subdirectory with `[agent-name]` suffix
- [ ] Only `.describe()` annotations added (no code structure changes)
- [ ] Canonical import paths (`@/apis/shared/`)

### **Content Quality**  
- [ ] Business context first, technical details second
- [ ] Edge cases documented with business meaning
- [ ] Data freshness statement in output schema
- [ ] Examples use actual API data with single quotes

### **Cross-References (Phase 3 Only)**
- [ ] Only in `endpointDescriptions.json` files  
- [ ] Natural integration into narrative
- [ ] 2-4 maximum per endpoint
- [ ] Actionable and specific

---

## **When to Get Help**
- `fetch-dottie` command fails → Stop and request assistance
- Business concepts unclear after research → Ask for clarification
- Technical tool failures → Request help immediately

---

**Full Details**: See `master-overview.md` → `research-phase-guide.md` → `writing-phase-guide.md` → `integration-phase-guide.md`
