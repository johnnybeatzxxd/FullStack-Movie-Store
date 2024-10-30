import styled from "styled-components";
import { useState, useEffect } from "react";
import { UserContext } from "../App";
import { NavBar } from "../components/navbar";
import { FilterBar } from "../components/filterbar";
import { getTopSeries } from "../utils/fetch-data";
import { LoadingIndicator } from "../components/loading";
import { MoviesList } from "../components/movielist";
import backArrow from '../assets/icons/back_arrow.svg'; 
import nextArrow from '../assets/icons/next_arrow.svg'; 


export const SeriesPage = () => {
    const [series, setSeries] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All"); 
    const [selectedPage, setSelectedPage] = useState(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const pageNum = queryParams.get('page');
        return pageNum ? Number(pageNum) : 1;
    });
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const pageGenre = queryParams.get('genre');
        if (pageGenre) setFilter(pageGenre);
    }, []);

    useEffect(() => {
        const totalPages = Math.ceil((series?.length || 0) / 25);
        const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        setPages(pagesArray);
    }, [series]);

    useEffect(() => {
        const fetchTop100Movies = async () => {
            try {
                const topMovies = await getTopSeries(filter);
                console.log('Top Movies:', topMovies);
                setSeries(topMovies);
            } catch (error) {
                console.error("Failed to fetch Top 100 movies:", error);
                setSeries([]);
            } finally {
                setIsLoading(false); 
            }
        };
        fetchTop100Movies();
    }, [filter]);

    useEffect(() => {
        window.history.pushState({}, '', `/tv?page=${selectedPage}`);
        window.scrollTo(0, 0);
        
        // Scroll the grid to the top
        const gridElement = document.querySelector('.movies-grid'); // Adjust the selector to match your grid
        if (gridElement) {
            gridElement.scrollTo(0, 0);
        }
    }, [selectedPage]);

    if (isLoading) {
        return <LoadingIndicator></LoadingIndicator>;
    }

    const moviesPerPage = 25;
    const startIndex = (selectedPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const seriesToDisplay = series.slice(startIndex, endIndex);

    return(
        <Series>
            <NavBar/>
            <FilterBar setFilter={setFilter} setSelectedPage={setSelectedPage}/>
            <MoviesList movies={seriesToDisplay} type={"Series"}/>
               
            <Pagination>
                <PageArrow 
                    src={backArrow}
                    onClick={() => {
                        if (selectedPage > 1){
                            window.scrollTo(0, 0); 
                            setSelectedPage(selectedPage - 1);
                        }
                    }}
                />
                {
                pages.map((pageNum) => (
                    <Page 
                        style={selectedPage === pageNum ? { border: "1px solid red" } : {}}
                        onClick={() => {  
                            setSelectedPage(pageNum);
                        }}
                        key={pageNum}
                    >
                        {pageNum}
                    </Page>
                ))}
                <PageArrow
                    onClick={() => {
                        if (selectedPage < pages.length){
                            setSelectedPage(selectedPage + 1);
                        }
                    }}
                    src={nextArrow}
                />
            </Pagination>
        </Series>
    )
}
const Series = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    max-height: 150vh;
    width: 100vw;
    background-image: url('https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1440x810.png');
    color: white; 
    position: relative;
    overflow-y: hidden;
    z-index: 0; 
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.872); 
        z-index: 1; 
    }
    & > * {
        position: relative;
        z-index: 2; 
    }

`

const Pagination = styled.div`
    display: flex;
    width: auto;
    border: 0px solid #ff00006c;
    border-radius: 20px;
    height: 50px; 
    align-items: center;
    justify-content: center;
    box-sizing: border-box; 
    flex-shrink: 0;
    margin-top: 3px;
    margin-bottom: 5px;
    padding: 12px;
    gap: 10px;
    overflow-x: hidden; 
    overflow-y: hidden;
`
const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px; 
    height: 15px;   
    font-size: small;
    border: 0px solid red;
    border-radius: 50%;
    padding: 5px; 
    cursor: pointer;
`
const PageArrow = styled.img`  
    cursor: pointer;
`