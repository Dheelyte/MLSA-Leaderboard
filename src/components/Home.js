import Header from './Header'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Submit from './Submit'


const Home = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <div className='profile-panel'>
                    <Profile />
                    <Submit />
                    <div className='auth-buttons'>
                        <button className='auth-button-login'>Login</button>
                        <button className='auth-button-signup'>Sign Up</button>
                    </div>
                </div>
                <div className='leaderboard-panel'>
                    <Leaderboard />
                </div>
            </div>
            <div className='login'>
                <Login />
            </div>
            <Signup />
        </>
    )
    
}

export default Home;