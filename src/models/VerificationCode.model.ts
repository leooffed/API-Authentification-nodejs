import mongoose from "mongoose";
import type VerificationCodeType from "../constants/VerificationCodeType.js";
import { fifteenMinuteFromNow } from "../utils/date.js";


export interface VerificationCodeParams extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    type: VerificationCodeType;
    expiresAt: Date;
    createdAt: Date;
}


const verificationCodeSchema = new mongoose.Schema<VerificationCodeParams>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    type: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    expiresAt: {type: Date, required: true, default: fifteenMinuteFromNow}
});

const VerificationCodeModel = mongoose.model<VerificationCodeParams>(
    "VerificationCode",
    verificationCodeSchema,
    "verification_codes"
);

export default VerificationCodeModel