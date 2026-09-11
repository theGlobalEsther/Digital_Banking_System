const {onboardingFintech, 
    loginNibss,
     insertBvn, 
     insertNin, 
     validateBvn, 
     validateNin} = require("../services/nibss.service.js");
const Customer = require("../model/customer.model.js");
exports. onboardFintechController = async(req, res) => {
    try{
        const {name, email} = req.body
        const result = await onboardingFintech({name, email})
        return res.status(201).json({
            success: true,
            message: "Created successfully",
            result
        })
    }catch(err){
        console.error(err.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

exports. loginNibssController = async (req, res) => {
    try{
        const token = await loginNibss();
        return res.status(200).json({token})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}


exports. insertKycIDController = async(req, res) => {
    try{
        const customer = await Customer.findOne({_id: req.customer._id})
        const {firstName, lastName, dob, phone, kycID, kycType} = customer;
                const token = await loginNibss();

        
        if(kycType === "bvn"){
            const bvn = kycID
            const result = await insertBvn({firstName, lastName, dob, phone, bvn}, token)
            return res.status(200).json({
                result
            })
        }

                if(kycType === "nin"){
            const nin = kycID
            const result = await insertNin({firstName, lastName, dob, nin}, token)
            return res.status(200).json({
                result
            })
        }

    }catch(err){
        console.error(err.message);
    }
}
exports.validateKycID = async(req, res) => {
    try{
        const {kycID} = req.body;
        const customer = await Customer.findById(req.customer._id);
        const token = await loginNibss();
        const {kycType} = customer
        
        if(kycType === "bvn"){
            const bvn = kycID
            const result = await validateBvn({bvn}, token);

            if(result){
                customer.kycIDVerified = true;
                await customer.save()
                return res.status(200).json({
                customer
                })
            }
        }

                if(kycType === "nin"){
            const nin = kycID
            const result = await validateNin({nin}, token);

            if(result){
            customer.kycIDVerified = true;
            await customer.save()
            return res.status(200).json({
            customer
            })
        }    


    }
    }catch(err){
        console.error(err.message)
    }
} 


