const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        email: {type:String, unique:true},
        firstname : String,
        lastname : String,
        password : String,
        cart: [Number]
    },
    {
        collection:"tikkoCol"
    }

);
mongoose.model("tikkoCol",userSchema);