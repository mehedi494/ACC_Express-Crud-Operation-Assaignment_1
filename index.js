const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const router = require ("./Routes/v1/user.routes")

app.use(cors());
app.use(express.json());



app.use("/user", router)
// app.use("/user/all", router)


app.get("/", (req, res) => {
    res.send("Hello World!!")
})



app.all("*", (req, res) => {
    res.status(404).json("Route not found")
})


app.listen(PORT, () => {
    console.log("server running at port ", PORT);
})
