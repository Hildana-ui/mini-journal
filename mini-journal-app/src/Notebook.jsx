import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import NotesList from "./NotesList";

function Notebook() {
    const [text, setText] = useState("");
    const [page, setPage] = useState("list");
    const [editingNote, setEditingNote] = useState(null);

    const editNote = (note) => {
        setEditingNote(note);
        setPage("editor");
    }

    const saveNote = async () => {
        if (editingNote) {
            await updateDoc(doc(db, "notes", editingNote.id), {
                content: editingNote.content,
            });
            alert("edited");
            setEditingNote(null);
            setPage("list");
        } else {
            await addDoc(collection(db, "notes"), {
                content: text,
                createdAt: new Date(),
                userId: auth.currentUser.uid
            });
            alert("Saved!");

            setText("");
            setPage("list");
        }
    };

    if (page === "list") {
        return (<NotesList editNote={editNote} goToEditor={() => {
            setEditingNote(null);
            setText("");
            setPage("editor");
        }} />);
    }

    return (
        <div>
            <div id="nav">
                <h1>Notebook</h1>
                <button id="back" onClick={() => setPage("list")}>Back</button>
            </div>
            <textarea value={editingNote ? editingNote.content : text}
             onChange={(e) => editingNote ? setEditingNote({ ...editingNote, content: e.target.value })
                : setText(e.target.value)} /> <br />
            <button onClick={saveNote}>{editingNote ? "Update" : "Save"}</button> 
        </div>
    );
}

export default Notebook;