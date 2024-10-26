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
            <Header></Header>
  
        </HomeContainer>    
    );
}

const HomeContainer = styled.div`
    background-image: url('https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1440x810.png');
    background-color: black;
    height: 100vh; 
    width: 100vw; 
    max-width: 100vw;
    color: white; 
    display: flex; 
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: center;
    
`
const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
`