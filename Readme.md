## Palm Mind — Task Chat Application

Real-time chat application (MERN-style) with user CRUD, authentication/authorization, Socket.IO real-time messaging, and persisted chat history in MongoDB.

Tech stack

- Backend: Node.js, Express, TypeScript/JavaScript, MongoDB (mongoose), Socket.IO

- Frontend: React + TypeScript, Vite, Tailwind CSS

Main features

- User registration, login (JWT) and full CRUD for users (auth protected)

- Real-time messaging using Socket.IO

- Chat messages persisted to MongoDB

- Live counts: total users and total chat messages

- Frontend listens to socket events (message, user join) and updates UI live

Repository structure

```bash
./
	Readme.md
	.env.example         # root example env (optional global vars)
	backend/
		package.json
		tsconfig.json
		.env.example       # backend env example (DB, JWT, PORT)
	frontend/
		package.json
		vite.config.ts
		.env.example       # frontend env example (VITE_API_URL)
		src/
			App.tsx
			main.tsx
			assets/
```

Getting started (developer)

Prerequisites

- Node.js 18+ (or LTS)

- npm or yarn

- MongoDB (local or Atlas)

1. Clone

```bash
git clone <repo-url>
cd "Palm_Mind(MERN_Project)"
```

2. Copy environment files

Copy the example envs and fill with your values:

```bash
cp .env.example backend/.env.example frontend/.env.example
# edit backend/.env.example to add MONGO_URI and JWT_SECRET
```

3. Install dependencies

Backend (from project root):

```bash
cd backend
npm install
# or: pnpm install | yarn
```

Frontend:

```bash
cd ../frontend
npm install
```

4. Run in development

Start backend (example; adjust script in backend/package.json if you add one):

```bash
cd backend
# if you have a dev script, use it (e.g. `npm run dev`)
node index.js
```

Start frontend:

```bash
cd frontend
npm run dev
```

API & Socket summary (contract)

Backend HTTP API (examples)

- POST /api/auth/register — register a new user

- POST /api/auth/login — login and receive a JWT

- GET /api/users — (auth) list users

- GET /api/users/:id — (auth) get a user

- PUT /api/users/:id — (auth, owner/admin) update a user

- DELETE /api/users/:id — (auth, owner/admin) delete a user

- GET /api/stats — (auth) returns { totalUsers, totalMessages }

Socket events

- Client -> Server

  - join: { userId, name } — user joins a room or global chat

  - message: { fromUserId, text, toRoom? }

- Server -> Client

  - user-joined: { userId, name }

  - message: { \_id, fromUserId, name, text, createdAt }

  - counts: { totalUsers, totalMessages }

Data shapes (examples)

- User
  - \_id, name, email, passwordHash, role
- Message
  - \_id, fromUser (ref), text, createdAt

Environment variables
See the `.env.example` files for variables to set. Typical keys:

- backend: MONGO_URI, JWT_SECRET, PORT

- frontend: VITE_API_URL (URL of backend server)

Development notes & suggestions

- Use nodemon / ts-node-dev for backend when developing TypeScript

- Use React Query or SWR for restful requests; Socket.IO client for real-time

- Keep JWT expiry and refresh strategy appropriate for your app

Deployment

- For production, set NODE_ENV=production and secure your JWT_SECRET

- Use process managers (pm2) or containerize (Docker) for backend

- Host frontend on static hosting (Vercel, Netlify) and point VITE_API_URL to your backend

Next steps (if you'd like me to continue)

- I can implement the backend endpoints + Socket.IO handlers and add tests.

- Or I can scaffold a simple React UI that connects to the socket and shows messages live.

License

- Add your license or choose an open source license.

Contact

- Maintainer: ToniBirat7

---

This README provides a complete developer-focused setup. If you want, I can now implement the backend APIs and socket handlers, then wire a minimal frontend UI and run basic checks.
