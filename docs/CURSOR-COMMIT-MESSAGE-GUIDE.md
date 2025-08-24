# Cursor Git Commit Message Generation Guide

**Date:** December 2024  
**Subject:** Improving Git Commit Message Quality in Cursor  
**Author:** Development Team  
**Status:** Active

## Overview

Cursor's "Generate commit message" feature often produces subpar results. This guide provides practical strategies to improve commit message quality and consistency across the project.

## Problem Statement

Default AI-generated commit messages tend to be:
- Too generic ("Update files")
- Missing conventional commit format
- Lacking proper scope and context
- Inconsistent across team members

## Solution Strategies

### 1. **Use Conventional Commits Format in Code Comments**

Cursor's AI learns from your codebase patterns. Include commit format hints in your code:

```typescript
/**
 * @commit feat(api): add new endpoint for vessel tracking
 * @commit BREAKING CHANGE: changes response format for getVessels
 */
export const getVesselTracking = () => {
  // implementation
};
```

**Benefits:**
- AI learns your preferred format
- Provides context for specific changes
- Documents breaking changes inline

### 2. **Create a `.cursorrules` File (Recommended)**

This is the most effective approach. Create a `.cursorrules` file in your project root:

```markdown
# Git Commit Message Guidelines

When generating commit messages, follow these rules:

## Format
Use conventional commits: `type(scope): description`

## Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Scope
Include relevant scope in parentheses:
- `(api)`: API-related changes
- `(validation)`: Validation logic
- `(config)`: Configuration changes
- `(shared)`: Shared utilities
- `(docs)`: Documentation

## Description
- Keep first line under 50 characters
- Use imperative mood ("add" not "added")
- Be specific about what changed

## Body
For complex changes, add a body with:
- What was changed
- Why it was changed
- Breaking changes (if any)
- Files affected

## Examples
```
feat(api): add vessel tracking endpoint

- Add new getVesselTracking function
- Include real-time location updates
- Add TypeScript types for tracking data

Closes #123
```

```
fix(validation): always enable Zod validation

Remove validation mode configuration and make validation always-on
for consistent fail-fast behavior. Performance impact is negligible.

BREAKING CHANGE: WS_DOTTIE_VALIDATION_MODE env var removed
```
```

**Benefits:**
- Provides clear instructions to AI
- Ensures consistent formatting
- Includes examples for reference
- Acts as team style guide

### 3. **Add Commit Hints in PR Descriptions**

When creating PRs, include commit format preferences:

```markdown
## Commit Message Guidelines
- Use conventional commits: feat/fix/docs/style/refactor/test/chore
- Include scope when relevant: feat(api), fix(validation), etc.
- Keep first line under 50 characters
- Add body for complex changes
- Reference issues: Closes #123
```

### 4. **Use Commit Message Templates**

Create a `.gitmessage` template file:

```bash
# Create template
cat > .gitmessage << 'EOF'
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>
EOF

# Configure git to use template
git config commit.template .gitmessage
```

### 5. **Provide Context in Code Changes**

Include context in your code comments that the AI can pick up:

```typescript
// TODO: This change will require updating the commit message
// to reflect the breaking change in validation behavior
export const validateInputs = <TInput>(
  inputSchema: z.ZodSchema<TInput> | undefined,
  params: TInput | undefined,
  _context: FetchContext
): TInput | undefined => {
  // Always validate if schema and params are provided
  // BREAKING CHANGE: Removed validation mode configuration
  if (!inputSchema || !params) {
    return params;
  }
  // ... rest of implementation
};
```

### 6. **Use Cursor's Built-in Features Effectively**

When using Cursor's "Generate commit message" button:

1. **Select relevant files** before generating
2. **Use the chat** to provide context: 
   ```
   "Generate a commit message for these changes following conventional commits format"
   ```
3. **Review and edit** the generated message before committing
4. **Provide specific instructions**:
   ```
   "Create a commit message for the validation changes. 
   This is a breaking change that removes the validation mode configuration."
   ```

## Implementation Steps

### Step 1: Create `.cursorrules` File
```bash
# Create the file in your project root
touch .cursorrules
```

### Step 2: Add Commit Guidelines
Copy the `.cursorrules` content from section 2 above.

### Step 3: Update Team Workflow
- Share the guidelines with team members
- Encourage use of conventional commits in code comments
- Review commit messages during PR reviews

### Step 4: Monitor and Iterate
- Track commit message quality over time
- Update guidelines based on team feedback
- Refine examples as needed

## Best Practices

### **Do:**
- Use conventional commit types consistently
- Include relevant scope information
- Keep descriptions concise but specific
- Add body for complex changes
- Reference issues when applicable

### **Don't:**
- Use generic messages like "Update files"
- Skip scope when it adds context
- Write overly long first lines
- Forget to mention breaking changes
- Use past tense in descriptions

## Examples of Good vs Bad Commits

### ❌ Bad Examples:
```
Update files
Fix stuff
Add new feature
Changed validation
```

### ✅ Good Examples:
```
feat(api): add vessel tracking endpoint
fix(validation): always enable Zod validation
docs(shared): improve JSDoc comments
refactor(config): simplify validation mode logic
test(api): add unit tests for vessel endpoints
```

## Troubleshooting

### **Problem:** AI still generates generic messages
**Solution:** 
- Ensure `.cursorrules` file is in project root
- Provide more specific context in chat
- Use code comments with commit hints

### **Problem:** Inconsistent formatting across team
**Solution:**
- Share `.cursorrules` file with all team members
- Add commit guidelines to README
- Use PR templates with commit requirements

### **Problem:** Breaking changes not highlighted
**Solution:**
- Use `BREAKING CHANGE:` prefix in commit body
- Include breaking change notes in code comments
- Document breaking changes in PR descriptions

## Conclusion

The `.cursorrules` file approach is the most effective way to improve commit message quality in Cursor. It provides clear instructions to the AI and ensures consistent formatting across the team.

**Key Takeaways:**
1. Create a `.cursorrules` file with your commit guidelines
2. Use conventional commits format consistently
3. Provide context in code comments and chat
4. Review and edit generated messages before committing
5. Share guidelines with team members

This approach will significantly improve the quality and consistency of commit messages generated by Cursor's AI.

---

**Next Steps:**
- [ ] Create `.cursorrules` file in project root
- [ ] Add commit guidelines to team documentation
- [ ] Update PR templates with commit requirements
- [ ] Train team on new commit message standards
