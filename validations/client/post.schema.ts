import { auth } from '@/lib/auth';
import * as z from 'zod';


export const updateProfileSchema = z.object({
    email: z.email('Invalid Email'),
    image: z.string().nullable().optional(),
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

export const createPostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"), 
    // content: z.string().min(1, "Content is required"),
    featuredImage: z.any().nullable().optional(),
    publishedAt: z.string().optional(),
})