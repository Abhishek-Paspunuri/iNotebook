import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = (props) => {
  const { notes, getNotes , editNotes} = useContext(NoteContext);
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
  const navigate= useNavigate();

  useEffect(() => {
    let ele=localStorage.getItem('token');
    console.log(ele);
    if(ele===true){
      getNotes();
      console.log('hi');
    }
    else{
      navigate("/login");
    }
  }, [])

  const handleClick = (e) => {
    refUpdate.current.click();
    editNotes(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Updated your notes Successfully","success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description });
  }

  const ref = useRef(null);
  const refUpdate = useRef(null);

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">iNotebook</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label" >Description</label>
                  <textarea className="form-control" id="edescription" name='edescription' value={note.edescription} minLength={5} required onChange={onChange} rows="5"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refUpdate} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes..!!!</h2>
        <div className="container mx-2">
          {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;
