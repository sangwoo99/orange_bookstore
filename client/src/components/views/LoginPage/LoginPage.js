import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <form>
        <label>ID</label>
        <input type='text'/>
        <label>Password</label>
        <input type='password'/>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage