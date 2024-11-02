import styled from "styled-components";

export const MoviesList = ({movies, type})=>{
    const maxMoviesToShow = 25;
    const moviesToShow = movies.slice(0, maxMoviesToShow);

    const getNumberOfRows = (columns) => {
        return Math.ceil(moviesToShow.length / columns);
    };

    return (
        <>
            <Body className="movies-grid">
                {moviesToShow.map((movie, index) => {
                    const col = (index % 5) + 1;
                    const row = Math.floor(index / 5) + 1;
                    return (
                    <Card
                        style={{ gridColumn: col, gridRow: row }}
                        onClick={() => window.location.href = `/details?id=${movie.id}&category=${type}`}
                        key={index}>
                        <MovieImage src={movie["big_image"]}></MovieImage>
                        <Description>{movie["title"]}<br/>
                            <span style={{color:"grey"}}>{movie["year"]}</span>
                        </Description>
                    </Card>);
                })}
            </Body>
            
        </>
    )
}

const Body = styled.div`
    display: grid;
    flex: 1;
    border: 0px solid white;
    height: auto; 
    width: 100%;
    grid-template-columns: repeat(5, 18%); 
    grid-template-rows: ${({ numberOfRows }) => `repeat(${numberOfRows}, 380px)`}; 
    grid-gap: 30px;
    padding-top: 20px;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 22%);
        grid-template-rows: ${({ numberOfRows }) => `repeat(${Math.ceil(numberOfRows * 5 / 4)}, 380px)`}; 
    }

    @media (max-width: 992px) {
        grid-template-columns: repeat(3, 30%);
        grid-template-rows: ${({ numberOfRows }) => `repeat(${Math.ceil(numberOfRows * 5 / 3)}, 380px)`}; 
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 45%);
        grid-template-rows: ${({ numberOfRows }) => `repeat(${Math.ceil(numberOfRows * 5 / 2)}, 380px)`}; 
    }

    @media (max-width: 576px) {
        grid-template-columns: repeat(2 , 45%);
        grid-template-rows: ${({ numberOfRows }) => `repeat(${Math.ceil(numberOfRows * 5 / 2)}, 380px)`}; 
    }
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    border: 0px solid lightgray;
    border-radius: 16px;
    cursor: pointer;
    flex: 1;
    max-height: 450px;
    &:hover{
        border: 0 solid red;
        color: red;
        transform: scale(1.06);
    
    }
`
const MovieImage = styled.img`
    display: flex;
    height: 80%;
    margin-bottom: 0px;
    width: 100%;
    border-radius: 4px 4px 4px 4px;
    transition: transform 0.3s ease; 

`
const Description = styled.div`
    display: flex;
    flex: 1;
    border:0px solid red;
    background-color: rgba(0, 0, 0, 0.76);
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-family: "Merriweather", serif;
`
const Pagination = styled.div`
    display:flex;
    flex: 1;
    border: 2px solid white;
    width: 100%;
    height:100%;
    background-color: transparent;

`
