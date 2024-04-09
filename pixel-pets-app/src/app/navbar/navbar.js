'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import styles from "./navbar.css";
import LoggedInNavbar from './loggedInNavbar';
import LoggedOutNavbar from './loggedOutNavbar';

function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggle = () => {
    setShowNavLinks(!showNavLinks);
  };

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

  useEffect(() => {
    setIsLoggedIn(typeof window !== 'undefined' ? localStorage.getItem('loggedIn') : null);
  }, []);

  const nav = isLoggedIn ? <LoggedInNavbar/> : <LoggedOutNavbar/>

  return (
    nav
  );
}

export default Navbar;
