const express = require("express");

const router = express.Router();

const Expense = require("../models/Expense");


// CREATE EXPENSE

router.post("/", async (req, res) => {

    try {

        const newExpense = new Expense(req.body);

        await newExpense.save();

        res.status(201).json({
            message: "Expense Added Successfully",
            data: newExpense
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Adding Expense",
            error: error.message
        });
    }

});


// READ ALL EXPENSES

router.get("/", async (req, res) => {

    try {

        const expenses = await Expense.find();

        res.status(200).json(expenses);

    } catch (error) {

        res.status(500).json({
            message: "Error Fetching Expenses",
            error: error.message
        });
    }

});


// UPDATE EXPENSE

router.put("/:id", async (req, res) => {

    try {

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Expense Updated Successfully",
            data: updatedExpense
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Updating Expense",
            error: error.message
        });
    }

});


// DELETE EXPENSE

router.delete("/:id", async (req, res) => {

    try {

        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Expense Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Deleting Expense",
            error: error.message
        });
    }

});

module.exports = router;