import {React,useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import styled from "styled-components";


export const Menu = ({drawer,setDrawer})=>{
  
    const toggleDrawer = ()=>{
        setDrawer((prevState) => !prevState)
    }
    return(
    <StyledDrawer
        style={{"background":"black"}}
        open={drawer}
        onClose={toggleDrawer}
        direction='left'
        className='bla bla bla'
    >
        <div>
            <h3>Menu</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Cell onClick={()=>{window.location.href = "/movies"}}>Movies</Cell>   
                <Cell onClick={()=>{window.location.href = "/tv"}}>Series</Cell>   
                <Cell onClick={()=>{window.open("https://github.com/johnnybeatzxxd", "_blank")}}>Github</Cell>   
            </div>
        </div>
    </StyledDrawer>)
}

const StyledDrawer = styled(Drawer)`
background-color: black;


`
const Cell = styled.button`
    padding: 10px;
    background-color: black;
    border: none; // Removed border
    &:not(:last-child) {
        border-bottom: 1px solid red; // Added divider for all except last
    }
    &:last-child {
        border-top: 1px solid red;
        &:hover{
            color: red;
        }
    }
    &:hover {
        border-color: white;
        color: red;
    }
`
