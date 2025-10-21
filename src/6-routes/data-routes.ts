import express, { Request, Response, NextFunction } from "express";
import logger from "../4-utils/logger";
import MessageModel from "../2-models/message-model";

const router = express.Router();

router.get("/register/:message", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const raw = request.params.message;
        const message = new MessageModel(JSON.parse(raw));
        logger.logActivity(message);
        response.sendStatus(200);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
