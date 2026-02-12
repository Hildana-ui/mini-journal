import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function NotesList() {
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
        };

        fetchNotes();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <h2>Your Notes</h2>
            {notes.map(note => (
                <div key={note.id}>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>  
    );
}


export default NotesList;