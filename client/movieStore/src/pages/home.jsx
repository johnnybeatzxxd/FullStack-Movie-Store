import { useContext, useEffect, useState, } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom";
import { signout } from "../utils/authentication";
import styled from "styled-components";
import { NavBar } from "../components/navbar";



export function Home(){
    const {user, setUser,searchValue,setSearchValue} = useContext(UserContext);
    
    const navigate = useNavigate();

    return(
        <HomeContainer>
            <NavBar page="home"/> 
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
    height: 100vh;
    width: 100vw; 
    color: white; 
    display: flex; 
    flex-direction: column; 
    justify-content: start; 
    align-items: flex-start;
    padding-left: 20px; 
    overflow: hidden; 
    box-sizing: border-box; 
`
const Header = styled.div`
    display: flex;
    flex-direction: column; 
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    height: auto; 
    margin-left: 5%;
    margin-right: auto;
    @media (max-width: 796px) {
        width:90% ;
    }
`

const MainText = styled.p`
    font-size: 2.6rem;
    font-weight: 600;
    font-family: "Merriweather", serif;
    margin: 0;
    line-height: 1.2;
    white-space: pre-wrap; 
`

const SubText = styled.div`
    font-size: 1.2rem;
    font-weight: 300;
    font-family: "Merriweather", serif;
    margin: 0;
`

const MoviesButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 43px;
    margin-top: 9px;
    background-color: transparent;
    border: 1px solid red;
    border-radius: 15px;
    font-family: "Merriweather", serif;
    font-weight: bold;
    font-size: 0.92rem;
    color: red;
    &:hover {
        background-color: red;
        color: black;
        border: 1px solid black;
    }
`
const Red = styled.p`
    display: inline;
    color: red;
`
