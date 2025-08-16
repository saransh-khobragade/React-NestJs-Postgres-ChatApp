# React + NestJS + Postgres (CRUD + Chat)

Full‑stack user management app with React (frontend), NestJS (backend), and Postgres, featuring a minimal WhatsApp-like chat system.

## 🚀 Quick start (Docker)

```bash
# Build and start selected services (or use "all")
./scripts/build.sh all

# Or only app core
./scripts/build.sh frontend backend postgres pgadmin

## Services

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger: http://localhost:8080/api
- pgAdmin: http://localhost:5050 (admin@admin.com / admin)
```

To start everything:

```bash
./scripts/build.sh all
```

## ✨ Features

- **User Management**: Complete CRUD operations for users
- **Authentication**: JWT-based login/signup with password hashing
- **Blog System**: Create and view blog posts
- **Real-time Chat**: WhatsApp-like messaging with Socket.IO
  - Direct conversations between users
  - Real-time message delivery
  - Conversation list and message history
  - User search functionality

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - List all users
- `GET /api/users?query=<search>` - Search users by name/email

### Chat
- `GET /api/conversations` - List user's conversations (JWT required)
- `GET /api/conversations/:id/messages` - Get conversation messages (JWT required)
- `POST /api/conversations/direct/:userId` - Create/get direct conversation (JWT required)

### WebSocket Events
- `conversation.join` - Join a conversation room
- `conversation.leave` - Leave a conversation room
- `message.send` - Send a message
- `message.receive` - Receive a message (broadcast to room)

## ♻️ Rebuild workflow

Use a single script with two modes:

```bash
# For config/env updates → SOFT (no image build)
./scripts/rebuild.sh <service|all> soft

# For code/Dockerfile changes → HARD (rebuild image)
./scripts/rebuild.sh <service|all> hard
```

Examples:

```bash
# After backend code edits
./scripts/rebuild.sh backend hard

# Recreate frontend to pick up env/static content changes
./scripts/rebuild.sh frontend soft
```

Supported services: `frontend backend postgres pgadmin`. Use `all` for everything.

## Database access

pgAdmin is included for DB administration at http://localhost:5050 (default: admin@admin.com / admin). Default Postgres connection inside Docker uses host `postgres`, port `5432`.

### Database Schema

The app includes these main tables:
- `users` - User accounts and profiles
- `blogs` - Blog posts with authors
- `conversations` - Chat conversations
- `conversation_participants` - Many-to-many relationship between users and conversations
- `messages` - Individual chat messages

## 🧑‍💻 Local frontend dev

```bash
cd frontend
yarn install
yarn dev   # http://localhost:3000
```

## 🧑‍💻 Local backend dev

```bash
cd backend
yarn install
yarn start   # http://localhost:8080
```

## 🔧 Useful commands

```bash
# Tail service logs
docker compose logs -f backend

# Run simple API smoke tests
./scripts/test-api.sh.sh

# Health-check API
curl -s http://localhost:8080/api | jq .
```

## 📱 Using the Chat

1. **Sign up/Login**: Visit http://localhost:3000/auth
2. **Open Chat**: Click "Open Chat" on the homepage or navigate to http://localhost:3000/chat
3. **Start Messaging**: 
   - The left sidebar shows your conversations
   - Click on a conversation to view messages
   - Type and send messages in real-time
   - Messages appear with sender/receiver alignment like WhatsApp

## 🛠️ Development Notes

- **First Run**: If you've run the app before adding chat features, recreate the database:
  ```bash
  docker compose down -v && docker compose up -d --build
  ```
- **WebSocket**: Uses Socket.IO with JWT authentication
- **Real-time**: Messages are delivered instantly to all participants in a conversation
- **Minimal**: Focuses on direct messaging; no group chats, message editing, or typing indicators

## 📚 Documentation

- **GIST.md**: Quick overview for developers
- **LLM_MANIFEST.json**: Machine-readable project schema
- **Swagger**: Interactive API docs at http://localhost:8080/api