import styled from "styled-components";
import searchIcon from '../assets/icons/search.svg'; 

export const NavBar = () => {
    return(
    <Navbar>
        <Logo>Movie<Logo style={{display:'inline',color:'red'}}>S</Logo>tore</Logo>
        <Spacer />
        <SearchBar>
            <img src={searchIcon} alt="Search" style={{ height: '20px'}} />
            <SearchInput placeholder="Find Movies & Tv"></SearchInput>
        </SearchBar>
        <Tabs>
            <Tab>Movies</Tab>
            <Tab>Tv Shows</Tab>
            <Tab>Favorites</Tab>
            <Tab>Profile</Tab>
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
    justify-content: space-around;
    border: 0px solid white;
    height: 100%;
    width: 40%;
    margin-left: auto;
    color: #ffffff;
    font-weight: bolder;
    font-family: "DM Serif Text", serif;
`
const Tab = styled.div`
    cursor: pointer;
    &:hover{
        color: red;
    }
`
