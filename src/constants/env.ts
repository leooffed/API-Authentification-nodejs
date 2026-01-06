const getenv = (key: string, defaultValue: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set and no default value provided.`);
    }

    return value;
}

export const MONGO_URI = getenv("MONGODB_URI", "mongodb://localhost:27017/auth_db");
export const PORT = parseInt(getenv("PORT", "4045"), 10);
export const JWT_SECRET = getenv("JWT_SECRET", "your_jwt_secret_key");
export const JWT_REFRESH_SECRET = getenv("JWT_REFRESH_SECRET", "your_jwt_refresh_secret_key");
export const APP_ORIGIN = getenv("APP_ORIGIN", "http://localhost:3000");
export const EMAIL_SENDER = getenv("EMAIL_SENDER", "<EMAIL>");
export const RESEND_API_KEY = getenv("RESEND_API_KEY", "<RESEND_API_KEY>");