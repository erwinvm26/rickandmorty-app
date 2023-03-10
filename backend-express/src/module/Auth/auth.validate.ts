import { z } from "zod";

// Validated the request
export const loginValidated = z.object({
  body: z
    .object({
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z.string().min(6, { message: "This field has to be filled." })
    })
    .partial()
});

export const verifyUser = z.object({
  body: z
    .object({
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email.")
    })
    .partial()
});

export type LoginPostInput = z.TypeOf<typeof loginValidated>["body"];

export type LoginEmailPostInput = z.infer<typeof verifyUser>["body"];
