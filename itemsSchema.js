const mongoose = require("mongoose");
const itemsSchema = new mongoose.Schema(
    {
        title : String,
        img : String
    },
    {
        collection:"tikkoitem"
    }

);
mongoose.model("tikkoitem",itemsSchema);