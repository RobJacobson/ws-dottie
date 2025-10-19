# Context7 Setup and Troubleshooting Guide

## Library Name Format

The Context7 library name follows the format: `/owner/repository` where:
- `owner` is the GitHub username or organization that owns the repository
- `repository` is the name of the GitHub repository

## Common Issue: 404 Error

### Problem
The Context7 GitHub workflow fails with a consistent 404 error:
```
API error (HTTP 404): {"error":"Not Found"}
```

### Root Cause
The library name in the workflow configuration doesn't match the actual GitHub repository owner. In this project, the workflow was using:
```yaml
library-name: "/ferryjoy/ws-dottie"
```

However, the actual repository is owned by `RobJacobson`, not `ferryjoy`. The repository URL in package.json shows:
```json
"url": "git+https://github.com/RobJacobson/ws-dottie.git"
```

### Solution
Update the library name in `.github/workflows/context7.yml` to match the actual repository owner:

```yaml
# First-time registration (manual run only)
- name: Add to Context7 (first run only)
  if: github.event_name == 'workflow_dispatch'
  uses: rennf93/upsert-context7@1.0
  with:
    operation: add
    library-name: "/RobJacobson/ws-dottie"  # Updated from "/ferryjoy/ws-dottie"

# Refresh docs on every release
- name: Refresh Context7 docs on release
  if: github.event_name == 'release'
  uses: rennf93/upsert-context7@1.0
  with:
    operation: refresh
    library-name: "/RobJacobson/ws-dottie"  # Updated from "/ferryjoy/ws-dottie"
```

### How to Verify the Correct Library Name
1. Check the repository URL in `package.json`
2. The format should be `https://github.com/{owner}/{repository}.git`
3. Use `/owner/repository` as the library name format
4. For this project: `https://github.com/RobJacobson/ws-dottie.git` → `/RobJacobson/ws-dottie`

### Important Notes
- The "ferryjoy" name appears to be an npm organization name, not the GitHub repository owner
- Always verify the actual repository owner from the package.json file
- Both the "add" and "refresh" operations need to use the same correct library name
- If the library was previously registered under a different name, it may need to be re-registered using the "add" operation first