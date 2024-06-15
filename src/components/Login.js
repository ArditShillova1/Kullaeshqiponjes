import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseCfg';

function Login({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Authenticate using Firebase Auth
            await signInWithEmailAndPassword(auth, 'shillovaardit301@gmail.com', password); // Replace with your test email or use a generic email
            onLogin(true); // On successful login, set onLogin to true
        } catch (error) {
            setError('Incorrect password. Please try again.'); // Handle login errors
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
