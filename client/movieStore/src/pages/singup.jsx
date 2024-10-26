import { styled } from 'styled-components'
import { Field } from '../components/signInputField'
import { useContext, useState } from 'react'
import { signup } from '../utils/authentication'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

export function Signup(){
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [Cpassword,setCpassword] = useState('');
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (password === Cpassword){
            signup(email,username,password).then((userData) => {
                setUser(userData.user)
            })
        }else{
            console.log(password,Cpassword);
            alert("please confirm the password")
        }
        
    }
    return(
    <SignPage>
        <h2>Signup</h2>
        <Field name={'Email'} action={setEmail} inputType={"email"}/>
        <Field name={'Username'} action={setUsername}/>
        <Field name={'Password'} action={setPassword} inputType={"password"}/>
        <Field name={'Confirm Password'} action={setCpassword} inputType={"password"}/>
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
