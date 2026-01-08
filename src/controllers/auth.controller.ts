import { CreateAccount } from "../services/auth.service.js";
import catchErrors from "../utils/catchErrors.js";
import { z } from "zod"


const registerSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email().min(1).max(255),
    password: z.string().min(5).max(128),
    confirmPassword: z.string().min(5).max(128),
    userAgent: z.string().nullable(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export const registerHandler = catchErrors(
    async (req, res) => {
        // validate request
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers['user-agent'] ?? null,
        })
        // call service
        const {user, accessToken, refreshToken} = await CreateAccount(request);
        // return response
    }
)