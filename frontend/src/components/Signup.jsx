import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignup, onShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 100);
        return { num1, num2, sum: num1 + num2 };
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (parseInt(captchaInput) !== captcha.sum) {
            alert('Captcha incorrect');
            setCaptcha(generateCaptcha());
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            onSignup();
        } catch (error) {
            alert('Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Captcha: {captcha.num1} + {captcha.num2}</label>
                        <input
                            type="text"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4">
                    <p className="text-center">
                        Already have an account? <a href="#" className="text-blue-500" onClick={onShowLogin}>Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
