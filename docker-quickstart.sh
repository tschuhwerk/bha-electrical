#!/bin/bash
# BHA Electrical LLC - Docker Quick Start

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   BHA Electrical LLC - Docker Container Quick Start${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  WARNING: .env file not found!${NC}"
    echo "   Please create .env with your email configuration:"
    echo "   EMAIL_SERVICE=gmail"
    echo "   EMAIL_USER=your-email@gmail.com"
    echo "   EMAIL_PASSWORD=your-app-password"
    echo "   BUSINESS_EMAIL=business-email@gmail.com"
    echo ""
fi

echo -e "${BLUE}OPTION 1: Using Docker Compose (Recommended)${NC}"
echo "────────────────────────────────────────────────────"
echo -e "Build and run: ${GREEN}docker-compose up --build${NC}"
echo -e "Run background: ${GREEN}docker-compose up -d${NC}"
echo -e "View logs: ${GREEN}docker-compose logs${NC}"
echo -e "Stop: ${GREEN}docker-compose down${NC}"
echo ""

echo -e "${BLUE}OPTION 2: Using Docker CLI${NC}"
echo "────────────────────────────────────────────────────"
echo -e "Run: ${GREEN}docker run -d -p 3000:3000 --env-file .env --name bha-electrical-website bha-electrical:latest${NC}"
echo -e "View logs: ${GREEN}docker logs bha-electrical-website${NC}"
echo -e "Stop: ${GREEN}docker stop bha-electrical-website${NC}"
echo -e "Start: ${GREEN}docker start bha-electrical-website${NC}"
echo ""

echo -e "${BLUE}IMAGE INFORMATION${NC}"
echo "────────────────────────────────────────────────────"
docker images bha-electrical:latest --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
echo ""

echo -e "${BLUE}Quick Info:${NC}"
echo -e "  • Port: ${GREEN}3000${NC}"
echo -e "  • Environment: ${GREEN}Production${NC}"
echo -e "  • Base: ${GREEN}Node.js 18 Alpine Linux${NC}"
echo -e "  • Size: ${GREEN}~305MB${NC}"
echo ""

echo -e "${YELLOW}Ready to run your website in Docker!${NC}"
echo ""
echo -e "Start with: ${GREEN}docker-compose up --build${NC}"
echo -e "Then visit: ${GREEN}http://localhost:3000${NC}"
echo ""
