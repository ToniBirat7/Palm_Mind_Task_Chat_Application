# Palm Mind — Real-Time Chat Application

A full-stack MERN application for real-time messaging with support for **private 1-on-1 chats** and **group messaging**. Built with modern TypeScript, Socket.IO for real-time communication, and MongoDB for persistent storage.

## 🎯 Features

**User Authentication** — JWT-based login/signup with secure password hashing

**Real-Time Messaging** — Socket.IO instant message delivery

**Private Chats** — 1-on-1 messaging between users with chat history

**Group Chats** — Multiple users in group conversations

**Message Persistence** — All messages stored in MongoDB

**Online Status** — Real-time member presence tracking

**Responsive UI** — Tailwind CSS with monochromatic design

**Form Validation** — Email and password strength validation

**Ambient Types** — Global TypeScript interfaces without imports

## 🛠️ Tech Stack

**Backend:**

- Node.js with Express 5.x

- TypeScript

- Socket.IO 4.x for real-time communication

- MongoDB with Mongoose

- JWT authentication

- bcrypt for password hashing

**Frontend:**

- React 19.x

- TypeScript

- Vite 7.x (build tool)

- Tailwind CSS 4.x

- React Router 7.x

- Socket.IO Client 4.x

## 📦 Project Structure

```
Palm_Mind(MERN_Project)/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express + Socket.IO server
│   │   ├── server.ts              # Entry point
│   │   ├── controller/            # Route handlers
│   │   ├── middleware/            # JWT authentication
│   │   ├── model/                 # MongoDB schemas
│   │   ├── routes/                # API endpoints
│   │   └── types/                 # TypeScript definitions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx                # Main component with routing
│   │   ├── components/            # React components
│   │   ├── hooks/                 # Custom hooks (useSocket)
│   │   ├── types/                 # Global type definitions
│   │   └── utils/                 # Helper functions
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)

- **npm** or **yarn**

- **MongoDB** (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone & Setup

```bash
git clone https://github.com/ToniBirat7/Palm_Mind_Task_Chat_Application.git .
cd "Palm_Mind(MERN_Project)"
```

### 2. Docker Compose Setup

For `MongoDB` setup using Docker Compose, run the following command in the project root:

```bash
cd backend
docker-compose up -d
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```bash
MONGO_URI=mongodb://localhost:27017/palm_mind
JWT_SECRET=your_jwt_secret_key_here
PORT=3000
```

Start the backend:

```bash
npm run dev
```

The backend will run on **http://localhost:3000**

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on **http://localhost:5173**

## API Endpoints

### Authentication

- `POST /auth/create-user` — Register a new user

- `POST /auth/login` — Login and receive JWT token

### Chat

- `GET /api/v1/pchat/:userId` — Fetch private chat history with a user

- `GET /api/v1/gchat/:groupId` — Fetch group chat history

### WebSocket Events

**Client → Server:**

- `join-room` — Join a chat room

- `send_message` — Send a message to a group

- `send_private_message` — Send a direct message to a user

**Server → Client:**

- `member` — User joined (broadcasts member info)

- `receive_message` — Incoming message

- `disconnect` — User left

## Data Models

### User

```typescript
{
  _id: ObjectId,
  fname: string,
  lname: string,
  email: string (unique),
  password: string (hashed),
  address: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Conversation (Private Chat)

```typescript
{
  _id: ObjectId,
  sender: ObjectId (ref: User),
  receiver: ObjectId (ref: User),
  message: string,
  timestamp: Date
}
```

### GroupChat

```typescript
{
  _id: ObjectId,
  sender: ObjectId (ref: User),
  receiver: string (roomId),
  message: string,
  timestamp: Date
}
```

## Security Features

- JWT token-based authentication

- Password hashing with bcrypt

- CORS enabled for cross-origin requests

- Socket.IO middleware for JWT verification

- HTTP-only cookies for token storage

## UI Components

- **Login** — Email/password authentication with validation

- **CreateUser** — User registration form

- **Sidebar** — Navigation with Personal & Groups tabs

- **ChatWindow** — 1-on-1 messaging interface

- **GroupChatWindow** — Group chat with member list

- **SocketProvider** — Global socket context for real-time updates

## Development

### Running Tests

```bash
cd frontend
npm run lint
```

### Building for Production

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📝 Environment Variables

### Backend (`.env`)

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
PORT=3000
```

**Notes:**

- First `create-user` to register a new user before logging in.

- Then login to join the global chat.

- Choose `Groups` tab to create/join group chats.

- Choose `Personal` tab to start private chats.
