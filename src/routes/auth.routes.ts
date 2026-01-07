import {Router} from "express";
import { registerHandler } from "../controllers/auth.controller.js";

const authrouter = Router();

// prefix: /auth

authrouter.post("/register", registerHandler)

export default authrouter;