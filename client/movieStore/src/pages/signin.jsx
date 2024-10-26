import { styled } from 'styled-components'
import { Field } from '../components/signInputField'
import { useState } from 'react'
import { signin } from '../utils/authentication'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export function Signin(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const { user, setUser } = useContext(UserContext); 
    const navigate = useNavigate();

    const handleSubmit = () => {
        signin(username, password).then((userData) => {
            console.log('user', userData);
            setUser(userData.user);
            if (userData) {
              navigate('/'); 
            }
        }).catch((error) => {
            alert("Wrong credentials!")
        });
    };

    return(
        <SignPage>
            <h2>Signin</h2>
           <Field name={"Username"} action={setUsername}></Field>
           <Field name={"Password"} action={setPassword} inputType={"password"}></Field>
           <Submit onClick={handleSubmit}>Submit</Submit>
        </SignPage>            
    )
}
const SignPage = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Submit = styled.button`
    display: flex;
    align-self: center;
    
`
