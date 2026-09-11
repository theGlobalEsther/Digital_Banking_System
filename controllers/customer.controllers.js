const express = require("express");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Customer = require("../model/customer.model.js");
const Account = require("../model/account.model.js");



// Register customer
exports.register = async (req, res) => {
    try{
        const {firstName, lastName, gender, email, phone, dob, password, kycID, kycType} = req.body;
        if(!firstName || !lastName || !gender || !email || !phone || !dob || !password || !kycID || !kycType){
            return res.status(400).json({message: "Please, Provide all fields"});
        }

        // check if customer already exist
        const customerExist = await Customer.findOne({email});
        if(customerExist){
            throw new Error("Customer with this email already exist");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create customer
        const customer = await Customer.create({
            firstName, 
            lastName, 
            gender, 
            email,
            phone, 
            dob, 
            password: hashedPassword,
            kycID,
            kycType
        });
        const customerObj = customer.toObject()
        delete customerObj.password
        return res.status(201).json({
            success: true,
            message: `${email} registered successfully`,
            customer
        })
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Customer Login
exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "please, enter your email and password"});
        }

        const customer = await Customer.findOne({email}).select("+password")
        if(!customer){
            return res.status(404).json({message: `${email} not found`});
        }
        const isMatch = await bcrypt.compare(password, customer.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid password"});
        }

        const token = await jwt.sign({id: customer._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESIN});

        const customerObj = customer.toObject()
        delete customerObj.password;
        return res.status(200).json({
            success: true,
            message: `${email} login successful`,
            customerObj,
            token
        })
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


