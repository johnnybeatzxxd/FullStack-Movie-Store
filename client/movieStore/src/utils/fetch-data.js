import axios from 'axios'
import { UserContext } from '../App';
import { useContext } from 'react';


const BackendUrl = import.meta.env.VITE_BACKEND_URL || '../'; 
axios.defaults.withCredentials = true;

export const getTopMovies = async () => {
    try {
        const response = await fetch(`${BackendUrl}/store/movies/top100`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data["top100movies"];
    } catch (error) {
        console.error('Error fetching top movies:', error);
        throw error; // Re-throw the error to be caught in the calling function
    }
};

