import express from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";
import { corsConfig } from "./config/corsConfig";
import { helmetConfig } from "./config/helmetConfig";
import {
  swaggerUiServe,
  swaggerUiSetup,
} from "./config/swaggerConfig";

const app = express();

app.use(helmetConfig);
app.use(corsConfig);
app.use(express.json());

app.use("/api-docs", swaggerUiServe, swaggerUiSetup);

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Returns server status, uptime, and version information
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 3711.4152622
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
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
