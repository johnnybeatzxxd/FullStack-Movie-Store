import styled from "styled-components";

export const MoviesList = ({movies, type})=>{
    return (
    <Body>
        {(() => {
            let col = 0;
            let row = 1;
            const maxMoviesToShow = 25; 
            return movies.slice(0, maxMoviesToShow).map((movie, index) => {
                col++;
                if (col > 5) {
                    col = 1;
                    row++;
                }
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
            });
        })()}
    </Body>)
}

const Body = styled.div`
    display: grid;
    flex: 1;
    border: 0px solid white;
    min-height: 100%; 
    width: 100%;
    grid-template-columns: repeat(5, 18%); 
    grid-template-rows: repeat(6, 380px); 
    grid-gap: 30px;
    padding-top: 20px;
    overflow-y: auto;

    overflow-x: hidden;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    border: 0px solid lightgray;
    border-radius: 16px;
    cursor: pointer;
    flex: 1;
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