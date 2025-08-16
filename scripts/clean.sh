#!/bin/bash

# Complete Docker cleanup script
echo "🧹 Complete Docker cleanup..."

# Stop all running containers
echo "Stopping all running containers..."
docker stop $(docker ps -aq) 2>/dev/null || true

# Remove all containers
echo "Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null || true

# Remove all images
echo "Removing all images..."
docker rmi $(docker images -aq) 2>/dev/null || true

# Remove all volumes
echo "Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || true

# Remove all networks
echo "Removing all networks..."
docker network rm $(docker network ls -q) 2>/dev/null || true

# Stop docker-compose services
echo "Stopping docker-compose services..."
docker-compose down -v 2>/dev/null || true

# Final system prune
echo "Final system cleanup..."
docker system prune -a -f --volumes

echo "✅ Complete Docker cleanup finished!"
echo "All containers, images, volumes, and networks have been removed." 