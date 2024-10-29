import styled from "styled-components";


export const LoadingIndicator = ()=> {
    return (<Loading></Loading>)
}
const Loading = styled.div`
    background-image: url('https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1440x810.png');
    background-color: black;
    background-blend-mode: overlay; /* Blend the black color with the image */
    opacity: 0.7; /* Adjust the opacity to make the image darker */
    height: 100vh; 
    width: 100vw; 
`