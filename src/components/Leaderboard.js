import { useEffect, useState } from 'react';
import userAvatar from '../images/userAvatar.svg'
import axios from 'axios';


const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading ] = useState(true)

    const BASE_URL = 'https://leaderboard.acel.dev/'

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

                {!loading && leaderboard.length === 0 && <div style={{ textAlign: 'center', margin: '10px' }}>
                    <img style={{width: '100px'}} alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9UlEQVR4nO2XvUpcURhFT2+wSII+jqNFioCFP+9hFUIqFR8oIbaC4sFONG8RmyTG2KlZIeQIIgTucPjmu3vYC6Y73FmsmbvvTCnGGGOMMcaYfJgTHFA9YBEl3Z9sAXV//iMAnAG1jJwxB6zAaRk5ow2oQro/2QLq/ngDwwJWb2BHQBXS/ckWUPfHGxgWsHoDOwKqkO5PtoC6P97AsIDVG9gRUIV0f7IF1P3xBoYFrN7AjoAqpPuTLaDujzcwLGD1BnYEVCHdn2wBdX+8gWEBqzewI6AK6f5kC6j74w0MC1i9gR0BVUj3J1tA3R9vYFjA6g3sCKhCuj/ZAur+eAPDAlZvYEdAFdL9yRZQ98cbGBawegM7AqqQ7k+2gII/sAQcAJfALbqczDwgsA3cMB8czzRgi/e7vcdHYAVYKCMHWAfuh3iHBWy37eM3710RAXgF/BjqHRnw4PETLEIAe9N4Rwb80q69UoTg34NusHdkwF/t2i+KEEzpHRnwVjTgzVBvYLGd/Rl5C0+K5i08GXB2rZ29iHyIfCpCAPtDvYHDdnY3QmQZuG5v8L6IALwe4g18aGe+AS+jZLae/CD9DKwqbCKwATw8926vtSffvDvgbbTMJvCd+eMr8CY03rN/JXvAOdpcAUfAzt8n8EziGWOMMcYYU0z5A3J56ZagRZh6AAAAAElFTkSuQmCC" />
                    <p>There is no one on the leaderboard. Be the first to rank on the leaderboard</p>
                </div>}
                
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
