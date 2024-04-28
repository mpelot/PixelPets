'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useContext } from "react";
import Link from 'next/link'
import styles from "./navbar.css";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const router = useRouter();
  const [showNavLinks, setShowNavLinks] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  

  const handleLogout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.removeItem('auth-token');
    router.push('/login');
  }

  const handleToggle = () => {
    setShowNavLinks(!showNavLinks);
  };

  const links = [
    { href: "/home", text: "Home" },
    // { href: "/about", text: "About" },
    //{ href: "/home", text: "My Pets" },
    { href: "/addPets", text: "Add Pets" },
    {href: "/managePets", text: "Manage Pets" },
    {href: "/getPets", text: "Get Pets"}
  ];

  const loggedOutLinks = [
    { href: "/login", text: "Login" }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState();

  return userData.token ? (
    <nav id="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
        <ul id="nav-links" className={showNavLinks ? "show" : ""}>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href} replace={true}>{link.text}</Link>
            </li>
          ))}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      <button id="nav-toggle" onClick={handleToggle}>
        ☰
      </button>
    </nav>
    ) : (
      <nav id="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
          <ul id="nav-links" className={showNavLinks ? "show" : ""}>
          {loggedOutLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href} replace={true}>{link.text}</Link>
            </li>
          ))}
        </ul>
      <button id="nav-toggle" onClick={handleToggle}>
        ☰
      </button>
    </nav>
    )
}

export default Navbar;

 

