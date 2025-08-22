import mongoose from "mongoose";

const expSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        expense: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            enum: ["groceries", "leisure", "electronics", "utilities", "clothing", "health", "other"],
            required: true
        }
    },
    { timestamps: true }
)

const Exp = mongoose.model("Exp", expSchema);

export default Exp;