import styled from "styled-components";
import { NavBar } from "../components/navbar";
import { useEffect, useContext, useState } from "react";
import { getTopMovies } from "../utils/fetch-data";
import { FilterBar } from "../components/filterbar";
import { UserContext } from "../App"
import { LoadingIndicator } from "../components/loading";
import { MoviesList } from "../components/movielist";

export const MoviesPage = () => {
    const { movies, setMovies } = useContext(UserContext);
    const [filter,setFilter] = useState("All"); 
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        const fetchTop100Movies = async () => {
            try {
                const topMovies = await getTopMovies(filter);
                console.log('Top Movies:', topMovies);
                setMovies(topMovies);
            } catch (error) {
                console.error("Failed to fetch Top 100 movies:", error);
                setMovies([]);
            } finally {
                setIsLoading(false); 
            }
        };
        fetchTop100Movies();
    }, [filter]);
    if (isLoading) {
        return <LoadingIndicator></LoadingIndicator>;
    }

    return (
        <MoviesContainer>
            <NavBar></NavBar>
            <FilterBar setFilter={setFilter}></FilterBar>
            <MoviesList movies={movies} type={"Movie"}></MoviesList>

        </MoviesContainer>
    )
}

const MoviesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100vh;
    width: 100vw;
    background-image: url('https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1440x810.png');
    color: white; 
    position: relative;
    overflow-y: hidden;
    z-index: 0; 
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.872); 
        z-index: 1; 
    }
    & > * {
        position: relative;
        z-index: 2; 
    }
`