import type { Request, Response, Application } from "express";
import { body, validationResult } from "express-validator";
import { calculateFrameScore } from "../services/calculate-score";
import { Rolls } from "../types";

export default function calculatorApiRoutes(app: Application) {
  app.post(
    "/rolls",
    body("rolls").isArray(),
    body("rolls").isLength({ min: 1 }),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const rolls = req.body.rolls as Rolls;

      const score = calculateFrameScore(rolls);

      res.json(score);
    }
  );
}
