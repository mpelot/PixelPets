'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from "./login.css";
import bg from '../../../public/LogoBG.png'

export default function Home() {

  const router = useRouter()

  const [hasAccount, setHasAccount] = useState(true);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredLoginPass, setEnteredLoginPass] = useState('');
  const [enteredSignUpPass, setEnteredSignUpPass] = useState('');

  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  }
  const loginPassChangeHandler = (e) => {
    setEnteredLoginPass(e.target.value);
  }
  const signUpPassChangeHandler = (e) => {
    setEnteredSignUpPass(e.target.value);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', true);
    }

    const loginData = {
      username: enteredUsername,
      pass: enteredLoginPass
    }

    // verify login info

    setEnteredUsername('');
    setEnteredLoginPass('');

    router.push('/home');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', true);
    }

    const signUpData = {
      username: enteredUsername,
      pass: enteredSignUpPass
    }

    // create new user if there are no errors

    setEnteredUsername('');
    setEnteredSignUpPass('');

    router.push('/home')
  };

  const loginView = (e) => {
    setHasAccount(true)
  }

  const signUpView = (e) => {
    setHasAccount(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', false);
    }
  }, [])

  return (
      <div className="content">
        <div className="background" style={{backgroundImage: `url(${bg.src})`}}></div>
        <div className="login">
          <div className="title">
            <img src="logo.png"/>
            <h1>PixelPets</h1>
          </div>
          {hasAccount ? 
          <div className="login-container">
            <div className="login-BG">
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" id="username" name="username" value={enteredUsername} onChange={usernameChangeHandler} required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" value={enteredLoginPass} onChange={loginPassChangeHandler} required/>
                  </div>
                  <button type="submit">Login</button>
              </form>
            </div>
            <button className="altOption" onClick={signUpView}>Create Account</button>
          </div>
          :
          <div className="login-container">
            <div className="login-BG">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUpSubmit}>
                  <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" id="username" name="username" value={enteredUsername} onChange={usernameChangeHandler} required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" value={enteredSignUpPass} onChange={signUpPassChangeHandler} required/>
                  </div>
                  <button type="submit">Create Account</button>
              </form>
            </div>
            <button className="altOption" onClick={loginView}>Login</button>
          </div>
          }
      </div>
    </div>
  );
}
