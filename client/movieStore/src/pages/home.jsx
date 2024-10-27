import { useContext, useEffect, useState, } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom";
import { signout } from "../utils/authentication";
import styled from "styled-components";
import { NavBar } from "../components/navbar";



export function Home(){
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <HomeContainer>
            <NavBar/> 
            <Header>
                <MainText>
                    Top 100 Movies to Watch, Anytime Anywhere.
                </MainText>
                <SubText>The search is over! Let Plex help you find the perfect movie to watch tonight for free.</SubText>
                <MoviesButton onClick={()=>{window.location.href = '/movies'}}>Watch Movies</MoviesButton>
            </Header>
  
        </HomeContainer>    
    );
}

const HomeContainer = styled.div`
    background-image: url('https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1440x810.png');
    background-color: black;
    height: 100%; 
    width: 100%; 
    max-width: 100vw;
    color: white; 
    display: flex; 
    flex: 1;
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: center;
    
`
const Header = styled.div`
    display: grid;
    flex: 1 ;
    grid-template-columns:repeat(10,1fr);
    grid-template-rows: repeat(12,1fr);
`
const MainText = styled.p`
    display: flex;
    grid-column: 2/6;
    grid-row: 2/6;
    font-size: 2.6rem;
    justify-self: end;
    align-self: end;
    border: 0px solid white;
    font-weight: 600;
    font-family: "Merriweather", serif;
    margin: 0;
    line-height: 1.2;
    white-space: pre-wrap; // Preserve spaces and line breaks
`

const SubText = styled.div`
    display: flex;
    grid-column:2/6;
    grid-row:6/7;
    font-size: 1.2rem;
    justify-self: start;
    align-self: start;
    border: 0px solid white;
    font-weight: 300;
    font-family: "Merriweather", serif;
    margin: 0;
`
const MoviesButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 7;
    grid-column:2;
    width: 150px;
    height: 43px;
    margin-top: 9px;
    background-color: transparent;
    border: 1px solid red;
    border-radius:15px ;
    font-family: "Merriweather", serif;
    font-weight: bold;
    font-size: 0.92rem;
    color:red;
    &:hover{
        background-color: red;
        color: black;
        border: 1px solid black;
    }
`
const Red = styled.p`
    display: inline;
    color: red;
`
