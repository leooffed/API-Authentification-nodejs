import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env.js"


const connectToDatabase = async () => {
    try {
        // Database connection logic here
        await mongoose.connect(MONGO_URI)
        console.log("Connected to the database successfully")
    } catch (error) {
        console.error("Database connection error:", error)
        process.exit(1)
    }
}

export default connectToDatabase;