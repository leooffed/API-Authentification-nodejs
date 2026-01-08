import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt.js";


export interface UserDocument extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
}


const UserSchema = new mongoose.Schema<UserDocument>(
    {
        username: {type: String, unique: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        verified: {type: Boolean, required: true, default: false}
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return;
    }
    this.password = await hashValue(this.password);
});

UserSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password)
}

const UserModel = mongoose.model<UserDocument>("User", UserSchema)

export default UserModel;