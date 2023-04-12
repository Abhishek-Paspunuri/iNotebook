import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
const AddNote = (props) => {

    const { addNotes } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added your notes Successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h2>Add a Note</h2>
            <div className="container">
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={5} required aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <textarea className="form-control" id="description" name='description' value={note.description} minLength={5} required onChange={onChange} rows="5"></textarea>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
