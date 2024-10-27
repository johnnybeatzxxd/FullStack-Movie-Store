import { useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Signin } from './pages/signin'
import { Signup } from './pages/singup'
import { Home } from './pages/home'
import { MoviesPage } from './pages/movies'
import { is_authorized } from './utils/authentication'
import styled from 'styled-components'

const UserContext = createContext(null);

function ProtectedRoute({ element, ...rest }) {
  const { user, setUser, movies, setMovies } = useContext(UserContext);
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
    return <Loading></Loading>;
  }

  return isAuthenticated ? element : <Navigate to="/signin" />;
}

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState(null); 

  return (
    <UserContext.Provider value={{ user, setUser, movies, setMovies }}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute element={<Home />} />} path='/'/>
          <Route element={<ProtectedRoute element={<MoviesPage />} />} path='/movies'/>
          <Route element={<Signin />} path='/signin'/>
          <Route element={<Signup />} path='/signup'/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}
const Loading = styled.div`
    background-image: url('https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1440x810.png');
    background-color: black;
    height: 100vh; 
    width: 100vw; 
`
export default App
export { UserContext }
