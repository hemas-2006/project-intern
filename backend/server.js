const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

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

/* DATABASE */

mongoose.connect(
process.env.MONGO_URL
)
.then(() => {

    console.log(
    "MongoDB Connected"
    );

})
.catch((err) => {

    console.log(err);

});

/* SERVER */

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
    `Server running on ${PORT}`
    );

});