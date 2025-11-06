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

## **How to Use This Repository**

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
