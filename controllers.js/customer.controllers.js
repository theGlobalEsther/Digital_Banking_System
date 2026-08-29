const express = require("express");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Customer = require("../model/customer.model");
const Account = require("../model/account.model");

const onBoardCustomer = async(req, res) => {
    try{
        const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const today = new Date()
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            
        }
        const {bvn, nin, email, gender, password} = req.body;
        let verifiedData;
        const hashedPassword = await bcrypt.hash(password, 10);

        // customer must provide either bvn or nin
        if(!bvn && !nin){
            return res.status(400).json({message: "Provide your bvn or nin"})
        }
        // Bvn validation
        if(bvn){
            const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/validateBvn`,
                {
                    bvn: bvn
                }
            );
            // console.log(response.data)
            // Checs if the bvn is successful
            if(!response.data.success){
                return res.status(400).json({
                    success: false,
                    message: response.data.message
                })
            }
            // Get verified info from NIBSS
            verifiedData = response.data.data;
            // console.log(verifiedData);
        }

        // Nin validation
        if(nin){
            const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/validateNin`,
            {
                nin: nin
            }
        );
        // console.log(response.data)
        if(!response.data.success){
            return res.status(400).json({
                success: false,
                message: response.data.message
            })
        }
        verifiedData = response.data.data
        }
        return res.status(200).json({
            success: true,
            message: "BVN/NIN Validation Completed" 
        })
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}



module.exports = onBoardCustomer