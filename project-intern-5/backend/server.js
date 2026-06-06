const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const expenseRoutes =
require("./routes/expenseRoutes");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use(
    "/api/expenses",
    expenseRoutes
);

/* DATABASE */

mongoose.connect(
    process.env.MONGO_URI
)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log(error);

});

/* SERVER */

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(
        `Server Running ${PORT}`
    );
});