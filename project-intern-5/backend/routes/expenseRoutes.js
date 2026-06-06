const express = require("express");

const router = express.Router();

const Expense =
require("../models/Expense");

/* CREATE */

router.post("/", async(req,res)=>{

    try{

        const newExpense =
        new Expense(req.body);

        await newExpense.save();

        res.status(201).json({

            message:"Expense Added",

            data:newExpense

        });

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });
    }
});

/* READ */

router.get("/", async(req,res)=>{

    try{

        const expenses =
        await Expense.find();

        res.status(200).json(expenses);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });
    }
});

/* UPDATE */

router.put("/:id", async(req,res)=>{

    try{

        const updatedExpense =
        await Expense.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.status(200).json({

            message:"Updated",

            data:updatedExpense

        });

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });
    }
});

/* DELETE */

router.delete("/:id", async(req,res)=>{

    try{

        await Expense.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:"Deleted"
        });

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });
    }
});

module.exports = router;