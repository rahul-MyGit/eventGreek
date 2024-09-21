import { object, string } from "zod";

export const signInSchema = object({
    name: string({required_error: "Enter your name"})
    .min(1, "Name is required"),
    
    email: string({ required_error: "Email is required"})
    .min(1, "Email is requried")
    .email("Invalid email"),

    password: string({ required_error: "Password is required"})
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(32, "Password must be less than 32 characters")
})