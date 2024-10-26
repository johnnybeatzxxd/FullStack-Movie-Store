import { useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Signin } from './pages/signin'
import { Signup } from './pages/singup'
import { Home } from './pages/home'
import { is_authorized } from './utils/authentication'

const UserContext = createContext(null);

function ProtectedRoute({ element, ...rest }) {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const userData = await is_authorized();
        setUser(userData);
        setIsAuthenticated(userData ? true : false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/signin" />;
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute element={<Home />} />} path='/'/>
          <Route element={<Signin />} path='/signin'/>
          <Route element={<Signup />} path='/signup'/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
export { UserContext }
