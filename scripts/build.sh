#!/bin/bash

# Docker build script for the User Management application

# Available services (dynamic, based on presence of monitoring/)
CORE_SERVICES=("frontend" "backend" "postgres" "pgadmin")
MONITORING_SERVICES=("prometheus" "grafana" "loki" "promtail" "tempo" "pyroscope" "otel-collector" "postgres-exporter")

if [ -d "monitoring" ]; then
  AVAILABLE_SERVICES=("${CORE_SERVICES[@]}" "${MONITORING_SERVICES[@]}" "monitoring")
  MONITORING_PRESENT=true
else
  AVAILABLE_SERVICES=("${CORE_SERVICES[@]}")
  MONITORING_PRESENT=false
fi

# Ensure lockfiles are up-to-date before docker builds (avoids --frozen-lockfile errors)
preinstall_if_needed() {
    local dir=$1
    if [ ! -d "$dir" ]; then
        return 0
    fi
    if [ -f "$dir/package.json" ]; then
        # If yarn.lock missing or package.json newer than yarn.lock, run yarn install
        if [ ! -f "$dir/yarn.lock" ] || [ "$dir/package.json" -nt "$dir/yarn.lock" ]; then
            echo "📦 Running yarn install in $dir (updating lockfile)..."
            (cd "$dir" && yarn install --no-progress) || {
                echo "❌ yarn install failed in $dir"; exit 1;
            }
        fi
    fi
}

# Function to display usage
show_usage() {
    echo "Usage: $0 [SERVICE1] [SERVICE2] ... [OPTIONS]"
    echo ""
    echo "Services:"
    echo "  frontend   - React frontend with Nginx"
    echo "  backend    - NestJS API server"
    echo "  postgres   - PostgreSQL database"
    echo "  pgadmin    - PgAdmin database management"
    if [ "$MONITORING_PRESENT" = true ]; then
      echo "  monitoring - Monitoring stack (Prometheus, Grafana, Loki, Promtail, Tempo, Pyroscope, OTel Collector, Postgres Exporter)"
    fi
    echo "  all        - Build all services"
    echo ""
    echo "Options:"
    echo "  --no-cache    Build without using cache"
    echo "  --logs        Show logs after starting"
    echo "  --help, -h    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Interactive menu"
    echo "  $0 frontend backend   # Build only frontend and backend"
    echo "  $0 backend --no-cache # Build backend without cache"
    echo "  $0 all --logs         # Build all and show logs"
}

# Function to check if service is valid
is_valid_service() {
    local service=$1
    if [[ "$service" == "all" ]]; then
        return 0
    fi
    for valid_service in "${AVAILABLE_SERVICES[@]}"; do
        if [[ "$valid_service" == "$service" ]]; then
            return 0
        fi
    done
    return 1
}

# Function to show interactive menu
show_interactive_menu() {
    echo "Select service to build:"
    echo "1) frontend"
    echo "2) backend" 
    echo "3) postgres"
    echo "4) pgadmin"
    if [ "$MONITORING_PRESENT" = true ]; then
      echo "5) monitoring (full stack)"
      echo "6) postgres-exporter"
      echo "7) all"
    else
      echo "5) all"
      echo "(monitoring/ folder missing; monitoring services are unavailable)"
    fi
    echo ""
    
    read -p "Choice: " choice
    
    case $choice in
        1)
            SERVICES_TO_BUILD=("frontend")
            ;;
        2)
            SERVICES_TO_BUILD=("backend")
            ;;
        3)
            SERVICES_TO_BUILD=("postgres")
            ;;
        4)
            SERVICES_TO_BUILD=("pgadmin")
            ;;
        5)
            if [ "$MONITORING_PRESENT" = true ]; then
              SERVICES_TO_BUILD=("monitoring")
            else
              SERVICES_TO_BUILD=("all")
            fi
            ;;
        6)
            if [ "$MONITORING_PRESENT" = true ]; then
              SERVICES_TO_BUILD=("postgres-exporter")
            else
              echo "Invalid option. Building all services."
              SERVICES_TO_BUILD=("all")
            fi
            ;;
        7)
            if [ "$MONITORING_PRESENT" = true ]; then
              SERVICES_TO_BUILD=("all")
            else
              echo "Invalid option. Building all services."
              SERVICES_TO_BUILD=("all")
            fi
            ;;
        *)
            echo "Invalid option. Building all services."
            SERVICES_TO_BUILD=("all")
            ;;
    esac
}

# Parse command line arguments
SERVICES_TO_BUILD=()
BUILD_OPTIONS=()
SHOW_LOGS=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_usage
            exit 0
            ;;
        --no-cache)
            BUILD_OPTIONS+=("--no-cache")
            shift
            ;;
        --logs)
            SHOW_LOGS=true
            shift
            ;;
        -*)
            echo "Unknown option: $1"
            show_usage
            exit 1
            ;;
        *)
            if is_valid_service "$1"; then
                SERVICES_TO_BUILD+=("$1")
            else
                echo "Invalid service: $1"
                echo "Available services: ${AVAILABLE_SERVICES[*]} all"
                exit 1
            fi
            shift
            ;;
    esac
done

# Show interactive menu if no services specified
if [ ${#SERVICES_TO_BUILD[@]} -eq 0 ]; then
    show_interactive_menu
fi

# Convert "all" to actual services
if [[ " ${SERVICES_TO_BUILD[*]} " =~ " all " ]]; then
    SERVICES_TO_BUILD=("${CORE_SERVICES[@]}")
    if [ "$MONITORING_PRESENT" = true ]; then
      SERVICES_TO_BUILD+=("${MONITORING_SERVICES[@]}")
    fi
fi

# Expand monitoring to individual services
if [[ " ${SERVICES_TO_BUILD[*]} " =~ " monitoring " ]]; then
    if [ "$MONITORING_PRESENT" = true ]; then
      # Remove monitoring token and add full observability stack
      SERVICES_TO_BUILD=(${SERVICES_TO_BUILD[@]/monitoring})
      SERVICES_TO_BUILD+=("${MONITORING_SERVICES[@]}")
    else
      echo "Monitoring services are unavailable (monitoring/ folder not found). Skipping."
      SERVICES_TO_BUILD=(${SERVICES_TO_BUILD[@]/monitoring})
    fi
fi

echo "Building services: ${SERVICES_TO_BUILD[*]}"

# Build and start services
# Pre-install to avoid docker --frozen-lockfile failures
if [[ " ${SERVICES_TO_BUILD[*]} " =~ " backend " ]] || [[ " ${SERVICES_TO_BUILD[*]} " =~ " all " ]]; then
    preinstall_if_needed "backend"
    echo "🔧 Building backend locally (to update dist/ for mounted volume)..."
    (cd backend && yarn build) || { echo "❌ Backend build failed"; exit 1; }
fi
if [[ " ${SERVICES_TO_BUILD[*]} " =~ " frontend " ]] || [[ " ${SERVICES_TO_BUILD[*]} " =~ " all " ]]; then
    preinstall_if_needed "frontend"
fi

BUILD_CMD="docker-compose up --build -d"

# Add build options
for option in "${BUILD_OPTIONS[@]}"; do
    BUILD_CMD+=" $option"
done

# Add specific services
for service in "${SERVICES_TO_BUILD[@]}"; do
    BUILD_CMD+=" $service"
done

echo "Executing: $BUILD_CMD"
eval $BUILD_CMD

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Services started successfully!"
echo ""
echo "Frontend:   http://localhost:3000"
echo "Backend API: http://localhost:8080"
echo "PgAdmin:    http://localhost:5050"
if [ "$MONITORING_PRESENT" = true ]; then
  echo "Grafana:    http://localhost:3001"
  echo "Prometheus: http://localhost:9090"
  echo "Pyroscope:  http://localhost:4040"
fi
echo ""

# Show logs if requested
if [ "$SHOW_LOGS" = true ]; then
    echo "Showing logs..."
    if [ ${#SERVICES_TO_BUILD[@]} -eq ${#AVAILABLE_SERVICES[@]} ]; then
        docker-compose logs -f
    else
        docker-compose logs -f "${SERVICES_TO_BUILD[@]}"
    fi
fi