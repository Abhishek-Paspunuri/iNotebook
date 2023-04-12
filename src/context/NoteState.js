import React, { useState } from "react";
import NoteContext from "./notes/NoteContext";

const NoteState =(props) =>{
    const host="http://localhost:2000";
    const notesinitial=[]
    const [notes,setNotes]=useState(notesinitial);
    
    // Get all notes
    const getNotes= async ()=>{

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json= await response.json();
      setNotes(json);
    }

    // Add a Note
    const addNotes= async (title,description,tag)=>
    {
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const note= await response.json();
      setNotes(notes.concat(note));
      console.log("Adding a note");
    }
    
    // Delete a Note
    const deleteNotes= async (id)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/deltenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      console.log("Deleting a note");
      const newNotes= notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);

    }

    // Update a Note
    const editNotes= async (id,title,description,tag)=>{

      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      // const data= response.json();
      let newnote=JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id)
        {
          newnote[index].title=title;
          newnote[index].description=description;
          newnote[index].tag=tag;
          break;
        }
      }
      setNotes(newnote);
    }

    return(
        <NoteContext.Provider value={{notes,addNotes,deleteNotes,editNotes,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;