const express= require('express');
const router=express.Router();
var fetchuser= require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route : 1 Fetch all notes of User using GET "/api/notes/getuser" 
router.get('/fetchallnotes', fetchuser , async (req,res)=>{
    try {
        const notes= await Notes.find({user:req.user.id});
        res.json(notes);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }
})


// Route : 2 Add a new note of User using POST "/api/notes/addnote" 
router.post('/addnote', fetchuser , [
        body('title','Enter a valid Title').isLength({ min: 3 }),
        body('description','Enter a valid Description').isLength({ min: 5 })
    ] , async (req,res)=>{

    //Obtain details from request
    const {title,description,tag}=req.body;

    // If there are any errors , return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const notes= new Notes({
            title:title,
            tag:tag,
            description:description,
            user:req.user.id
        })
        const savedNotes = await notes.save();
        res.send(savedNotes);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }
})


// Route : 3 Update existing notes of User using PUT "/api/notes/updatenotes" 
// Here params id is the notes id and user.id is End-user id
router.put('/updatenotes/:id', fetchuser , async (req,res)=>{
    try {
        // Creating a new note object inorder to update
        const {title,description,tag}=req.body;
        const newNote={}
        if(title){
            newNote.title=title;
        }
        if(description){
            newNote.description=description;
        }
        if(tag){
            newNote.tag=tag;
        }

        // Find the note to update and update it
        var note= await Notes.findById(req.params.id);
        // If notes does not exists
        if(!note){
            return res.status(404).send("Page Not Found");
        }
        // If user is not authorised (not the owner) then dont allow
        if(req.user.id !== note.user.toString()){
            return res.status(401).send("Not Allowed");
        }
        // If user is valid then update
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.json(newNote);

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }
})


// Route : 4 Delete existing notes of User using DELETE "/api/notes/deltenotes" 
router.delete('/deltenotes/:id', fetchuser , async (req,res)=>{
    try {
        // Find the note to delete
        var note= await Notes.findById(req.params.id);
        // If notes does not exists
        if(!note){
            return res.status(404).send("Page Not Found");
        }
        // If user is not authorised (not the owner) then dont allow
        if(req.user.id !== note.user.toString()){
            return res.status(401).send("Not Allowed");
        }
        // If user is valid then delete
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted",note});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }
})


module.exports = router;