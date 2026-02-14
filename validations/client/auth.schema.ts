import * as z from 'zod';


export const signinSchema = z.object({
    email: z.email('Invalid Email'),
    password: z.string().min(1, 'Password is required'),
 

})

export const signupSchema = z.object({
    email: z.email('Invalid Email'),
    firstname: z.string().min(2, 'Firstname must be at least 2 chars'),
    lastname: z.string().min(2, 'Lastname must be at least 2 chars'),
    password: z.string().min(1, "Password is required")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/,
        "Password must be 6+ chars, include uppercase, lowercase, number & special character"
    ),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
}) .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // show error under confirmPassword
  });