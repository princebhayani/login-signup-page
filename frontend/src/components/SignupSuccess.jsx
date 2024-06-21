import React from 'react';

const SignupSuccess = ({ onShowLogin, onLogout }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <h1 className="text-4xl text-blue-500 mb-4">User Signed Up Successfully</h1>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={onShowLogin}
                >
                    Go to Sign In
                </button>
                <br />
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={onLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default SignupSuccess;
