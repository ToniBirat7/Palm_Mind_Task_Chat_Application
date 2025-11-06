import app from "./app.js";
import { PORT } from "./config/index.js";

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
