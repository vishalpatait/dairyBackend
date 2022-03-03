const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
require("./models/db");

const app = express();
const port = process.env.PORT || 8080;

require("./Auth/Auth");

app.use(bodyParser.json());
app.use(cors());

app.use("/user", require("./routes/User.route"));

app.use("/customer", require("./routes/customer.route"));
app.use("/customerMilk", require("./routes/customerMilk.route"));

app.listen(port, () => {
  console.log("console is listing to" + port);
});
//....................................................................
// "name": "vishal patait",
// "email":"vishalpatait94@gmail.com",
//    "password":"vishal",
//    "mobile":7775000321,
//    "role":"admin"

// "name":"Akash",    
// "email":"Akashpatait94@gmail.com",
//    "password":"Akash",
//    "mobile":6775000321,
//    "role":"user1"