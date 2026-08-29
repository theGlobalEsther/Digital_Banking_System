const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT ?? 3000
const app = express()



app.listen(port, () => {
    console.log(`This port is running on port ${port}`)
})
