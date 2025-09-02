import mongoose from "mongoose"

const urlSchema=new mongoose.Schema(
    {
        shortCode:{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        longUrl:{
            type:String,
            required:true,
            index:true,
            unique:true
        }
    },
    {timestamps:true}
)

const Url=mongoose.model("Url", urlSchema)

export default Url