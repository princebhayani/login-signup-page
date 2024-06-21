import React from 'react';

const LoggedIn = ({ onLogout }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="text-center">
                <h1 className="text-white text-4xl mb-4">Logged In</h1>
                <button 
                    className="bg-white text-blue-500 px-4 py-2 rounded"
                    onClick={onLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default LoggedIn;
