import { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import Main from "../Main";
import Sidebar from "../SideBar";
import axios from 'axios'

function Notas() {

    const user = 'eu'
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);

    useEffect(() => {
      async function fetchNotes() {
        try {
          const response = await axios.get('http://localhost:5151/api/Nota/api/notas', {
            headers: {
              Authorization: `Bearer ${user}`
            }
          });
          setNotes(response.data);
       
        } catch (error) { 
          console.error(error);
        }
      }
      fetchNotes();
    }, [user]);
    

    
    async function addNoteToDB(newNote) {
      const response = await axios.post("http://localhost:5151/api/Nota/api/notas", newNote, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      return response.data;
      
    };
    
    const onAddNote = () => {
      const newNote = {
        id: uuid(),
        title: "Nota sem título",
        body: "Nota sem descrição",
        lastModified: new Date().toISOString()
      };
    
      addNoteToDB(newNote).then((data) => {
        setNotes([data, ...notes]);
        setActiveNote(data.id);
      });
    };

    const onDeleteNote = async (noteId) => {
      try {
        await axios.delete(`http://localhost:5151/api/Nota/api/notas/${noteId}`, {
          headers: {
            Authorization: `Bearer ${user}`
          }
        });
        setNotes(notes.filter(({ id }) => id !== noteId));
      } catch (error) {
        console.log(error);
      }
    };

    const onUpdateNote = async (updatedNote) => {
      const updatedNotesArr = notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
    
        return note;
      });
    
      setNotes(updatedNotesArr);
    
      try {
        console.log(updatedNote)
        await axios.put(`http://localhost:5151/api/Nota/api/notas/${updatedNote.id}`, updatedNote, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`
          }
        });
      } catch (error) {
        console.error(error);
      }
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