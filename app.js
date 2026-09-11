const express = require("express");
const dotenv = require("dotenv");
const nibssRoute = require("./routes/nibss.routes.js");
const customerRoute = require("./routes/customer.routes.js");
const db = require("./config/config.js");
dotenv.config()
const port = process.env.PORT ?? 3000
const app = express()
app.use(express.json())
app.use("/api/nibss", nibssRoute)
app.use("/api/customer", customerRoute)
db()

app.listen(port, () => {
    console.log(`This port is running on port ${port}`)
})