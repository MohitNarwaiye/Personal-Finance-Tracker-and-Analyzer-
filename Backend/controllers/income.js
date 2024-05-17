const IncomeSchema = require("../models/IncomeModel");

exports.addIncome=async(req,res) =>{
    const {title, amount,category,description,date} =req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        //validations
        if(!title || ! category || !description || !date){
            return res.status(400).json({message: 'all fields are required'})
        }
        if(amount<=0 || !amount== Number ){
            return res.status(400).json({message: 'amount must be a positive number'})
        }
        await income.save()
        res.status(200).json({message: 'Income added'})

    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
    console.log(income)
}

exports.getIncomes=async(req,res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json({incomes})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error);
    }
}
exports.deleteIncome=async(req,res) =>{
    const {id}=req.params;
    // console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error'})
            console.log(err);
        })
}