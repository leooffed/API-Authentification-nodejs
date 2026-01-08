import type { CookieOptions, Response } from "express"
import { fifteenMinuteFromNow, thirtyDaysFromNow } from "./date.js";


const secure = process.env.NODE_EN !== "development";


const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure: true
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinuteFromNow()
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: "/auth/refresh"
})

type Params = {
    res: Response
    accessToken: string
    refreshToken: string
}

export const SetAuthCookies = ({ res, accessToken, refreshToken }: Params) => res.cookie("accessToken", accessToken, getAccessTokenCookieOptions()).cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());