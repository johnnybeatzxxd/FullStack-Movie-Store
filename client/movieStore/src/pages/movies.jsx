import styled from "styled-components";
import { NavBar } from "../components/navbar";
import { useEffect, useContext, useState } from "react";
import { getTopMovies } from "../utils/fetch-data";
import { FilterBar } from "../components/filterbar";
import { UserContext } from "../App"

export const MoviesPage = () => {
    const { movies, setMovies } = useContext(UserContext); 
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        const fetchTop100Movies = async () => {
            try {
                const topMovies = await getTopMovies();
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
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <MoviesContainer>
            <NavBar></NavBar>
            <FilterBar></FilterBar>
           
            <Body>
                <div style={{ display: "flex", flex: 1, border: "2px solid white" }}>hellow world</div>
                {(() => {
                    let col = 0;
                    let row = 1;
                    const maxMoviesToShow = 25; 
                    return movies.slice(0, maxMoviesToShow).map((movie, index) => {
                        col++;
                        if (col > 5) {
                            col = 1;
                            row++;
                        }
                        return (
                        <Card style={{ gridColumn: col, gridRow: row }} key={index}>
                            <MovieImage src={movie["big_image"]}></MovieImage>
                            <Description>{movie["title"]}<br/>
                                <span style={{color:"grey"}}>{movie["year"]}</span>
                            </Description>
                        </Card>);
                    });
                })()}
            </Body>
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
const Body = styled.div`
    display: grid;
    flex: 1;
    border: 0px solid white;
    min-height: 100%; 
    width: 100%;
    grid-template-columns: repeat(5, 18%); 
    grid-template-rows: repeat(6, 380px); 
    grid-gap: 30px;
    padding-top: 20px;
    overflow-y: auto;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.5px solid lightgray;
    border-radius: 16px;
    cursor: pointer;
    flex: 1;
    &:hover{
        border: 0.5px solid red;
        color: red;
        transform: scale(1.06);
    
    }
`
const MovieImage = styled.img`
    display: flex;
    height: 80%;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 16px 16px 5px 5px;
    transition: transform 0.3s ease; // Smooth transition for zoom effect

`
const Description = styled.div`
    display: flex;
    flex: 1;
    border:0px solid red;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-family: "Merriweather", serif;
`