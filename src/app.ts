import express from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res): void => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use("/api/v1/events", eventRoutes);

export default app;
