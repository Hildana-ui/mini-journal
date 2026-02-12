import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function NotesList({ goToEditor, editNote }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const q = query(
                collection(db, "notes"),
                where("userId", "==", auth.currentUser.uid)
            );

            const querySnapshot = await getDocs(q);

            const notesArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setNotes(notesArray);


            if (notesArray.length === 0) {
                goToEditor();
            }
        };

        fetchNotes();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <div id="nav">
                <h1>Your Notes</h1>
                <div id="buttons">
                <button onClick={goToEditor}>New Note</button>
                <button onClick={logout}>Logout</button>
                </div>
            </div>
            <table>
                <tbody>
                    {notes.map(note => (
                    <tr id="notes" key={note.id}>
                        <td>{note.content}</td>
                        <td>
                        <button id="edit-btn" onClick={() => editNote(note)}>Edit</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );
}


export default NotesList;