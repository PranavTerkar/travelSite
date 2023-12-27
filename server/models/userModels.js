const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    username:{
        type: String , 
        require: [true, "Please add the username"]
    }, 
    password: {
        type: String, 
        require: [true, "Please add the User password"]
    }, 
    email: {
        type: String, 
        require:[true, "Please add the email"], 
        unique: [true, "Email already exists"]
    } , 
}, {
    timestamps : true

})

module.exports = mongoose.model("User", userModel) ; 