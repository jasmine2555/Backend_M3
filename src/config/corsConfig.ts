import cors, { CorsOptions } from "cors";

const parseAllowedOrigins = (): string[] => {
  const origins: string =
    process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:5173";

  return origins.split(",").map((origin: string) => origin.trim());
};

const allowedOrigins: string[] = parseAllowedOrigins();

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ): void => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Request-Id"],
  credentials: true,
  maxAge: 86400,
  optionsSuccessStatus: 204,
};

export const corsConfig = cors(corsOptions);
