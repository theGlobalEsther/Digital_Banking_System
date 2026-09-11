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
        type: String,
        enum: ["male", "female", "prefer not to say"],
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Phone number is too short"],
        maxlength: [12, "Phone number is too long"],
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "password should be atleast 8"],
        select: false,
    },
    kycID: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        trim: true,
        minlength: [11, "kycID should be 11 digits"],
        maxlength: [11, "kycID should not be more than 11 digits"], 
    },
    kycType: {
        type: String,
        required: true,
        enum: ["bvn", "nin"],
    },
    kycIDVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "blocked", "closed"],
        default: "active",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user",
    },
}, 
{
    timestamps: true,
  },
)
const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer;