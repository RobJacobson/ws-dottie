#!/bin/bash

# ws-dottie CLI Aliases Setup Script
# This script creates convenient shell aliases for the CLI tools

echo "🚀 Setting up ws-dottie CLI aliases..."

# Get the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_DIR/dist/cli"

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo "❌ Error: dist directory not found. Please run 'npm run build' first."
    exit 1
fi

# Create aliases
echo "📝 Creating aliases..."

# Add aliases to shell profile
SHELL_PROFILE=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_PROFILE="$HOME/.bash_profile"
else
    echo "❌ Error: No shell profile found (.zshrc, .bashrc, or .bash_profile)"
    exit 1
fi

# Check if aliases already exist
if grep -q "alias dottie=" "$SHELL_PROFILE"; then
    echo "⚠️  Aliases already exist in $SHELL_PROFILE"
    echo "   To update them, remove the existing lines and run this script again."
    exit 0
fi

# Add aliases to shell profile
cat >> "$SHELL_PROFILE" << EOF

# ws-dottie CLI aliases
alias dottie='node $DIST_DIR/dottie-fetch.mjs'
alias native='node $DIST_DIR/native-fetch.mjs'
alias dottie-help='node $DIST_DIR/dottie-fetch.mjs --help'
alias native-help='node $DIST_DIR/native-fetch.mjs --help'

EOF

echo "✅ Aliases added to $SHELL_PROFILE"
echo ""
echo "🎉 Setup complete! To use the new aliases:"
echo "   1. Run: source $SHELL_PROFILE"
echo "   2. Or restart your terminal"
echo ""
echo "📖 Available aliases:"
echo "   dottie <function> [params]     - Validated API calls"
echo "   native <function> [params]     - Raw API calls"
echo "   dottie-help                    - Show dottie-fetch help"
echo "   native-help                    - Show native-fetch help"
echo ""
echo "💡 Examples:"
echo "   dottie getBorderCrossings"
echo "   native getBorderCrossings --fix-dates"
echo "   dottie getBridgeClearances '{\"route\": \"005\"}'"
