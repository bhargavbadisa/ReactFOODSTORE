import React from 'react'
import './Signing.css'

function Signing() {
  return (
    <>
    <center>
      <div>
      <h1>This is Signing Page</h1>
      <h2>Login Form:</h2>
    
     <h2>UserName :<input type="text" placeholder="Username" required /></h2>
     <h2>Password :<input type="password" placeholder="Password" required /></h2>
      <button type="submit">Login</button>

    <p>Don't have an account? <a href="#">Sign up</a></p></div>
    </center>
    </>
  )
}

export default Signing
