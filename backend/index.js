const express = require("express");
const mainRouter = require("./routes");
const cors = require("cors")

const PORT = "3000";

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/v1",mainRouter)

app.listen(PORT, function(req,res) {
    console.log("Listening on PORT: ",PORT);
    
})








