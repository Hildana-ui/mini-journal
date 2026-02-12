import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User created!");
    };

    const login = async () => {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in!");
    };

    return (
        <div>
            <h2>Auth</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signup}>Signup</button>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Auth;