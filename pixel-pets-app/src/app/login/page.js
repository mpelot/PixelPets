'use client'

import { useRouter } from 'next/navigation'
import styles from "./login.css";
import bg from '../../../public/LogoBG.png'

export default function Home() {

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('loggedIn', true);
    router.push('/home')
  };

  localStorage.setItem('loggedIn', false);
  console.log(localStorage.getItem('loggedIn'));

  return (
      <div className="content">
        <div className="background" style={{backgroundImage: `url(${bg.src})`}}></div>
        <div className="login">
          <div className="title">
            <img src="logo.png"/>
            <h1>PixelPets</h1>
          </div>
          <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
      </div>
    </div>
  );
}
