const express = require("express");


const mongoose = require("mongoose");

const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const expenseRoutes =
require("./routes/expenseRoutes");

const authRoutes =
require("./routes/authRoutes");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use(
"/api/expenses",
expenseRoutes
);

app.use(
"/api/auth",
authRoutes
);
app.get("/", (req, res) => {
  res.send("Project Running Successfully");
});

/* DATABASE */


mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.error("Mongo Error:", err);
});


/* SERVER */

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
    `Server running on ${PORT}`
    );

});