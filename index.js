const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const path=require("path");
const cors=require("cors");
app.use(bodyParser.json()); 

require("dotenv").config();
const PORT = process.env.PORT || 4000; 
app.use(express.json()); // 

//importing routes 
const user = require("./routes/user");


app.use("/api/v1", user);


app.use(express.static('public'));

app.get('/', (req, res) => {
  // Send the HTML file as a response
  res.sendFile(path.join(__dirname,"public", 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server successfully started at port ${PORT}`);
});

const dbConnect = require("./config/database");
dbConnect();






