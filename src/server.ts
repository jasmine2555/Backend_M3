import "../config/env";
import app from "./app";

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT} (from PORT environment variable)`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
