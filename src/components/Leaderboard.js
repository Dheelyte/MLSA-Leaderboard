import { useEffect, useState } from 'react';
import userAvatar from '../images/userAvatar.svg'
import axios from 'axios';


const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading ] = useState(true)

    const BASE_URL = 'https://mlsa-leaderboard-api.azurewebsites.net/'

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(BASE_URL + 'api/v1/leaderboard/');
                setLoading(false)
                setLeaderboard(response.data);
              } catch (error) {
                setLoading(false);
              }
        }
        fetchLeaderboard();
    }, [])
    return (
        
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <div className="leader-container">
                { loading && <div className="custom-loader"></div> }

                {
                    leaderboard.map(leader => (
                        <div key={leader.rank} className="leader">
                            <div className="leader-number">#{leader.rank}</div>
                            <div className="leader-avatar">
                                <img src={userAvatar} alt='' />
                            </div>
                            <div className='leader-name'>
                                {leader.member}
                            </div>
                            <div className='leader-points'>
                                {leader.score} points
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
}

export default Leaderboard;