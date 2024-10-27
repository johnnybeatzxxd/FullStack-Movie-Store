import { useState, useEffect } from "react";
import styled from "styled-components";


export const FilterBar = ()=>{
    const [geners,setGeners] = useState(["All","Animation","Crime","Drama","Adventure","Family","Biography","History","Comedy","War","Action","Thriller","Sci-Fi","Fantasy","Romance","Musical","Mystery"])
    useEffect(() => {
        const handleWheel = (e) => {
            const tabs = document.querySelector(".tabs-container");
            if (tabs) {
                if (e.deltaY > 0) tabs.scrollLeft += 100;
                else tabs.scrollLeft -= 100;
            }
        };
        window.addEventListener("wheel", handleWheel);
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);
    return (
            <Tabs className="tabs-container">
                {geners.map((gener, index) => (<Tab key={index}>{gener}</Tab>))}
            </Tabs>
    )
}

const Tabs = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 0px solid #ff00006c;
    border-radius: 20px;
    height: 50px; 
    align-items: center; 
    box-sizing: border-box; 
    flex-shrink: 0;
    margin-top: 3px;
    margin-bottom: 5px;
    padding: 12px;
    gap: 20px;
    overflow-x: hidden; 
    overflow-y: hidden;
`
const Tab = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid red;
    color: white;
    font-family: "Merriweather", serif;
    border-radius: 8px;
    padding: 5px;
    min-width: 50px;
    min-height: 30px;
    background-color: transparent;
    flex-shrink: 0;
    &:hover {
        background-color: red;
        color: black;
        outline: none;
        border: 0px;
        min-width: 80px;
        min-height: 35px;
        transform: scale(1.1); 
    }
`