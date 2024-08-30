// Register.tsx
import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [major, setMajor] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await registerUser(email, password, nickname, major);
            setMessage('User registered successfully');
        } catch (error) {
            setMessage('Failed to register user');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                </div>
                <div>
                    <label>Major:</label>
                    <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
