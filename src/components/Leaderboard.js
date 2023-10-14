import userAvatar from '../images/userAvatar.svg'


const Leaderboard = () => {
    return (
        
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <div className="leader-container">
                <div className="leader">
                    <div className="leader-number">#1</div>
                    <div className="leader-avatar">
                        <img src={userAvatar} alt='' />
                    </div>
                    <div className='leader-name'>
                        Username
                    </div>
                </div>
                <div className="leader">
                    <div className="leader-number">#2</div>
                    <div className="leader-avatar">
                        <img src={userAvatar} alt='' />
                    </div>
                    <div className='leader-name'>
                        Another Username
                    </div>
                </div>
                <div className="leader">
                    <div className="leader-number">#3</div>
                    <div className="leader-avatar">
                        <img src={userAvatar} alt='' />
                    </div>
                    <div className='leader-name'>
                        Even Username
                    </div>
                </div>
                <div className="leader">
                    <div className="leader-number">#4</div>
                    <div className="leader-avatar">
                        <img src={userAvatar} alt='' />
                    </div>
                    <div className='leader-name'>
                        More Username
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Leaderboard;