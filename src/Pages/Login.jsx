import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../Config/Firebase'
import { UserState } from '../Context/Context'
import  '../Styles/Login.css'
function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAlert} =UserState()
  const navigate=useNavigate()
  const handleLogin=async () =>{
   try{
     const result = await signInWithEmailAndPassword(auth,email,password)
     console.log(result)
     setAlert({
       open:true,
       message:`Logged in ,Welcome to GCM ${result.user.email}`,
       type:'success'
     })
     navigate('/home')
   }catch(error){
     setAlert
     ({
       open:true,
       message:error.message,
       type:'error'
     })
    
   }
  }
  function handleSignup(){
    navigate('/signup')
  }
  return (
    <div className='login'>
        
       
      
      {/******* Login Form *********** */}

        <div className='container'>
          <div className='content'>
            <h2  className='loginheading'>
              Sign in
            </h2>
            <h3 id='email'>Email</h3>
            <input required value={email} onChange={(e)=>setEmail(e.target.value)}  type='email' placeholder='Email'/><br/>

            <h3>Password</h3>
            <input required  type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>

            <button className='button' onClick={handleLogin} >Signin</button>
            <div/>
            <h4>Create an account?<p className='signup' onClick={handleSignup}>Sign up!</p></h4>
          </div>
          <div className='fp'>
            <h4><a href='/forgot'>Forget PassWord?</a></h4>
          </div>

        </div>
    </div>
  )
}

export default Login