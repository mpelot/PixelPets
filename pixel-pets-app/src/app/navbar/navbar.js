'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import styles from "./navbar.css";
import LoggedInNavbar from './loggedInNavbar';
import LoggedOutNavbar from './loggedOutNavbar';

function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  useEffect(() => {
    const loggedIn =
      typeof window !== "undefined"
        ? window.localStorage.getItem("loggedIn")
        : null;
    setIsLoggedIn(loggedIn === "true");
  }, []);
  
  // const handleToggle = () => {
  //   setShowNavLinks(!showNavLinks);
  // };

  const links = [
    { href: "/home", text: "Home" },
    // { href: "/about", text: "About" },
    //{ href: "/home", text: "My Pets" },
    { href: "/addPets", text: "Add Pets" },
    { href: "/login", text: "Log Out" }
  ];

  const loggedOutLinks = [
    { href: "/login", text: "Login" }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState();

  
return isLoggedIn ? <LoggedInNavbar links={links} /> : <LoggedOutNavbar links={loggedOutLinks} />;
}


export default Navbar;

 

