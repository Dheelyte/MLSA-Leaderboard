import { useState } from 'react'
import Header from './Header'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Submit from './Submit'
import Footer from './Footer'


const Home = () => {
    const [updateKey, setUpdateKey] = useState(1)
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [signupSuccessMessage, setSignupSuccessMessage] = useState(null);
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)


    const toggleSignup = () => {
        console.log('toggle signup')
        setShowSignup(!showSignup);
    };

    const toggleLogin = () => {
        console.log('toggle login')
        setShowLogin(!showLogin);
    };

    const clearMessage = () => {
        setTimeout(()=> {
            setMessage(null);
            setError(null);
        }, 5000)
    }

    const handleSignupSuccess = () => {
        setShowSignup(false); // Close the Sign Up modal
        setShowLogin(true); // Open the Login modal
        setSignupSuccessMessage("Sign up successful! You can now log in.");
    };

    const handleLoginSuccess = () => {
        setShowLogin(false); // Open the Login modal
        setMessage("You are logged in.");
        clearMessage();
    };

    const handleSubmitSuccess = () => {
        setMessage("Hurray! Your Pull request has been submitted successfully");
        clearMessage();
    }

    const handleError = (error) => {
        setError(error[0]);
        clearMessage();
    }


    return (
        <>
            {
                message && 
                <div className='alert-message'>
                    {message}
                </div>
            }
            {
                error && 
                <div className='alert-message-error'>
                    {error}
                </div>
            }
            <Header />
            <div className='container'>
                <div className='profile-panel'>
                    <Profile updateKey={updateKey} toggleSignup={toggleSignup} toggleLogin={toggleLogin} />
                    <Submit setUpdateKey={setUpdateKey} handleSubmitSuccess={handleSubmitSuccess} handleError={handleError} />
                </div>
                <div className='leaderboard-panel'>
                    <Leaderboard handleError={handleError} />
                </div>
            </div>
            <Footer />
            {showSignup && <Signup toggleSignup={toggleSignup} handleSignupSuccess={handleSignupSuccess} />}
            {showLogin && <Login toggleLogin={toggleLogin} handleLoginSuccess={handleLoginSuccess} signupSuccessMessage={signupSuccessMessage} />}
        </>
    )
    
}

export default Home;