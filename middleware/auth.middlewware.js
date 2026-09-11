const jwt = require("jsonwebtoken");
const Customer = require("../model/customer.model")

const protect = async (req, res, next) => {
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.toLowerCase().startsWith("bearer")){
            return res.status(401).json({message: "NO Token Provided"});
        }
        const token = auth.split(" ")[1]
        const decode = await jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {
            if(err){
                return res.status(401).json({message: "Token not found/ invalid Token"});
            }
            req.customer = await Customer.findById(payload.id)
        });
        next()
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = protect