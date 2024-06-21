import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = ({ onShowLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage('Password reset link sent to your email.');
        } catch (error) {
            setMessage('Failed to send password reset link.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
                <div className="mt-4">
                    <p className="text-center">
                        Remembered your password? <a href="#" className="text-blue-500" onClick={onShowLogin}>Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
