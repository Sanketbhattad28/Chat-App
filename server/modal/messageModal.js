const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        message: {
            text: {
                type : String,
                required : true
            }
        },
        users : Array,
        sender : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Users',
            required: true,
        }
    },
    {
        timestamp : true
    }
)

module.exports = mongoose.model("Message", messageSchema)