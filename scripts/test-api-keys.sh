#!/bin/bash
# Test script to verify Auto-Promoter API keys configuration
# This script validates that secrets are properly configured in GitHub

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Auto-Promoter API Keys Test ===${NC}\n"

# Check if gh is installed and logged in
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not logged in to GitHub CLI${NC}"
    echo "Run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✓${NC} GitHub CLI is ready\n"

# List of projects to check
PROJECTS=(
    "ozxc44/badge-generator"
    "ozxc44/status-badge-2"
    "ozxc44/docuapi"
    "ozxc44/auto-promoter"
    "ozxc44/cron-monitor"
    "ozxc44/email-cleanup"
    "ozxc44/flatpdf-api"
    "ozxc44/form-to-pdf"
    "ozxc44/queue-monitor-dev"
    "ozxc44/status-widget"
    "ozxc44/status-widget-cf"
    "ozxc44/tiktok-compliance-scanner"
)

# Secrets to check
SECRETS=(
    "DEVTO_API_KEY"
    "BLUESKY_HANDLE"
    "BLUESKY_APP_PASSWORD"
    "MASTODON_INSTANCE"
    "MASTODON_ACCESS_TOKEN"
)

echo "Checking secrets for all projects..."
echo ""

# Header
printf "%-35s" "Project"
for secret in "${SECRETS[@]}"; do
    printf "%-5s" "${secret:0:5}"
done
echo ""

# Separator
printf "%-35s" "---------"
for secret in "${SECRETS[@]}"; do
    printf "%-5s" "-----"
done
echo ""

# Check each project
for project in "${PROJECTS[@]}";
do
    project_name=$(basename $project)
    if [ "$project_name" = "queue-monitor-dev" ]; then
        display_name="queue-monitor"
    elif [ "$project_name" = "status-badge-2" ]; then
        display_name="status-badge-2"
    else
        display_name=$project_name
    fi

    printf "%-35s" "$display_name"

    for secret in "${SECRETS[@]}"; do
        # Try to get the secret (this will fail if not set, but we just want to know if it exists)
        if gh secret list -R "$project" 2>/dev/null | grep -q "^$secret"; then
            echo -ne "${GREEN}✓${NC} "
        else
            echo -ne "${RED}✗${NC} "
        fi
    done
    echo ""
done

echo ""
echo -e "${YELLOW}=== Setup Instructions ===${NC}\n"

echo "1. Dev.to API Key:"
echo "   - Visit: https://dev.to/settings/account"
echo "   - Generate API key"
echo "   - Add to repo secrets as: DEVTO_API_KEY"
echo ""

echo "2. Bluesky App Password:"
echo "   - Visit: https://bsky.app/settings/app-passwords"
echo "   - Create app password (NOT your main password!)"
echo "   - Add to repo secrets:"
echo "     - BLUESKY_HANDLE (=your.bsky.social)"
echo "     - BLUESKY_APP_PASSWORD (=xxxx-xxxx-xxxx-xxxx)"
echo ""

echo "3. Mastodon Access Token (optional):"
echo "   - Visit: https://mastodon.social/settings/applications"
echo "   - Create new application"
echo "   - Copy access token"
echo "   - Add to repo secrets:"
echo "     - MASTODON_INSTANCE (=https://mastodon.social)"
echo "     - MASTODON_ACCESS_TOKEN"
echo ""

echo "4. To add secrets to a single project:"
echo "   gh secret set DEVTO_API_KEY --repo ozxc44/badge-generator"
echo ""

echo "5. To add secrets to ALL projects (Organization Secrets recommended):"
echo "   - Create a GitHub Organization"
echo "   - Go to Organization Settings > Secrets"
echo "   - Add secrets with access to all repositories"
echo ""

echo "6. Test trigger a workflow:"
echo "   gh workflow run promote.yml --repo ozxc44/badge-generator"
echo ""

echo -e "${GREEN}Done!${NC}"
