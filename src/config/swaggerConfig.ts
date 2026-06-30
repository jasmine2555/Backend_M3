import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Event Registration API",
    version: "1.0.0",
    description:
      "REST API for managing event registrations with Joi validation and Firestore persistence. Built for Module 3/5 Backend Development.",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Health", description: "Server health check endpoints" },
    { name: "Events", description: "Event CRUD operations" },
  ],
};

const swaggerOptions: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: [
    "./src/app.ts",
    "./src/api/v1/routes/*.ts",
    "./src/api/v1/docs/*.ts",
    "./src/api/v1/validation/*.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
