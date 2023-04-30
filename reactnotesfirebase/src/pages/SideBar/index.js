import { useNavigate} from "react-router-dom";
import './sidebar.css'

const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    
    const navigate = useNavigate()

    function signout() {
      navigate('/')
    }

    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1 className="notasTitle">NotasApp</h1>
          <button onClick={signout} className="button-4">Sair</button>
          <button className="button-3" onClick={onAddNote}>Adicionar</button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <button className="button-4" onClick={(e) => onDeleteNote(id)}>Excluir</button>
              </div>
  
              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                Ultima modificação:{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;