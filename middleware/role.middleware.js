const role = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.customer.role)){
            return res.status(403).json({message: "Access Denied, Account has no permission"});
        }
        next()
    }
}

module.exports = role