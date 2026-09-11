const express = require("express");
const protect = require("../middleware/auth.middlewware.js");
const role = require("../middleware/role.middleware.js");
const {createCustomerAccount, nameEnquiryController} = require("../controllers/account.controllers.js");
const {onboardFintechController,
     loginNibssController,
      insertKycIDController,
      validateKycID,
      transferController
    } = require("../controllers/nibss.controller.js");
const loginNibss = require("../services/nibss.service.js")
const nibssRoute = express.Router()
nibssRoute.post("/onboard", protect, role("admin"),  onboardFintechController)
nibssRoute.get("/login", protect, role("admin", "user"), loginNibssController)
nibssRoute.get("/insert-kyc", protect, role("admin", "user"), insertKycIDController)
nibssRoute.post("/validate-kyc", protect, role("admin", "user"), validateKycID)
nibssRoute.post("/create-account", protect, role("admin", "user"), createCustomerAccount)
nibssRoute.get("/name-enquiry/:accountNumber", protect, role("admin", "user"), nameEnquiryController)
nibssRoute.post("/transfer", protect, role("admin", "user"), transferController)



module.exports = nibssRoute;






// "name": "kaybank",
    // "email": "esthy7@gmail.com"