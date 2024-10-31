import axios from 'axios'
import { UserContext } from '../App';
import { useContext } from 'react';


const BackendUrl = import.meta.env.VITE_BACKEND_URL || '../'; 
axios.defaults.withCredentials = true;

export const getTopMovies = async (filter,id,keyword) => {
    try {
        const response = await fetch(`${BackendUrl}/store/movies/top100?genre=${filter || "All"}&id=${id || ""}&keyword=${keyword || ""}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data["top100movies"];
    } catch (error) {
        console.error('Error fetching top movies:', error);
        throw error; 
    }
};

export const getTopSeries = async (filter,id,keyword) => {
    try {
        const response = await fetch(`${BackendUrl}/store/series/top100?genre=${filter || "All"}&id=${id || ""}&keyword=${keyword || ""}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data["top100series"];
    } catch (error) {
        console.error('Error fetching top movies:', error);
        throw error; 
    }
};

export const searchTop100 = async (filter,id,query) => {
    try {
        const response = await fetch(`${BackendUrl}/store/series/top100?genre=${filter || "All"}&id=${id || ""}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data["response"];
    } catch (error) {
        console.error('Error searching top movies:', error);
        throw error; 
    }
};
