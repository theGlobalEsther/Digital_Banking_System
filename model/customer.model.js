const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        enum: ["male", "female", "prefer not to say"],
        required: true,
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: [10, "Phone number is too short"],
        maxlength: [12, "Phone number is too long"],
    },
    age: {
        type: Number,
        required: true,
        min: [18, "age should be atleast 18"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "password should be atleast 8"],
        select: false,
    },
    bvn: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        trim: true,
    },
    nin: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        trim: true,
    },

        timestamps: true,
    },
)
const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer