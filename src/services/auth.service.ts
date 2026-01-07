import  jwt  from "jsonwebtoken";
import VerificationCodeType from "../constants/VerificationCodeType.js";
import SessionModel from "../models/session.model.js";
import UserModel from "../models/user.model.js"
import VerificationCodeModel from "../models/VerificationCode.model.js";
import { oneYearFromNow } from "../utils/date.js";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js";


export type CreateAccountParams = {
    email: string,
    password: string,
    userAgent?: string | null
}

export const CreateAccount = async (data: CreateAccountParams) => {
    // verify existing user doesnt exist
    const existingUser = await UserModel.exists({
        email: data.email
    });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password
    })
    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    })

    // send verification email

    //create session
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent || null
    })

    // sign access token & refresh token
    const refreshToken = jwt.sign(
        {sessionId: session._id},
        JWT_REFRESH_SECRET,{
            audience: ['user'],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id
        },
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m"
        }
    );

    // return user & token
    return {
        user,
        accessToken,
        refreshToken
    }
}