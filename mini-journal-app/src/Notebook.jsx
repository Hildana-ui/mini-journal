import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "./firebase";
import NotesList from "./NotesList";

function Notebook() {
    const [text, setText] = useState("");
    const [viewNotes, setViewNotes] = useState(false);


    const saveNote = async () => {
        await addDoc(collection(db, "notes"), {
            content: text,
            createdAt: new Date(),
            userId: auth.currentUser.uid
        });
        alert("Saved!");
        setViewNotes(true);
    };

    return (
        <div>
            {viewNotes ? (
                <NotesList />
            ) : (
               <>
                <h1>Notebook</h1>
                <textarea onChange={(e) => setText(e.target.value)} /> <br />
                <button onClick={saveNote}>Save</button>
               </>
            )}
        </div>
    );
}

export default Notebook;