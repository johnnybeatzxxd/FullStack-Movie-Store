import { useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Signin } from './pages/signin'
import { Signup } from './pages/singup'
import { Home } from './pages/home'
import { MoviesPage } from './pages/movies'
import { is_authorized } from './utils/authentication'
import { LoadingIndicator } from './components/loading'
import { SeriesPage } from './pages/series'
import { Details } from './pages/details'

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
    return <LoadingIndicator/>;
  }

  return isAuthenticated ? element : <Navigate to="/signin" />;
}

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState(null);
  const [selectedTab,setSelectedTab] = useState(null)
  const [selectedMovie,setSelectedMovie] = useState(null)
  const [searchValue,setSearchValue] = useState('')

  return (
    <UserContext.Provider value={{ user, setUser, movies, setMovies, selectedTab, setSelectedTab, selectedMovie, setSelectedMovie,searchValue,setSearchValue}}>
      <Router>
        <Routes>
          <Route element={<Home />} path='/'/>
          <Route element={<MoviesPage />} path='/movies'/>
          <Route element={<SeriesPage />} path='/tv'/>
          <Route element={<Details/> } path='/search'/>
          <Route element={<Details/> } path='/details'/>
          <Route element={<Signin />} path='/signin'/>
          <Route element={<Signup />} path='/signup'/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
export { UserContext }
