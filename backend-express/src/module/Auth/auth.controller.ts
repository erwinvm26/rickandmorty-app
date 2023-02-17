import { Request, Response, NextFunction, Router } from "express";
import { z } from "zod";
import { NotFound } from "http-errors";

const router = Router();

const loginValidated = z.object({
  body: z
    .object({
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z.string()
    })
    .partial()
});

type LoginPostInput = z.TypeOf<typeof loginValidated>["body"];

router.post(
  "/login",
  (req: Request<{}, {}, LoginPostInput>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new NotFound("email and password is required");
    }

    next();
  },
  (req: Request<{}, {}, LoginPostInput>, res: Response, next: NextFunction) => {
    console.log("login");
  }
);

export default router;
