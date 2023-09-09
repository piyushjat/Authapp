const express = require("express");
const app = express();


require("dotenv").config();
const PORT = process.env.PORT || 4000; 


app.use(express.json()); // 

//importing routes 
const user = require("./routes/user");


app.use("/api/v1", user);


app.listen(PORT, () => {
  console.log(`Server successfully started at port ${PORT}`);
});


const dbConnect = require("./config/database");
dbConnect();


app.get("/", (req, res) => {
  res.send(`<h1> Checking for Authentication & Authorization........</h1>`);
});
