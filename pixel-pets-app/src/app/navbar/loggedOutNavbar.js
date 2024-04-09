'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import styles from "./navbar.css";

function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggle = () => {
    setShowNavLinks(!showNavLinks);
  };

  const loggedOutLinks = [
    { href: "/login", text: "Login" }
  ];

  return (
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
  );
}

export default Navbar;
