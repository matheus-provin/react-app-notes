import { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import Main from "../Main";
import Sidebar from "../SideBar";
import { AuthGoogleContext } from "../../context/authGoogle";
import { getIdToken } from "firebase/auth";


function Notas() {

    const {user} = useContext(AuthGoogleContext)
    const [notes, setNotes] = useState(
    localStorage.getItem(`${user.uid}_notes`) ? JSON.parse(localStorage.getItem(`${user.uid}_notes`)) : []
    );
    const [activeNote, setActiveNote] = useState(false);

    useEffect(() => {
        localStorage.setItem(`${user.uid}_notes`, JSON.stringify(notes));
      }, [notes, user.uid]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Nota sem título",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default Notas