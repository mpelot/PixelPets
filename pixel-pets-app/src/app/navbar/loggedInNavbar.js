'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import styles from "./navbar.css";

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

  return (
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
        </ul>
      <button id="nav-toggle" onClick={handleToggle}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
