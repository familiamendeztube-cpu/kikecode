import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(cookieParser(process.env.SESSION_SECRET));
// Keep a small global body limit to minimize attack surface. The one endpoint
// that needs larger bodies (customized sites embed compressed base64 photos,
// capped at ~12 MB by the route's Zod schema) gets a higher limit. The limit
// must be chosen by a single parser up front, because a small global json()
// would otherwise reject the large body with 413 before routing.
const smallJson = express.json({ limit: "1mb" });
const largeJson = express.json({ limit: "15mb" });
// Endpoints that may carry compressed base64 images (customized-site photos, or
// client photos attached to the AI customizer chat) need the larger limit. The
// limit must be chosen up front, since a small global json() would 413 the large
// body before routing.
const LARGE_BODY_PATHS = new Set(["/api/customized-sites", "/api/customize"]);
app.use((req, res, next) => {
  if (req.method === "POST" && LARGE_BODY_PATHS.has(req.path)) {
    largeJson(req, res, next);
    return;
  }
  smallJson(req, res, next);
});
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use("/api", router);

export default app;
