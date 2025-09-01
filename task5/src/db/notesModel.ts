import mongoose from "mongoose"

const notesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Note = mongoose.model("Note", notesSchema);

export default Note;