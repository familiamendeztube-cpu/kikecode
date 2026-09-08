import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import customizeRouter from "./customize";
import generateRouter from "./generate";
import customizedSitesRouter from "./customized-sites";
import ttsRouter from "./tts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(customizeRouter);
router.use(generateRouter);
router.use(customizedSitesRouter);
router.use(ttsRouter);

export default router;
