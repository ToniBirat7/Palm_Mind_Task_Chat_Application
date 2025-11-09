## **Tools Used**

- Node.js

- TypeScript

- React

- Vite

- TailwindCSS

- Express

- MongoDB (Mongoose) in Docker

- Socket.IO

- JWT Authentication

- bcrypt for password hashing

- dotenv for environment variable management

- Docker for containerization

- Nodemon for development server auto-restart

## **Project Starter**

1. Initialize Node.js Project

- Run `npm init -y` to create a `package.json` file.

2. Use `TypeScript`

- Install TypeScript: `npm install typescript --save-dev`

- Initialize TypeScript configuration: `npx tsc --init`

3. Setup `React with TailwindCSS and Vite`

- Create a folder `frontend` and navigate into it: `mkdir frontend && cd frontend`

- Initialize a Vite project with React and TypeScript: `npm create vite@latest .`

- Install TailwindCSS and its dependencies: `npm install tailwindcss @tailwindcss/vite`

- Also, install `TailwindCLI` to generate the main `CSS` file:

```bash
npm install @tailwindcss/cli
```

- Configure the `vite.config.ts` file to include TailwindCSS plugin.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- Generate the `CSS` file using TailwindCLI:

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

**Build `Backend` with `Express`, `MongoDB`, and `Socket.IO`**

- `npm run build` to compile TypeScript files to JavaScript in the `dist` folder.

**Build `Frontend` with `Vite`**

- `npm run build` to create a production build in the `dist` folder.

**Run the Builds**

- `npm start` to run the compiled backend server.

<hr>

## **Integrating `Socket.IO` for Real-Time Communication**

- Install `Socket.IO`:

```bash
npm install socket.io

npm install @types/socket.io --save-dev
```

- Set up a basic `Socket.IO` server in your `Express` application.

## `Socket.IO` with `React Typescript`

- Install `Socket.IO Client`:

```bash
npm install socket.io-client
npm install @types/socket.io-client --save-dev # Typescript types for Socket.IO Client
```

## **Run `MongoDB` in Docker**

- Create a `docker-compose.yml` file to define the MongoDB service.

- Use the following command to start MongoDB in a Docker container:

```bash
docker-compose up -d
```

- If we want to get into the MongoDB container shell, use:

```bash
docker exec -it mongodb mongosh -u root -p example

# Then create the database

use chat_app

```

## **Access `MongoDB` from Backend**

- Install `mongoose`:

```bash
npm install mongoose
npm install @types/mongoose --save-dev
```

- Install `dotenv` to manage environment variables:

```bash
npm install dotenv
```

- Use the connection string in your backend `.env` file:

```bash
MONGO_URI=mongodb://root:example@localhost:27017/chat_app?authSource=admin
```

## **JWT Authentication**

- Install `jsonwebtoken` and `bcrypt`:

```bash
npm install jsonwebtoken bcrypt
npm install @types/jsonwebtoken @types/bcrypt --save-dev
```

- Use JWT for user authentication and bcrypt for password hashing.

## **JWT Working**

**Login Flow**

1. User sends login request with credentials.

2. Backend verifies credentials and generates a JWT token upon successful authentication.

3. The JWT token is sent back to the client and stored in an HTTP-only, `SameSite=Strict` cookie.

**Chat Flow**

1. Client first tries to connect to the Socket.IO server. We send the cookie along with the connection request. We pass the cookie via `Auth` header as shown below:

```ts
// Frontend
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true, // Ensure Cookies are sent with the Request
});
```

2. On the server side, we extract the JWT token from the cookie in the `Headers` i.e. `socket.handshake.headers.cookie` header during the Socket.IO connection handshake. We verify the token to authenticate the user before establishing the connection. This is done using a middleware function for Socket.IO.

<hr>
