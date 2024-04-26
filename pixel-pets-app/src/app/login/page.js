'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useContext } from 'react'
import {UserContext} from '../context/UserContext';
import styles from "./login.css";
import bg from '../../../public/LogoBG.png'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export default function Home() {

  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (userData.token) {
      router.push("/home");
    }
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('loggedIn', false);
    // }
  }, [userData.token, router]);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        username: enteredUsername,
        password: enteredLoginPass
      }

      const response = await axios.post('http://localhost:8085/users/login', loginData);
      setUserData({
        token: response.data.token,
        user: response.data.user
      });

      localStorage.setItem("auth-token", response.data.token);
      router.push('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
    
    // verify login info
    // axios.get(`http://localhost:8085/users/username/${enteredUsername}`)
    // .then((res) => {
    //   bcrypt.compare(enteredLoginPass, res.data[0].password, function(err, result) {
    //     if (result) {
    //       if (typeof window !== 'undefined') {
    //         localStorage.setItem('loggedIn', true);
    //       }
    //       router.push('/home');
    //     }
    //     else {
    //       console.log("Invalid password!");
    //     }
    //   });
    //   setEnteredUsername('');
    //   setEnteredLoginPass('');
    // })
    // .catch((err) => {
    //   console.log("Could not get user from username")
    // })
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const signUpData = {
        username: enteredUsername,
        password: enteredSignUpPass
      }

      await axios.post('http://localhost:8085/users/signup', signUpData);
      const loginRes = await axios.post('http://localhost:8085/users/login', {
        username: signUpData.username,
        password: signUpData.password
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      router.push('/home');
    } catch (error) {
      console.error('SignUp failed:', error);
    }

    // bcrypt.hash(enteredSignUpPass, 10, function(err, hash) {
    //   const signUpData = {
    //     username: enteredUsername,
    //     password: hash
    //   }

    //   // create new user if there are no errors
    //   axios
    //   .post('http://localhost:8085/users', signUpData)
    //   .then((res) => {
    //     setEnteredUsername('');
    //     setEnteredSignUpPass('');

    //     if (typeof window !== 'undefined') {
    //       localStorage.setItem('loggedIn', true);
    //     }
    //     router.push('/home');
    //   })
    //   .catch((err) =>  {
    //     console.log('Error creating user!');
    //   })
    // });
  };

  const loginView = (e) => {
    setHasAccount(true)
  }

  const signUpView = (e) => {
    setHasAccount(false)
  }

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
