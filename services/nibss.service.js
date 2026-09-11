const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config()
const conn = require("../config/config");
const { response } = require("express");

// Onboarding
exports. onboardingFintech = async (data) => {
    const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/fintech/onboard`, data)
    return response.data
}

// Login
// exports.login = async (data) => {
//     const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/auth/token`,
//             data
//     )
//     return response.data
// }

exports. loginNibss = async () => {
    try{
    const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/auth/token`,
        {
            apiKey: process.env.NIBSS_API_KEY,
            apiSecret: process.env.NIBSS_API_SECRET
        }
    );
    return response.data.token;
    }catch(err){
        console.log("STATUS:", err.response?.status);
        console.log("NIBSS RESPONSE:", err.response?.data)
    }

}

exports.insertBvn = async(data, token) => {
    try{
        const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/insertBvn`,data, 
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }})
                return response.data
    }catch(err){
        console.error(err.message)
    }

}

exports.insertNin = async(data, token) => {
    try{
        const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/insertNin`,data, 
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }})
                return response.data
    }catch(err){
        console.error(err.message)
    }

}

exports.validateBvn = async(data, token) => {
    try{
        const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/validateBvn`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                return response.data
    }catch(err){
        console.error(err.message);
    }
}

exports.validateNin = async(data, token) => {
    try{
        const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/validateNin`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                return response.data
    }catch(err){
        console.error(err.message);
    }
}

exports.createAccount = async(data, token) => {
    try{
        const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/account/create`,
            data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }catch(err){
        console.error(err.message)
    }
}

exports.nameEnquiry = async (accountNumber, token) => {
    try{
        const response = await axios.get(`${process.env.NIBSS_BASE_URL}/api/account/name-enquiry/${accountNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }catch(err){
        console.error(err.message);
    }
}

exports.transfer = async (from, to, amount, token) => {
    try{
        const response = await axios.post(`${process.env.NIBSS_BASE_URL}/api/transfer`,
            {
                from, to, amount
            },
            {
                header: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }catch(err){
        console.error(err.message)
    }
}

// exports.getBalance = async (accountNumber, token) => {
//     try{
//         const response = await axios.get(`${process.env.NIBSS_BASE_URL}/api/account/balance/${accountNumber}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     );
//     return response.data;
//     }catch(err){
//         console.error(err.message);
//     }
// }


// exports.getTransactionStatus = async (transactionId, token) => {
//     try{
//         const response = await axios.get(`${process.env.NIBSS_BASE_URL}/api/transaction/${transactionId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );
//         return response.data
//     }catch(err){
//         console.error(err.message);
//     }
// }