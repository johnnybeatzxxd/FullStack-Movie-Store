import styled from "styled-components";
import searchIcon from '../assets/icons/search.svg'; 
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";

const FrontendUrl = import.meta.env.VITE_FRONTEND_URL || '../'; 
export const NavBar = ({page}) => {
    const {searchValue,setSearchValue} = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get('query');
        if (query){
            setSearchValue(query)
            setQuery(query)
        };
    }, []);
    useEffect(() => {
        
        if (page === "home" && query === "") return 
        if (page === "details" && query === "") return 
        if (page === "home") {
            page = "movies";
        } else if (page === "details") {
            const currentUrl = new URL(window.location.href);
            const category = currentUrl.searchParams.get('category');
            
            if (category === "Movie") {
                page = "movies";
            } else if (category === "Series") {
                page = "tv";
            }
        }
        const handler = setTimeout(() => {
        if (query != null){
            const currentUrl = new URL(window.location.href);
            const isHomePage = currentUrl.pathname === '/';
            const isDetailsPage = currentUrl.pathname === '/details';

            if (isHomePage || isDetailsPage) { 
                console.log("its details");
                window.location.href = `${FrontendUrl}/${page}?query=${query}`;
            }
            window.history.pushState({}, '', `/${page}?page=${1}&query=${query}`);
            setSearchValue(query);
        }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    return(
    <Navbar>
        <Logo onClick={()=>{window.location.href = '/'}}>Movie<Logo style={{display:'inline',color:'red'}}>S</Logo>tore</Logo>
        <Spacer />
        <SearchBar>
            <img src={searchIcon} alt="Search" style={{ height: '20px'}} />
            <SearchInput 
                placeholder="Find Movies & Tv"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></SearchInput>
        </SearchBar>
        <Tabs>
            <Tab 
                onClick={()=>{window.location.href = '/movies';}}
                style={page=="movies"?{color:"red"}:{}}>
                Movies
            </Tab>
            <Tab 
                onClick={()=>{window.location.href = '/tv';}}
                style={page=="tv"?{color:"red"}:{}}>
                TV Shows
            </Tab>

            <ProfileTab 
                style={{border:0}}>
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
    width: 100vw;
    align-items: center;
    padding-left: 50px;
    box-sizing: border-box;
    @media (max-width: 790px) { 
        padding-left: 15px;
    }
`

const Logo = styled.p`  
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "DM Serif Text", serif;
    
    cursor: pointer;

`

const Spacer = styled.div`
    width:  5%;  
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
    border: 1px solid #80808037;
    height: 27px;
    width: 23%;
    @media (max-width: 860px) { 
        flex: 1;
        width:50%;
        margin-right: 60px;
        margin-left: 20px;
    }
    @media (max-width: 380px) { 
        flex: 1;
        width:40%;
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

    @media (max-width: 860px) { 
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