import fs from "fs";
import path from "path";
import { swaggerSpec } from "../src/config/swaggerConfig";

const docsDir: string = path.resolve(process.cwd(), "docs");
const outputPath: string = path.join(docsDir, "openapi.json");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), "utf8");

console.log(`OpenAPI spec written to ${outputPath}`);
