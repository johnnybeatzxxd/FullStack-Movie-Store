import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { UserContext } from "../App";
import { getTopMovies } from "../utils/fetch-data";
import { getTopSeries } from "../utils/fetch-data";
import { LoadingIndicator } from "../components/loading";
export const Details = () => {
    //const {selectedMovie,setSelectedMovie} = useContext(UserContext);
    const [movie,setMovie] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const movieId = queryParams.get('id');
    const movieCategory = queryParams.get('category');
    console.log(movieId,movieCategory);
    if (movieId && movieCategory) {
        if (movieCategory == "Movie"){
            const fetchTop100Movies = async () => {
                try {
                    const topMovies = await getTopMovies(null,movieId);
                    console.log('Top Movies:', topMovies);
                    setMovie(topMovies[0]);
                } catch (error) {
                    console.error("Failed to fetch Top 100 movies:", error);
                    setMovie([]);
                } finally {
                    setIsLoading(false); 
                }
            };
            fetchTop100Movies();
        }else{
            const fetchTop100Movies = async () => {
                try {
                    const topMovies = await getTopSeries(null,movieId);
                    console.log('Top Movies:', topMovies);
                    setMovie(topMovies[0]);
                } catch (error) {
                    console.error("Failed to fetch Top 100 movies:", error);
                    setMovie([]);
                } finally {
                    setIsLoading(false); 
                }
            };
            fetchTop100Movies();
        }

    }else{
        window.location.href = '/'
    }
    },[])
    if (isLoading) {
        return <LoadingIndicator></LoadingIndicator>;
    }
    return (
        <DetailsContainer>
            <NavBar page='details'/>
            <Body
                url={movie.big_image}
                style={{backgroundImage: `url(${movie["big_image"]})`}}>
                <Overlay>
                    <MovieDetails>
                        <Title>{movie.title}</Title>
                        <Description>{movie.description}</Description>
                        <SubDetails>
                            <p>Year: {movie.year}</p>
                            <p>Rating: {movie.rating}</p>
                            <p>Rank: {movie.rank}</p>
                        </SubDetails>
                        <Genres>
                            {movie.genre.map((genre,index)=>(<Genre key={index}>{genre}</Genre>))}
                        </Genres>
                        <PlayButton>Play</PlayButton>
                    </MovieDetails>
                </Overlay>
            </Body>
        </DetailsContainer>
    )
}
const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100vh;
    width: 100vw;
    
    background-image: url(${props => props.url});
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
        background-color: rgba(0, 0, 0, 0.495); 
        z-index: 1; 
    }
    & > * {
        position: relative;
        z-index: 2; 
    }
`
const Body = styled.div`
    display: flex;
    position: relative;
    background-size: 60%;
    height: 100%;
    background-position: right top;
    width: 100%;
    background-repeat: repeat-x;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0; 
        width: 100%;
        height: 100%;
        background-position: left top;
        background: linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.846) 50%);
        z-index: 1; 
    }

    @media (max-width: 768px) {
        background-size: 80%;
    }

    @media (max-width: 576px) {
        background-size: 80% 80%;
    }
`
const Overlay = styled.div`
    display: flex;
    align-items: center;
    border: 0px solid white;
    position: absolute;
    top:0;
    left: 0;
    height:100%;
    width:100%;
    z-index: 3;
    
    font-family: "Merriweather", serif;
    font-weight: 500;
    white-space: normal; 
    word-wrap: break-word;  
`;

const MovieDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100%;
    width: 50%;
    padding-left: 50px;
    border: 0px solid red;
    font-family: "Merriweather", serif;
    
    white-space: normal; 
    word-wrap: break-word; 

    @media (max-width: 768px) {
        width: 80%;
        padding-left: 20px;
    }

    @media (max-width: 576px) {
        width: 90%;
        padding-left: 10px;
    }
`
const Title = styled.h1`
    font-weight: 500;
    border: 0px solid white;
    margin:0;
    font-size: 2.5rem;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }

    @media (max-width: 576px) {
        font-size: 2.3rem;
    }
`
const Description = styled.p`
    margin:20px 0 5px 0;
    font-size: 1.1rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 576px) {
        font-size: 0.9rem;
    }
`
const SubDetails = styled.div`
    display: flex;
    margin:0;
    width: 80%;
    border: 0px solid red;
    gap:20px;

    @media (max-width: 768px) {
        
        gap: 10px;
    }
`
const Genres = styled.div`
    display: flex;
    width: 80%;
    border: 0px solid red;
    gap:20px;
    margin-top: 20px;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 10px;
    }
`
const Genre = styled.button`
    margin:0;    
    border-color: black;
    border-radius: 20px;
    &:hover{
        border: 1px solid red;
    }
`
const PlayButton = styled.button`
    display:flex ;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width:150px;
    height: 40px;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid red;
    &:hover{
        background-color: red;
        color:black;
        border: 1px solid red;
        outline: none;
    }

    @media (max-width: 768px) {
        width: 120px;
        height: 35px;
    }

    @media (max-width: 576px) {
        width: 100px;
        height: 30px;
    }
`