const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection

mongoose.connect("mongodb://127.0.0.1:27017/expense_tracker")

.then(() => {
    console.log("MongoDB Connected Successfully");
})

.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});


// Routes

const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/expenses", expenseRoutes);


// Server

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});