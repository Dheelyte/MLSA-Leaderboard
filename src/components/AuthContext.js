import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const BASE_URL = 'https://leaderboard.acel.dev/'

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  console.log('From user auth context')

  useEffect(() => {
    const isAccessTokenExpired = () => {
      const accessToken = JSON.parse(localStorage.getItem('mlsa_leaderboard_user')).access;
      const accessTokenExpiration = decodeAccessToken(accessToken).exp; // Extract expiration timestamp
      return Date.now() >= accessTokenExpiration * 1000; // Check if it's expired
    };

    const requestNewAccessToken = async () => {
      console.log('Requesting new access token')
      const refreshToken = JSON.parse(localStorage.getItem('mlsa_leaderboard_user')).refresh;
      try {
      const response = await axios.post(BASE_URL + '/api/v1/users/token/refresh/', {
        refresh: refreshToken
      })
      const storedUser = JSON.parse(localStorage.getItem('mlsa_leaderboard_user'));
      storedUser.access = response.data.access;
      localStorage.setItem('mlsa_leaderboard_user', JSON.stringify(storedUser));
    } catch {
      console.log('An error occurred...')
    }
    }
  
    const decodeAccessToken = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
      } catch (error) {
        return {};
      }
    };

    // Check local storage or cookies for a persisted user session
    const persistedUser = localStorage.getItem('mlsa_leaderboard_user');
    console.log('local storage from user auth context', persistedUser)
    if (persistedUser) {
      if (isAccessTokenExpired()) {
        requestNewAccessToken();
        console.log('requesting...')
      } else {
        setUser(JSON.parse(persistedUser))
        console.log('user is set')
        setLoading(false);
      }
      console.log('User exists')
    }
    setLoading(false); // Set loading to false when authentication check is done
    console.log('Checks done')
  }, []);

  const login = (userData) => {
    // Save user data to state
    setUser(userData);
    // Save user data to local storage for persistence
    localStorage.setItem('mlsa_leaderboard_user', JSON.stringify(userData));
  };

  const logout = () => {

        setUser(null);
        // Clear user data from local storage
        localStorage.removeItem('mlsa_leaderboard_user');
    
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && (
        // Render the children only when authentication check is complete
        children
      )}
    </AuthContext.Provider>
  );
}
