import { Request, Response } from "express";
import { readFileSync } from "fs";
import { unlink } from "fs/promises";
import Note from "../db/notesModel";
import MarkdownIt from "markdown-it";
import main from "../utils/gemini";
const md=MarkdownIt();

const uploadNotes=async(req:Request, res:Response)=>{
    try {
        if(!req.file)
        {
            return res.status(400).json({success:false, message:"File not given"})
        }
        const filePath=req.file.path;
        const content = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        const newNote=new Note({
            name:req.file.filename,
            content
        })
        if(newNote)
        {
            await newNote.save();
            await unlink(filePath);
            return res.status(201).json({ success: true, message: "Note added" });
        }
        return res.status(400).json({success:false, message:`Note not made`})
    } catch (error) {
        return res.status(500).json({success:false, message:"Error uploding note"})
    }
}

const updateNote=async(req:Request, res:Response)=>{
    let {body}=req.body;
    let id=req.params.id;
    try {
        if(!body || !id)
        {
            return res.status(400).json({success:false, message:"Please enter every field"});
        }
        let result=await Note.findByIdAndUpdate(id,{content:body});
        if(result)
        {
            return res.status(200).json({success:true, message:"Note updated"});
        }
    } catch (error) {
        return res.status(500).json({success:false, message:"Error updating note"})
    }
}

const checkGrammar=async(req:Request, res:Response)=>{
    const {content}=req.body;
    try {
        if(!content)
        {
            return res.status(400).json({success:false, message:"Empty field entered"})
        }
        const text=await main(content as string);
        res.status(200).json({success:true, message:text})
    } catch (error) {
        res.status(500).json({success:false, message:"An error occured", error})
    }
}

const render=async(req:Request, res:Response)=>{
    const id=req.params.id;
    try {
        const data=await Note.findById(id);
        const result=md.render(data?.content as string)
        if(result)
        {
            res.status(200).json({success:true, message:"Rendered", data:result})
        }
    } catch (error) {
        res.status(500).json({success:false, message:"Error rendering"})
    }
}

const getNotes=async(req:Request, res:Response)=>{
    const id=req.params.id;
    let data=null;
    try {
        if(!id)
        {
            data= await Note.find();
        }
        else{
            data= await Note.find({_id:id})
        }
        if(data)
        {
            res.status(200).json({success:true, message:"Data got", data})
        }
    } catch (error) {
        res.status(500).json({success:false, message:"Error getting notes", error})
    }
}

const addNote=async(req:Request, res:Response)=>{
    const {name, content}=req.body;
    try {
        if(!name || !content)
        {
            return res.status(400).json({success:false, message:"Please enter every field"})
        }
        const newNote=new Note({
            name:name+"-"+Date.now()+".md",
            content
        })
        if(newNote)
        {
            await newNote.save();
            return res.status(201).json({ success: true, message: "Note added" })
        }
        return res.status(400).json({success:false, message:`Note not made`})
    } catch (error) {
        return res.status(500).json({success:false, message:"Error uploding note"})
    }
}

export {uploadNotes, updateNote, checkGrammar, render, getNotes, addNote}