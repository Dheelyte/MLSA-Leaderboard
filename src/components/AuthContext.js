import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  console.log('From user auth context')

  useEffect(() => {
    // Check local storage or cookies for a persisted user session
    const persistedUser = localStorage.getItem('leaderboard_user');
    console.log('local storage from user auth context', persistedUser)
    if (persistedUser) {
      setUser(JSON.parse(persistedUser));
    }
    setLoading(false); // Set loading to false when authentication check is done
  }, []);

  const login = (userData) => {
    // Save user data to state
    setUser(userData);
    // Save user data to local storage for persistence
    localStorage.setItem('leaderboard_user', JSON.stringify(userData));
  };

  const logout = () => {
    // Remove user data from 
      try {
        axios.post('user/logout/', {}, {
          headers: {
              'Authorization': `Token ${user.token}`
          }
        })
        setUser(null);
        // Clear user data from local storage
        localStorage.removeItem('realchat_user');
      } catch {

      }
    
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
