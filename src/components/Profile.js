import userAvatar from '../images/userAvatar.svg'
import { useAuth } from './AuthContext';


const Profile = ({ updateKey, toggleSignup, toggleLogin }) => {
    const { user } = useAuth();
    
    return (
        <div className="profile">
            <h2>Your Profile</h2>
            <div className='profile-image-div'>
                <img src={userAvatar} alt='' />
            </div>
            {
                user ? (
                    <div className='profile-info'>
                        <h2 style={{marginBottom: '0'}}>{user.user.username}</h2>
                        <p className='muted' style={{marginTop: '0'}}>{user.user.email}</p>
                        <div className='profile-score'>
                            <div className='rank'>
                                <p>RANK</p>
                                <p>{user.user.rank ? user.user.rank : "🤐"}</p>
                            </div>
                            <span className='rank-score'></span>
                            <div className='points'>
                                <p>POINTS</p>
                                <p>{user.user.total_points}</p>
                            </div>
                        </div>
                        {
                            user.user.rank ? (
                                <p>You are <span className='position-number'>#{user.user.rank}</span> on the leaderboard</p>
                            ) : (
                                <p className='muted'>You are not ranking on the leaderboard yet.
                                    <p>You first need to submit the link to a your pull request of yours.</p>
                                </p>
                            )
                        }
                        
                    </div>
                ) : (
                    <>
                        <p className='muted'>You need to Log in or Sign up to rank on the opensource leaderboard</p>
                        <div className='auth-buttons'>
                            <button onClick={toggleLogin} className='auth-button-login'>Login</button>
                            <button onClick={toggleSignup} className='auth-button-signup'>Sign Up</button>
                        </div>
                    </>
                )
            }
            
        </div>
    )
    
}

export default Profile;