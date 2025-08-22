import { Request, Response } from "express";
import Exp from "../db/expModel";

const getExps = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { start, end, category } = req.query;
    try {
        const filter: any = { userId };
        console.log(filter)
        if (start && end) {
            filter.createdAt = {
                $gte: new Date(start as string),
                $lte: new Date(end as string),
            };
        }
        const validCategories = [
            "groceries",
            "leisure",
            "electronics",
            "utilities",
            "clothing",
            "health",
            "other",
        ];
        if (category && validCategories.includes(category as string)) {
            filter.category = category;
        }
        console.log(filter)
        const data = await Exp.find(filter).sort({ createdAt: -1 });
        console.log(data)
        res.status(200).json({ success: true, message: "Got expenses", data })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching expenses", error })
    }
}

const addExp = async (req: Request, res: Response) => {
    const { title, expense, category } = req.body;
    const userId = req.user?.id;
    try {
        if (!title || !expense || !category) {
            return res.status(400).json({ success: false, message: "Please fill every field" })
        }
        const newExp = new Exp({
            title,
            expense,
            category,
            userId
        })
        if (newExp) {
            await newExp.save();
            res.status(201).json({ success: true, message: "Expense added" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding expense " + error });
    }
}

const delExp = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const exp = await Exp.findByIdAndDelete(id);
        if (exp) {
            res.status(200).json({ success: true, message: "Expense deleted" });
        }
        else {
            res.status(400).json({ success: false, message: "Expense not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting expense", error })
    }
}

const updateExp = async (req: Request, res: Response) => {
    const { id, title, expense, category } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Expense ID is required" });
        }
        const updateFields: any = {};
        if (title) updateFields.title = title;
        if (expense) updateFields.expense = expense;
        if (category) updateFields.category = category;
        const updatedExp = await Exp.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );
        if (!updatedExp) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.status(200).json({ success: true, message: "Expense updated", data: updatedExp });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating expense", error });
    }
}

export { getExps, addExp, delExp, updateExp }