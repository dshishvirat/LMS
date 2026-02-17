import mongoose from "mongoose";

const lecturSchema =new mongoose.Schema({
    lectureTitle:{
        type:String,
        required:true
    },

    videoUrl:{type:String},
    publicId:{type:String},
    isPreviewFree:{type:Boolean}
},{timestamps:true})

export const Lecture=mongoose.model("Lecture",lecturSchema)




