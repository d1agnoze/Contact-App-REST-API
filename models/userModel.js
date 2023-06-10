const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"pls add username"]
    },
    email:{
        type: String,
        required:[true,"pls add email"],
        unique:[true,"email existed"]
    },
    password:{
        type:String,
        required:[true,"pls enter your password"]
    }
},{
    timestamps:true
})
module.exports = mongoose.model("User",userSchema)
