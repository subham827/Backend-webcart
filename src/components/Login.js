import {useState} from 'react';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';



function Login() {
  
  
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  async function loginUser(e){
    e.preventDefault();
  const response = await  fetch('http://localhost:8000/api/login',{
    method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        
        email,
        password
      }),
    })
    const data = await response.json();
    if (data.user) {
      localStorage.setItem('token',data.user);
      window.location.href = '/';
      
      
    }
    else{
      alert("Invalid Credentials");
    }
   
  }
  
  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
       
        <br></br>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br></br>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br></br>
        <input type= "submit" value="Login"></input>
      </form>
     <h2>Do not have an account? <Link to="/signup">Sign up here</Link></h2>
    </div>
  );
}

export default Login;
