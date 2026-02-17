
import mongoose from "mongoose";


const connectDB=async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL)
      console.log("MongoDB connect")
    }
    catch(error){
     console.log("Error occured",error)
    }
}

export default connectDB