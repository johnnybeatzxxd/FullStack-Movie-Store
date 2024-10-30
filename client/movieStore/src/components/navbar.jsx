import styled from "styled-components";
import searchIcon from '../assets/icons/search.svg'; 
import { useContext } from "react";
import { UserContext } from "../App";

const FrontendUrl = import.meta.env.VITE_FRONTEND_URL || '../'; 
export const NavBar = () => {
    const {selectedTab,setSelectedTab} = useContext(UserContext);
    return(
    <Navbar>
        <Logo onClick={()=>{window.location.href = '/'}}>Movie<Logo style={{display:'inline',color:'red'}}>S</Logo>tore</Logo>
        <Spacer />
        <SearchBar>
            <img src={searchIcon} alt="Search" style={{ height: '20px'}} />
            <SearchInput placeholder="Find Movies & Tv"></SearchInput>
        </SearchBar>
        <Tabs>
            <Tab 
                onClick={()=>{window.location.href = '/movies';}}
                style={window.location.href==`${FrontendUrl}/movies?page=1`?{color:"red"}:{}}>
                Movies
            </Tab>
            <Tab 
                onClick={()=>{window.location.href = '/tv';}}
                style={window.location.href==`${FrontendUrl}/tv`?{color:"red"}:{}}>
                TV Shows
            </Tab>

            <ProfileTab 
                style={window.location.href==`${FrontendUrl}/favorites`?{color:"red"}:{border:"0px"}}>
                Features
            </ProfileTab>

            <ProfileTab 
                style={{backgroundColor:"red",color:"black"}}
                onClick={() => window.open('https://github.com/johnnybeatzxxd', '_blank')}>
                    Github
            </ProfileTab>
            
        </Tabs>
    </Navbar>
    )
}

const Navbar = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #000000bb;
    height: 55px;
    width: 100%;
    align-items: center;
    padding-left: 50px;
    box-sizing: border-box;
`

const Logo = styled.p`
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "DM Serif Text", serif;
    cursor: pointer;
`

const Spacer = styled.div`
    width: 80px;  
`

const SearchBar = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0px 10px;
    gap: 10px;
    background-color: #8080801c;
    font-family: "DM Serif Text", serif;
    font-weight: 100;
    border-radius: 12px;
    border: 1px solid transparent;
    height: 27px;
    width: 23%;
    @media (max-width: 560px) { 
        flex: 1;
        width:auto;
        margin-right: 60px;
        margin-left: 20px;
    }
`

const SearchInput = styled.input`
    display: flex;
    flex: 1;
    background-color: transparent;
    border:none;
    &:focus {
        outline: none;
        border: none;
    }
   
`

const Tabs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border: 0px solid white;
    height: 100%;
    width: 35%;
    margin-left: auto;
    color: #ffffff;
    font-weight: 500;

    @media (max-width: 790px) { 
        display: none;
    }
`
const Tab = styled.div`
    cursor: pointer;
    &:hover{
        color: red;
    }
`

const ProfileTab = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    border-radius: 10px;
    width: 70px;
    height: 30px;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &:hover{
        color: red;
    }
    
`