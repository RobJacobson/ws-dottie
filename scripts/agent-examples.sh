#!/bin/bash

# ============================================================================
# ws-dottie Agent Examples
# ============================================================================
#
# This script demonstrates how AI agents and automation tools can use
# the ws-dottie CLI in agent mode for clean, structured data access.
#
# ⚠️  CRITICAL RULE FOR AGENTS ⚠️
# ==========================================
# AGENTS MUST NOT UPDATE SCHEMAS UNLESS EXPRESSLY REQUESTED BY THE USER
#
# We are in the process of locking down these schemas. Any changes to schemas
# would likely be BREAKING CHANGES. Agents should:
# - Use existing schemas as-is
# - Report discrepancies to the user
# - Never modify schema files without explicit user approval
# - Never attempt to set or modify authentication schemas
# - Always use $WSDOT_ACCESS_TOKEN environment variable for authentication
# ==========================================
#
# Usage: ./scripts/agent-examples.sh [example-name]
#
# Examples:
#   ./scripts/agent-examples.sh border-crossings
#   ./scripts/agent-examples.sh ferry-data
#   ./scripts/agent-examples.sh weather
#   ./scripts/agent-examples.sh all
# ============================================================================

CLI_CMD="node dist/cli.mjs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to run CLI commands
run_cli() {
    local cmd="$1"
    local description="$2"

    echo -e "${BLUE}🔍 $description${NC}"
    echo -e "${YELLOW}$ $CLI_CMD $cmd --agent${NC}"

    # Run the command and capture output
    output=$($CLI_CMD $cmd --agent 2>/dev/null)

    # Check if command succeeded
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Success!${NC}"
        echo "$output" | head -3
        echo "..."
        echo ""
    else
        echo -e "${RED}❌ Failed${NC}"
        echo "$output"
        echo ""
    fi
}

# Border Crossings Example
border_crossings() {
    echo -e "${GREEN}🚗 Border Crossings Data${NC}"
    echo "Getting real-time border crossing wait times"
    echo ""

    run_cli "getBorderCrossings" "Getting border crossing data"
}

# Ferry Data Example
ferry_data() {
    echo -e "${GREEN}🚢 Ferry Data${NC}"
    echo "Getting ferry terminal and vessel information"
    echo ""

    run_cli "getTerminalWaitTimes" "Getting terminal wait times"
    run_cli "getVesselLocations" "Getting vessel locations"
    run_cli "getVesselBasics" "Getting vessel information"
}

# Weather Data Example
weather_data() {
    echo -e "${GREEN}🌤️ Weather Data${NC}"
    echo "Getting weather information and conditions"
    echo ""

    run_cli "getWeatherInformation" "Getting weather station data"
    run_cli "getMountainPassConditions" "Getting mountain pass conditions"
}

# Traffic Data Example
traffic_data() {
    echo -e "${GREEN}🚦 Traffic Data${NC}"
    echo "Getting traffic flow and alert information"
    echo ""

    run_cli "getTrafficFlows" "Getting traffic flow data"
    run_cli "getHighwayAlerts" "Getting highway alerts"
    run_cli "getTravelTimes" "Getting travel times"
}

# Commercial Vehicle Data Example
commercial_data() {
    echo -e "${GREEN}🚛 Commercial Vehicle Data${NC}"
    echo "Getting commercial vehicle restrictions and tolls"
    echo ""

    run_cli "getCommercialVehicleRestrictions" "Getting commercial vehicle restrictions"
    run_cli "getTollRates" "Getting toll rates"
}

# Scripted Usage Examples
scripted_usage() {
    echo -e "${GREEN}📜 Scripted Usage Examples${NC}"
    echo "How agents can use the CLI in scripts and automation"
    echo ""

    echo -e "${BLUE}Example 1: Process border crossing data${NC}"
    echo -e "${YELLOW}# Get data and extract crossing names${NC}"
    echo '$ DATA=$(node dist/cli.mjs getBorderCrossings --agent)'
    echo '$ echo "$DATA" | jq -r ".[].CrossingName"'
    echo ""

    echo -e "${BLUE}Example 2: Check ferry availability${NC}"
    echo -e "${YELLOW}# Find terminals with no wait time${NC}"
    echo '$ node dist/cli.mjs getTerminalWaitTimes --agent | jq ".[] | select(.WaitTime == 0) | .TerminalName"'
    echo ""

    echo -e "${BLUE}Example 3: Monitor vessel locations${NC}"
    echo -e "${YELLOW}# Get vessel positions for mapping${NC}"
    echo '$ node dist/cli.mjs getVesselLocations --agent | jq ".[] | {name: .VesselName, lat: .Latitude, lon: .Longitude}"'
    echo ""

    echo -e "${RED}⚠️  REMINDER: Agents must NOT modify schemas unless expressly requested by the user${NC}"
    echo "We are locking down schemas to prevent breaking changes. Report discrepancies instead."
    echo "Always use \$WSDOT_ACCESS_TOKEN environment variable and never attempt to set authentication schemas."
    echo ""
}

# Main execution
case "$1" in
    "border-crossings")
        border_crossings
        ;;
    "ferry-data")
        ferry_data
        ;;
    "weather")
        weather_data
        ;;
    "traffic")
        traffic_data
        ;;
    "commercial")
        commercial_data
        ;;
    "scripted")
        scripted_usage
        ;;
    "all")
        border_crossings
        ferry_data
        weather_data
        traffic_data
        commercial_data
        scripted_usage
        ;;
    *)
        echo "Usage: $0 {border-crossings|ferry-data|weather|traffic|commercial|scripted|all}"
        echo ""
        echo "Examples:"
        echo "  $0 border-crossings    # Show border crossing data"
        echo "  $0 ferry-data         # Show ferry terminal and vessel data"
        echo "  $0 weather            # Show weather and conditions data"
        echo "  $0 traffic            # Show traffic flow and alert data"
        echo "  $0 commercial         # Show commercial vehicle data"
        echo "  $0 scripted           # Show scripted usage examples"
        echo "  $0 all               # Show all examples"
        exit 1
        ;;
esac
