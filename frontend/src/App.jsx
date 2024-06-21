import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import LoggedIn from './components/LoggedIn';
import SignupSuccess from './components/SignupSuccess';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleSignup = () => {
        setIsSignedUp(true);
        setShowSignup(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsSignedUp(false);
        setShowSignup(false);
        setShowForgotPassword(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <LoggedIn onLogout={handleLogout} />
            ) : isSignedUp ? (
                <SignupSuccess onShowLogin={() => setIsSignedUp(false)} onLogout={handleLogout}/>
            ) : showSignup ? (
                <Signup onSignup={handleSignup} onShowLogin={() => setShowSignup(false)} />
            ) : showForgotPassword ? (
                <ForgotPassword onShowLogin={() => setShowForgotPassword(false)} />
            ) : (
                <Login
                    onLogin={handleLogin}
                    onShowSignup={() => setShowSignup(true)}
                    onShowForgotPassword={() => setShowForgotPassword(true)}
                />
            )}
        </div>
    );
};

export default App;
