import axios from 'axios'
import { UserContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const BackendUrl = import.meta.env.VITE_BACKEND_URL || '../'; 
axios.defaults.withCredentials = true;

export const signin = (username, password) => {
    return axios.post(`${BackendUrl}/accounts/signin`, { username, password }, { withCredentials: true })
      .then((response) => {
        console.log(response.status, response);
        return response.data;
      })
      .catch((error) => {
        if (error.status === 401){
          console.log("wrong credentials")
        }else{
          console.error('Signin error:', error);}
      });
};

export const signup = (email,username,password) => {
    return axios.post(`${BackendUrl}/accounts/signup`,{email,username,password})
    .then((response) => {
        return response.data
    }).catch((error) => {
        console.error("Signup error:",error)
    })
}

export const signout = () => {
  return axios.get(`${BackendUrl}/accounts/signout`).then(
    (response)=>{
      window.location.href = "signin/"
      return response.data
    }
  ).catch((error) => {
    console.error("couldnt signout!",error);
  })
}
export const is_authorized = () => {
  return axios.get(`${BackendUrl}/accounts/aboutme`, { withCredentials: true })
  .then((response) => {
    console.log(response.status, response);
    return response.data;
  })
  .catch((error) => {
    if (error.status === 401)return null
    console.error('Aboutme error:', error);
  }); 
}