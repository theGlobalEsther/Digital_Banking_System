const Customer = require("../model/customer.model")
const Account = require("../model/account.model")
const {createAccount, 
    loginNibss, 
    nameEnquiry, 
    getNibssAccounts, 
    transfer,
    getBalance,
    getTransactionStatus
} = require("../services/nibss.service")


exports.createCustomerAccount = async (req, res) => {
    try{
        const {kycID} = req.body;
        // const hasAccount = await Account.findOne({customer: req.customer._id});
        // if(hasAccount) {
        //     return res.status(409).json({message: "Account already exist"});
        // }
        const customer = await Customer.findOne({kycID, kycIDVerified: req.customer.kycIDVerified});
        if(!customer){
            return res.status(404).json({message: "Customer not found or not verified"})
        }
        const {kycType, dob} = customer
        const token = await loginNibss()
        const result = await createAccount({kycID, kycType, dob}, token)
        const {account} = result;
        const{balance, fintechId, accountNumber, accountName, bankCode}  = account;
        const createAcct = await Account.create({
            customer: req.customer._id,
            accountNumber,
            bankCode,
            accountName,
            balance,
            fintechId
        })
        return res.status(201).json({
            success: true,
            message: "Bank account created successfully",
            createAcct 
        })
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

exports.nameEnquiryController = async (req, res) => {
    try{
        const {accountNumber} = req.params;
        const token = await loginNibss();
        const data = await nameEnquiry(accountNumber, token);
        if(data) {
    const {accountName, accountNumber} = data;
    return res.status(200).json({
        success: true,
        accountName, accountNumber
    })
}
    }catch(err){
        console.error(err.message);
    }
}

exports.transferController = async (req, res) => {
    try{
        const {from, to, amount} = req.body;
        const token = await loginNibss();
        const result = await transfer({
            from, to, amount
        });
        return res.status(200).json({
            success: true,
            message: "Transfer successful",
            result
        })
    }catch(err){
        console.error(err.message)
    }
}

// const getBalanceController = async (req, res) => {
//     try{
//         const {accountNumber} = req.params;
//         const token = await loginNibss();
//         const result = await getBalance({
//             accountNumber, token
//         })
//         return res.status(200).json({
//             success: true,
//             result
//         })
//     }catch(err){
//         console.error(err.message);
//     }
// }

// const getTransactionStatusController = async (req, res) => {
//     try{
//         const {transactionId} = req.body
//         const result = await getTransactionStatusController({transactionId, token})

//         return res.status(200).json({
//             success: true,
//             result
//         })
//     }catch(err){
//         console.error(err.message);
//     }
// }