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
