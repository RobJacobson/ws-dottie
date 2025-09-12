@echo off
REM ws-dottie CLI Aliases Setup Script for Windows
REM This script creates convenient batch files for the CLI tools

echo 🚀 Setting up ws-dottie CLI aliases...

REM Get the project directory
set "PROJECT_DIR=%~dp0.."
set "DIST_DIR=%PROJECT_DIR%\dist\cli"

REM Check if dist directory exists
if not exist "%DIST_DIR%" (
    echo ❌ Error: dist directory not found. Please run 'npm run build' first.
    exit /b 1
)

echo 📝 Creating batch files...

REM Create batch files in a local bin directory
set "BIN_DIR=%PROJECT_DIR%\bin"
if not exist "%BIN_DIR%" mkdir "%BIN_DIR%"

REM Create dottie.bat
echo @echo off > "%BIN_DIR%\dottie.bat"
echo node "%DIST_DIR%\dottie-fetch.mjs" %%* >> "%BIN_DIR%\dottie.bat"

REM Create native.bat
echo @echo off > "%BIN_DIR%\native.bat"
echo node "%DIST_DIR%\native-fetch.mjs" %%* >> "%BIN_DIR%\native.bat"

REM Create dottie-help.bat
echo @echo off > "%BIN_DIR%\dottie-help.bat"
echo node "%DIST_DIR%\dottie-fetch.mjs" --help >> "%BIN_DIR%\dottie-help.bat"

REM Create native-help.bat
echo @echo off > "%BIN_DIR%\native-help.bat"
echo node "%DIST_DIR%\native-fetch.mjs" --help >> "%BIN_DIR%\native-help.bat"

echo ✅ Batch files created in %BIN_DIR%
echo.
echo 🎉 Setup complete! To use the new commands:
echo    1. Add %BIN_DIR% to your PATH environment variable
echo    2. Or run commands directly: %BIN_DIR%\dottie.bat
echo.
echo 📖 Available commands:
echo    dottie.bat <function> [params]     - Validated API calls
echo    native.bat <function> [params]     - Raw API calls
echo    dottie-help.bat                    - Show dottie-fetch help
echo    native-help.bat                    - Show native-fetch help
echo.
echo 💡 Examples:
echo    dottie.bat getBorderCrossings
echo    native.bat getBorderCrossings --fix-dates
echo    dottie.bat getBridgeClearances "{\"route\": \"005\"}"
