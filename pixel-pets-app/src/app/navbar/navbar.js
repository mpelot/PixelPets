import React, { useState } from "react";
import styles from "./navbar.css";

function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize isLoggedIn state

  const handleToggle = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const links = [
    { href: "/", text: "Home" },
    // { href: "/about", text: "About" },
    { href: "/home", text: "My Pets" },
    { href: "/getPets", text: "Add Pets" },
    { href: "/login", text: "Log Out", onClick: handleLogout},
  ];

  return (
    <nav id="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul id="nav-links" className={showNavLinks ? "show" : ""}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} onClick={link.onClick}>{link.text}</a>
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
