import { AuthProvider } from './components/AuthContext';
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;
