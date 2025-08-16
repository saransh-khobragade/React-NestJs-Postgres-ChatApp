# NestJS CRUD API with PostgreSQL

A complete CRUD API application built with NestJS, PostgreSQL, and Docker Compose.

## 🚀 Features

- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **PostgreSQL Database**: Robust relational database with TypeORM
- **Docker Compose**: Easy development and deployment setup
- **Swagger Documentation**: Interactive API documentation
- **Input Validation**: Request validation using class-validator
- **TypeScript**: Full type safety throughout the application
- **User Management**: Complete CRUD operations for users
- **pgAdmin**: Web-based database management interface
- **Automatic Database Setup**: PostgreSQL initialization handled automatically
- **Flexible Service Management**: Start individual services or rebuild specific containers

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Docker and Docker Compose

## ⚡ Quick Start

### Start All Services (Recommended)

```bash
# Start all services (PostgreSQL, NestJS App, pgAdmin)
./scripts/start.sh
```

This will start:
- **NestJS API** at http://localhost:8080
- **Swagger Docs** at http://localhost:8080/api
- **pgAdmin** at http://localhost:5050
- **PostgreSQL** on port 5432

### Start Specific Services

```bash
# Start only the NestJS backend
./scripts/start.sh --backend-only

# Start only PostgreSQL database
./scripts/start.sh --postgres-only

# Start only pgAdmin interface
./scripts/start.sh --pgadmin-only
```

### Manual Start

```bash
# Start with Docker Compose
docker-compose up -d

# Start the application
yarn start:dev
```

## 🔧 Service Management

### Start Script Options

The `./scripts/start.sh` script provides flexible service management:

```bash
# Start all services
./scripts/start.sh

# Start specific services only
./scripts/start.sh --backend-only     # Only NestJS API
./scripts/start.sh --postgres-only    # Only PostgreSQL
./scripts/start.sh --pgadmin-only     # Only pgAdmin

# Rebuild specific services
./scripts/start.sh --rebuild-backend  # Rebuild NestJS app only
./scripts/start.sh --rebuild-postgres # Rebuild PostgreSQL only
./scripts/start.sh --rebuild-pgadmin  # Rebuild pgAdmin only

# Rebuild everything
./scripts/start.sh --rebuild

# Show help
./scripts/start.sh --help
```

### Use Cases for Service-Specific Starts

- **`--backend-only`**: When you only need to test the API without database overhead
- **`--postgres-only`**: When you need to work with the database directly
- **`--pgadmin-only`**: When you need database management interface
- **`--rebuild-backend`**: After making code changes to the NestJS application
- **`--rebuild-postgres`**: When you need to reset the database
- **`--rebuild-pgadmin`**: When pgAdmin configuration needs updating

## 🗄️ Database Management

### pgAdmin Web Interface
- **URL**: http://localhost:5050
- **Email**: admin@admin.com
- **Password**: admin

### Database Connection Details
- **Host**: postgres (or localhost)
- **Port**: 5432
- **Database**: test_db
- **Username**: postgres
- **Password**: password

### Quick Database Commands
```bash
# View all tables
docker exec -it postgres psql -U postgres -d test_db -c "\dt"

# View users
docker exec -it postgres psql -U postgres -d test_db -c "SELECT * FROM users;"

# Check database status
docker exec -it postgres psql -U postgres -c "\l"
```

### Database Initialization
The `test_db` database is automatically created when the PostgreSQL container starts for the first time using:
- **Environment variable**: `POSTGRES_DB: test_db`
- **Init script**: `init.sql` (runs automatically on first startup)

No manual database initialization is needed!

## 🔌 API Endpoints

### Auth
- `POST /api/auth/signup` - Sign up (returns `access_token`)
- `POST /api/auth/login` - Login (returns `access_token`)

### Blogs
- `GET /api/blogs` - List blogs
- `GET /api/blogs/:id` - Blog detail
- `POST /api/blogs` - Create blog (Bearer token required)

### Health & Documentation
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api` - Swagger documentation

## 🧪 Testing

### Test All APIs
```bash
./scripts/test-api.sh
```

### Manual Testing Examples
```bash
# Create a user
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 30,
    "isActive": true
  }'

# Get all users
curl http://localhost:8080/users

# Get user by ID
curl http://localhost:8080/users/1

# Update user
curl -X PATCH http://localhost:8080/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "isActive": false
  }'

# Delete user
curl -X DELETE http://localhost:8080/users/1
```

## 🛠️ Development

### Available Scripts
```bash
yarn start:dev    # Start in development mode
yarn build        # Build the application
yarn start:prod   # Start in production mode
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode
yarn test:cov     # Run tests with coverage
yarn test:e2e     # Run end-to-end tests
yarn lint         # Run ESLint
yarn format       # Format code with Prettier
```

### Environment Variables
Copy `env.example` to `.env` and configure:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=test_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password

# Application Configuration
NODE_ENV=development
PORT=8080

# JWT Configuration (for future use)
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Start specific services
docker-compose up -d backend
docker-compose up -d postgres
docker-compose up -d pgadmin

# View logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f postgres

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Remove volumes (will delete database data)
docker-compose down -v

# Clean up everything
./scripts/cleanup.sh
```

## 🔧 Scripts

### Start Script with All Options
```bash
# Normal start
./scripts/start.sh

# Start specific services
./scripts/start.sh --backend-only     # Start only NestJS app
./scripts/start.sh --postgres-only    # Start only PostgreSQL
./scripts/start.sh --pgadmin-only     # Start only pgAdmin

# Rebuild specific containers
./scripts/start.sh --rebuild-backend   # Rebuild NestJS app only
./scripts/start.sh --rebuild-postgres  # Rebuild PostgreSQL only
./scripts/start.sh --rebuild-pgadmin   # Rebuild pgAdmin only

# Rebuild everything
./scripts/start.sh --rebuild

# Show help
./scripts/start.sh --help
```

### Other Scripts
- `./scripts/test-api.sh` - Test all API endpoints
- `./scripts/cleanup.sh` - Clean up all Docker resources

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (hashed, VARCHAR)
- `age` (INT, Optional)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Blogs Table
- `id` (Primary Key)
- `title` (VARCHAR)
- `content` (TEXT)
- `author_id` (FK -> users.id)
- `created_at` (TIMESTAMP)

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── app.controller.ts      # Main controller
├── auth/                  # Authentication module
│   ├── auth.controller.ts # Auth endpoints
│   ├── auth.service.ts    # Auth business logic
│   ├── auth.module.ts     # Auth module definition
│   └── dto/               # Auth DTOs
│       ├── login.dto.ts
│       └── signup.dto.ts
├── users/                 # Users module
│   ├── user.entity.ts     # User database entity
│   ├── users.controller.ts # Users API endpoints
│   ├── users.service.ts   # Users business logic
│   ├── users.module.ts    # Users module definition
│   └── dto/               # Data Transfer Objects
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── scripts/               # Development scripts
    ├── start.sh           # Service management script
    ├── test-api.sh        # API testing script
    └── cleanup.sh         # Cleanup script
```

## 📚 Dependencies

### Core Dependencies
- **@nestjs/common**: NestJS core functionality
- **@nestjs/typeorm**: TypeORM integration for NestJS
- **@nestjs/swagger**: API documentation
- **typeorm**: ORM for database operations
- **pg**: PostgreSQL driver
- **class-validator**: Input validation
- **class-transformer**: Object transformation

### Development Dependencies
- **@nestjs/cli**: NestJS command line tools
- **@nestjs/testing**: Testing utilities
- **eslint**: Code linting
- **prettier**: Code formatting
- **jest**: Testing framework
- **typescript**: TypeScript compiler

## 🔍 Troubleshooting

### Common Issues

**Backend not connecting to database:**
- Ensure PostgreSQL container is running: `docker-compose ps`
- Check database exists: `docker exec postgres psql -U postgres -c "\l"`
- Restart backend: `docker-compose restart backend`
- Rebuild database: `./scripts/start.sh --rebuild-postgres`

**pgAdmin not showing servers:**
- Check servers.json configuration
- Restart pgAdmin: `docker-compose restart pgadmin`
- Rebuild pgAdmin: `./scripts/start.sh --rebuild-pgadmin`
- Verify PostgreSQL is accessible from pgAdmin container

**Port conflicts:**
- Check if ports 8080, 5432, or 5050 are in use
- Stop conflicting services or change ports in docker-compose.yml

**Service-specific issues:**
- Use service-specific start options to isolate problems
- Check individual service logs: `docker-compose logs -f [service_name]`
- Rebuild specific services as needed

### Useful Commands
```bash
# Check container status
docker-compose ps

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f pgadmin

# Access PostgreSQL
docker exec -it postgres psql -U postgres -d test_db

# Rebuild specific service
./scripts/start.sh --rebuild-backend
./scripts/start.sh --rebuild-postgres
./scripts/start.sh --rebuild-pgadmin

# Start only what you need
./scripts/start.sh --backend-only
./scripts/start.sh --postgres-only
```

### Service Isolation Testing

When debugging issues, you can isolate services:

```bash
# Test only the database
./scripts/start.sh --postgres-only
docker exec -it postgres psql -U postgres -d test_db

# Test only the backend (will fail without database)
./scripts/start.sh --backend-only

# Test only pgAdmin
./scripts/start.sh --pgadmin-only
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 