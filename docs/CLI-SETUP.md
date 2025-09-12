# CLI Setup Guide

This guide shows you how to set up convenient shortcuts for the ws-dottie CLI tools.

## 🚀 Quick Start

### Option 1: NPM Scripts (Recommended)
After building the project, you can use these convenient npm scripts:

```bash
# Build the project first
npm run build

# Use the CLI tools
npm run dottie getBorderCrossings
npm run native getBorderCrossings --fix-dates
npm run cli:help
npm run cli:list
```

### Option 2: Direct Binary Usage
The CLI tools are also available as npm binaries:

```bash
# After npm install (or npm link for local development)
dottie-fetch getBorderCrossings
native-fetch getBorderCrossings --fix-dates
```

### Option 3: Shell Aliases (Unix/Linux/macOS)
Run the setup script to create convenient aliases:

```bash
# Make the script executable and run it
chmod +x scripts/setup-aliases.sh
./scripts/setup-aliases.sh

# Reload your shell or run:
source ~/.zshrc  # or ~/.bashrc
```

After setup, you can use:
```bash
dottie getBorderCrossings
native getBorderCrossings --fix-dates
dottie-help
native-help
```

### Option 4: Windows Batch Files
Run the Windows setup script:

```cmd
scripts\setup-aliases.bat
```

This creates batch files in a `bin` directory that you can add to your PATH.

## 📖 Available Commands

### NPM Scripts
- `npm run dottie <function> [params]` - Validated API calls
- `npm run native <function> [params]` - Raw API calls  
- `npm run cli:help` - Show help
- `npm run cli:list` - List available functions

### Shell Aliases (after setup)
- `dottie <function> [params]` - Validated API calls
- `native <function> [params]` - Raw API calls
- `dottie-help` - Show dottie-fetch help
- `native-help` - Show native-fetch help

### Direct Binary Usage
- `dottie-fetch <function> [params]` - Validated API calls
- `native-fetch <function> [params]` - Raw API calls

## 💡 Examples

```bash
# Get border crossing data (validated)
npm run dottie getBorderCrossings
dottie getBorderCrossings

# Get border crossing data (raw)
npm run native getBorderCrossings --fix-dates
native getBorderCrossings --fix-dates

# Get bridge clearances with parameters
npm run dottie getBridgeClearances '{"route": "005"}'
dottie getBridgeClearances '{"route": "005"}'

# Show help
npm run cli:help
dottie-help

# List available functions
npm run cli:list
```

## 🔧 Troubleshooting

### "Command not found" errors
- Make sure you've run `npm run build` first
- For aliases, make sure you've sourced your shell profile
- For Windows batch files, make sure the bin directory is in your PATH

### Permission errors on Unix/Linux/macOS
```bash
chmod +x scripts/setup-aliases.sh
```

### Aliases not working
- Check that the aliases were added to your shell profile
- Reload your shell: `source ~/.zshrc` or restart your terminal
- Verify the dist directory exists: `ls dist/cli/`

## 🎯 Recommended Setup

For the best experience, we recommend:

1. **Development**: Use npm scripts (`npm run dottie`, `npm run native`)
2. **Production**: Use shell aliases or direct binaries
3. **CI/CD**: Use direct binaries (`dottie-fetch`, `native-fetch`)

This gives you the most flexibility while keeping commands short and memorable!
