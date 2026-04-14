const express = require('express');
const router=express.Router();

const dbPromise=require('../db');


router.get('/',async(req,res)=>{
    try{
        const db=await dbPromise;
        const allNotes=await db.prepare('SELECT * FROM notes').all;
        res.json(allNotes);
    }
    catch(error){
        console.error(`Error fetching notes: ${error.message}`);
        res.status(500).json({error:'Failed to fetch notes'});
    }
})

router.post('/',async(req,res)=>{
    const {title,content}=req.body;
    if (!title || !content){
        return res.status(400).json({error:'Title or content cannot be empty'});
    }
    try{
        const db=await dbPromise;
        await db.prepare(`INSERT INTO notes (title,content) VALUES (?,?)`).run(title,content);
        res.status(200).json({message:'Note created successfully'});
    }   catch(error){
        console.error(`Error creating note: ${error.message}`);
        res.status(500).json({error:'Failed to create note'});
    }
})

router.put('/:id',async (req,res)=>{
    const {id}=req.params;
    const {title,content}=req.body;

    if (!title || !content){
        return res.status(400).json({error:'Title or content cannot be empty'});
    }
    try{
        const db=await dbPromise;
        const note=await db.prepare(`SELECT * FROM notes WHERE id=?`).get([id]);
        if (!note){
            return res.status(404).json({error:'Note not found'});
        }
        await db.prepare(`UPDATE notes SET title=?,content=? WHERE id=?`).run([title,content,id]);
        res.status(200).json({message:'Note updated Successfully'});
    }
    catch(error){
        console.error(`Error updating note: ${error.message}`);
        res.status(500).json({error:'Failed to update note'});
    }
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const db=await dbPromise;
        const note =await db.prepare(`SELECT * FROM notes WHERE id=?`).get([id]);
        if(!note){
            return res.status(404).json({message:'Note not found'});
        }
        await db.prepare('DELETE FROM notes WHERE id=?').run([id]);
        res.status(200).json({message:'Note deleted successfully'});
    }catch(error){
        console.error(`Error deleting note: ${error.message}`);
        res.status(500).json({error:'Failed to delete note'});
    }
})

module.exports=router;