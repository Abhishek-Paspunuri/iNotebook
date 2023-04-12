import React ,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const {deleteNotes}=useContext(NoteContext);
    const { note , updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(note._id); props.showAlert("Deleted your notes Successfully","success")}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
