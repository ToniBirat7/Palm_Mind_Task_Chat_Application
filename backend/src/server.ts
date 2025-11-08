import { server } from "./app.js";
import { PORT } from "./config/index.js";
import { connectDB } from "./config/index.js";

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

connectDB();
