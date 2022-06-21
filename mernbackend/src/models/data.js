const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    FullName:{
        type:String,
        require: true

    },
    Username:{
        type:String,
        require: true

    },
    Email:{
        type:String,
        require: true,
        

    },
    PhoneNumber:{
        type:Number,
        require: true,
        

    },
    Password:{
        type:String,
        require: true,
        unique:true

    },
    ConfirmPassword:{
        type:String,
        require: true,
        unique:true
        
    },
    
    gender:{
        type:String,
        require:true,
        
    }

});


const Register = new mongoose.model("Data", userSchema);

module.exports = Register;

