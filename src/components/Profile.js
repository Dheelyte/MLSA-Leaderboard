import userAvatar from '../images/userAvatar.svg'


const Profile = () => {
    return (
        <div className="profile">
            <h2>Your Profile</h2>
            <div className='profile-image-div'>
                <img src={userAvatar} alt='' />
            </div>
            <h2>Username</h2>
            <p className='position'>You are <span className='position-number'>#1</span> on the leaderboard</p>
        </div>
    )
    
}

export default Profile;